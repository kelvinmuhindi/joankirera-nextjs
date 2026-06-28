import { randomUUID } from "crypto";
import { readCollection, updateCollection } from "./store";

const COLLECTION = "submissions";

/**
 * Submission shape:
 * {
 *   id: string (uuid),
 *   name: string,
 *   email: string,
 *   phone: string | null,
 *   service: string,
 *   eventDate: string | null,
 *   message: string | null,
 *   emailStatus: "sent" | "failed",
 *   createdAt: ISO string,
 * }
 *
 * This is intentionally a plain JSON file via src/lib/store.js, same
 * as orders.js. If you outgrow this (e.g. multiple server instances,
 * or you want a real admin view), swap the internals of store.js for
 * a database — every caller of this file stays the same.
 */

export async function recordSubmission({
  name,
  email,
  phone,
  service,
  eventDate,
  message,
  emailStatus,
}) {
  const submission = {
    id: randomUUID(),
    name,
    email,
    phone: phone || null,
    service,
    eventDate: eventDate || null,
    message: message || null,
    emailStatus,
    createdAt: new Date().toISOString(),
  };
  await updateCollection(COLLECTION, (subs) => [...subs, submission]);
  return submission;
}

export function getAllSubmissions() {
  return readCollection(COLLECTION, []);
}
