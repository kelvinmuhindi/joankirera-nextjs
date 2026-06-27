import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/access-token";

const BOOK_PATH = path.join(
  process.cwd(),
  "private",
  "book",
  process.env.BOOK_FILENAME || "from-dating-to-marriage.pdf"
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const payload = verifyAccessToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  if (!fs.existsSync(BOOK_PATH)) {
    return NextResponse.json(
      { error: "The book file hasn't been uploaded yet. Please contact support." },
      { status: 503 }
    );
  }

  const fileBuffer = fs.readFileSync(BOOK_PATH);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      // inline = render in-browser rather than force-downloading;
      // this keeps the PDF viewer experience instead of prompting Save As.
      "Content-Disposition": "inline; filename=\"from-dating-to-marriage.pdf\"",
      "Cache-Control": "private, no-store",
    },
  });
}
