import { randomUUID } from "crypto";
import { readCollection, updateCollection } from "./store";

const COLLECTION = "orders";

/**
 * Order shape:
 * {
 *   id: string (uuid),
 *   fullName: string,
 *   email: string,
 *   phone: string (254XXXXXXXXX),
 *   amount: number,
 *   status: "pending" | "paid" | "failed" | "cancelled",
 *   merchantRequestId: string | null,
 *   checkoutRequestId: string | null,
 *   mpesaReceiptNumber: string | null,
 *   resultDesc: string | null,
 *   createdAt: ISO string,
 *   updatedAt: ISO string,
 * }
 */

export function createOrder({ fullName, email, phone, amount }) {
  const now = new Date().toISOString();
  const order = {
    id: randomUUID(),
    fullName,
    email,
    phone,
    amount,
    status: "pending",
    merchantRequestId: null,
    checkoutRequestId: null,
    mpesaReceiptNumber: null,
    resultDesc: null,
    createdAt: now,
    updatedAt: now,
  };
  return updateCollection(COLLECTION, (orders) => [...orders, order]).then(
    () => order
  );
}

export function getOrder(id) {
  const orders = readCollection(COLLECTION, []);
  return orders.find((o) => o.id === id) || null;
}

export function getOrderByCheckoutRequestId(checkoutRequestId) {
  const orders = readCollection(COLLECTION, []);
  return orders.find((o) => o.checkoutRequestId === checkoutRequestId) || null;
}

export async function attachCheckoutRequest(
  id,
  { merchantRequestId, checkoutRequestId }
) {
  await updateCollection(COLLECTION, (orders) =>
    orders.map((o) =>
      o.id === id
        ? {
            ...o,
            merchantRequestId,
            checkoutRequestId,
            updatedAt: new Date().toISOString(),
          }
        : o
    )
  );
  return getOrder(id);
}

export async function markOrderPaid(
  checkoutRequestId,
  { mpesaReceiptNumber, resultDesc }
) {
  await updateCollection(COLLECTION, (orders) =>
    orders.map((o) =>
      o.checkoutRequestId === checkoutRequestId
        ? {
            ...o,
            status: "paid",
            mpesaReceiptNumber,
            resultDesc,
            updatedAt: new Date().toISOString(),
          }
        : o
    )
  );
  return getOrderByCheckoutRequestId(checkoutRequestId);
}

export async function markOrderFailed(checkoutRequestId, { resultDesc }) {
  await updateCollection(COLLECTION, (orders) =>
    orders.map((o) =>
      o.checkoutRequestId === checkoutRequestId
        ? {
            ...o,
            status: "failed",
            resultDesc,
            updatedAt: new Date().toISOString(),
          }
        : o
    )
  );
  return getOrderByCheckoutRequestId(checkoutRequestId);
}
