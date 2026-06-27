import crypto from "crypto";

const SECRET = process.env.BOOK_ACCESS_SECRET || "dev-only-insecure-secret";
const TOKEN_VERSION = "v1";

// Access never expires by default once purchased — a reader who paid
// should always be able to come back. Set BOOK_ACCESS_TTL_DAYS to a
// number of days if you'd like access to lapse instead.
const TTL_DAYS = process.env.BOOK_ACCESS_TTL_DAYS
  ? Number(process.env.BOOK_ACCESS_TTL_DAYS)
  : null;

function sign(payload) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

/**
 * Issue a signed, URL-safe access token for a paid order.
 * Token format: v1.<base64url(json)>.<hmac signature>
 */
export function issueAccessToken({ orderId, email }) {
  const issuedAt = Date.now();
  const expiresAt = TTL_DAYS ? issuedAt + TTL_DAYS * 24 * 60 * 60 * 1000 : null;
  const payload = JSON.stringify({ orderId, email, issuedAt, expiresAt });
  const payloadB64 = Buffer.from(payload).toString("base64url");
  const signature = sign(payloadB64);
  return `${TOKEN_VERSION}.${payloadB64}.${signature}`;
}

/**
 * Verify a token. Returns the decoded payload if valid, otherwise null.
 */
export function verifyAccessToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [version, payloadB64, signature] = parts;
  if (version !== TOKEN_VERSION) return null;

  const expectedSignature = sign(payloadB64);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    sigBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString());
    if (payload.expiresAt && Date.now() > payload.expiresAt) return null;
    return payload;
  } catch {
    return null;
  }
}

export const ACCESS_COOKIE_NAME = "book_access";
