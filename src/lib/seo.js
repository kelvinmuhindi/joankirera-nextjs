// Open Graph / Twitter card metadata shared by every page.
// Images live in /public/og (1200x630). URLs are resolved against
// `metadataBase` in app/layout.js, so they become absolute in the HTML.

export const SITE_NAME = "Joan Kirera";

export const DEFAULT_OG_IMAGE = {
  url: "/og/default.jpg",
  width: 1200,
  height: 630,
  alt: "Joan Kirera - Therapist & Mental Health Educator",
};

export const BOOK_OG_IMAGE = {
  url: "/og/book.jpg",
  width: 1200,
  height: 630,
  alt: "From Dating to Marriage by Dr. Rose Misati & Joan Kirera",
};

/**
 * Returns { openGraph, twitter } to spread into a page's metadata.
 * The browser-tab <title> is untouched; only the social title gets the
 * site name appended so a bare "Blog" reads well in a link preview.
 */
export function socialMeta({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  extra = {},
}) {
  const socialTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  return {
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: path,
      images: [image],
      ...extra,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}
