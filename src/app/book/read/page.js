import BookReaderClientOnly from "@/components/BookReaderClientOnly";

export const metadata = {
  title: "Read: From Dating to Marriage",
  robots: { index: false, follow: false },
};

export default async function BookReadPage({ searchParams }) {
  const params = await searchParams;
  const token = params?.token || "";

  return <BookReaderClientOnly token={token} />;
}
