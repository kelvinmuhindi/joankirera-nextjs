# Joan Kirera — Website (Next.js)

This is the Next.js rewrite of the joankirera.com site. It keeps the
original look and feel, and adds:

- A working contact form that emails submissions directly (no more Formspree)
- A "Book" page that sells online access to *From Dating to Marriage*,
  paid for via M-Pesa (Safaricom Daraja STK Push)
- A gated, in-browser PDF reader that only opens for people who've paid

## 1. Install & run locally

```bash
npm install
cp .env.example .env.local   # then fill in real values, see below
npm run dev
```

Visit http://localhost:3000.

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

### Email (contact form + purchase receipts)
```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=info@joankirera.com
SMTP_PASS=your-password-or-app-password
SMTP_FROM=info@joankirera.com
CONTACT_TO_EMAIL=info@joankirera.com
```
Works with any normal mailbox (Gmail, Zoho, cPanel/WHM, Microsoft 365,
etc). If using Gmail, you'll need an **App Password**, not your normal
login password (Google account → Security → App passwords).

### M-Pesa (Daraja API)
```
MPESA_ENV=sandbox            # change to "production" when you go live
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MPESA_SHORTCODE=...
MPESA_PASSKEY=...
BOOK_PRICE_KES=1000
NEXT_PUBLIC_BOOK_PRICE_KES=1000
```

**How to get these:**
1. Create an account at https://developer.safaricom.co.ke
2. Create a new "app" — this gives you a Consumer Key + Consumer Secret
3. While testing, use the sandbox test shortcode (`174379`) and the
   sandbox passkey published on the Daraja docs — both work out of the
   box against `MPESA_ENV=sandbox`.
4. When you're ready to charge real customers, apply for **Go-Live**
   from your Daraja dashboard. Safaricom will issue you a production
   shortcode + passkey tied to your registered business (a Paybill or
   Till number). Swap `MPESA_ENV` to `production` and update the
   shortcode/passkey/keys.

### Book access
```
BOOK_ACCESS_SECRET=<run: openssl rand -hex 32>
BOOK_FILENAME=from-dating-to-marriage.pdf
```

### App URL
```
APP_URL=https://joankirera.com
```
This is used to build the M-Pesa callback URL and the link emailed to
buyers. **M-Pesa's servers must be able to reach this URL directly**,
so it needs to be your real public domain — `localhost` will not work
for receiving live payment callbacks (see "Testing M-Pesa locally" below).

## 3. Uploading the actual book

The book is never placed in `public/` (anyone could then just guess
the URL and download it for free). Instead, drop the real PDF here:

```
private/book/from-dating-to-marriage.pdf
```

The filename must match `BOOK_FILENAME` in your `.env`. The app reads
this file from disk and streams it only to readers with a valid,
signed access token — there is no other way to reach it.

## 4. How the payment flow works

1. Visitor clicks **"Read Online"** on the Book page → fills in name,
   email, M-Pesa phone number.
2. The app calls Safaricom's Daraja API to trigger an **STK push** — a
   PIN prompt pops up on the visitor's phone.
3. The visitor enters their M-Pesa PIN and confirms.
4. Safaricom calls our server back at `/api/mpesa/callback` to report
   success or failure (this happens phone-to-Safaricom-to-our-server;
   the visitor's browser is not involved in this step).
5. On success, the app marks the order "paid", emails the visitor a
   personal reading link, and the visitor's browser (which has been
   quietly polling `/api/mpesa/status` since step 2) redirects them
   straight into the reader.
6. The reading link works forever (configurable) and can be reused —
   it's tied to that one purchase, not to a login.

Order records live in `data/orders.json`, a simple JSON file (see
"About the data storage" below).

## 5. Testing M-Pesa locally

Safaricom needs a real, public HTTPS URL to send the payment callback
to — it can't reach your laptop. To test the full flow locally:

1. Use a tunnel tool like [ngrok](https://ngrok.com) or
   [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/):
   ```bash
   ngrok http 3000
   ```
2. Set `APP_URL` in `.env.local` to the `https://xxxx.ngrok.app` URL
   ngrok gives you.
3. Use Safaricom's sandbox test phone number from their docs (in
   sandbox mode, you don't get a real prompt on your phone — Safaricom
   simulates it and calls your callback automatically after a few
   seconds).

In production, `APP_URL` is just your real domain — no tunnel needed.

## 6. Deploying

This is a standard Next.js app — it works on Vercel, a VPS with
PM2/Docker, Railway, Render, etc.

**If deploying to a VPS:**
```bash
npm install
npm run build
npm run start   # serves on port 3000 by default
```
Put it behind Nginx/Caddy for HTTPS and your real domain. Make sure
`data/` and `private/book/` are **persistent** directories (not wiped
on redeploy) since that's where orders and the book PDF live.

**If deploying to Vercel:** note that Vercel's filesystem is read-only
and ephemeral at runtime, so the simple JSON-file storage in `data/`
**will not persist** between requests there. For Vercel, swap
`src/lib/store.js` for a real database (e.g. Vercel Postgres, Supabase,
or Turso) — every other file in the app calls into `src/lib/orders.js`,
so you only need to change that one file's internals. The book PDF
would also need to move to S3/Cloudflare R2/Vercel Blob storage rather
than the local `private/` folder.

## 7. Analytics & Speed Insights

The site has `@vercel/analytics` and `@vercel/speed-insights` wired
into the root layout (`src/app/layout.js`) already — every page tracks
visits and Core Web Vitals automatically, no extra setup in the code.

**These only collect data when the site is deployed on Vercel.** They
no-op harmlessly everywhere else (local dev, a VPS, etc.) — the
scripts load but have nowhere to report to, so nothing breaks, you
just won't see numbers.

To turn the data on:
1. Deploy the project to Vercel (import the repo at vercel.com, or
   `vercel deploy` from the CLI).
2. Open the project in the Vercel dashboard → **Analytics** tab →
   click **Enable**.
3. Do the same on the **Speed Insights** tab.
4. Traffic and Core Web Vitals data will start appearing within a few
   minutes of the next visit.

Both are on Vercel's free Hobby tier with some limits on retention and
data points; check your Vercel plan if you want longer history.

## 8. About the data storage

Orders are stored in `data/orders.json` — a plain JSON file, written
safely (atomic writes + an in-process write queue) by
`src/lib/store.js`. This is intentionally simple: there's no database
to set up, and it's enough for a single-server deployment serving one
book. If you outgrow this (e.g. you deploy across multiple server
instances, or add more products), swap the internals of
`src/lib/store.js` for a real database — the rest of the app doesn't
need to change.

## 9. Project structure

```
src/
  app/                 Pages (App Router) + API routes
    api/contact/       Contact form -> email
    api/mpesa/         STK push, callback, status polling
    api/book/          Access verification + gated PDF streaming
    blog/[slug]/       Blog post pages (51 posts, statically generated)
    book/read/         The gated PDF reader
  components/          Header, Footer, forms, the book reader, etc.
  content/blog/        Extracted blog post content (JSON)
  lib/                 Email, M-Pesa client, order storage, access tokens
data/                  orders.json (created automatically)
private/book/          Where you put the real book PDF (not public!)
public/images/         Photos, logos, social icons, blog images
```

## 10. Updating site content

- **Blog posts**: edit the JSON files in `src/content/blog/`, or add
  a new one following the same shape and add it to `_index.json`.
- **Book chapters / highlights**: edit `src/components/BookPageClient.jsx`.
- **FAQs**: edit `src/app/faqs/page.js`.
- **Media videos**: edit `src/app/media/page.js`.
- **Working hours / contact details**: edit `src/app/contact/page.js`
  and `src/components/Footer.jsx`.
