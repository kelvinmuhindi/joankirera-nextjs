import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/access-token";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const payload = verifyAccessToken(token);
  if (!payload) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  return NextResponse.json({ valid: true, email: payload.email });
}
