import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";
import { issueAccessToken } from "@/lib/access-token";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "orderId is required" }, { status: 400 });
  }

  const order = getOrder(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const response = { status: order.status };

  if (order.status === "paid") {
    response.accessToken = issueAccessToken({
      orderId: order.id,
      email: order.email,
    });
  }
  if (order.status === "failed") {
    response.message = order.resultDesc || "Payment was not completed.";
  }

  return NextResponse.json(response);
}
