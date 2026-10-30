import BookPageClient from "@/components/BookPageClient";
import { socialMeta, BOOK_OG_IMAGE } from "@/lib/seo";

const title = "From Dating to Marriage — Book";
const description =
  "From Dating to Marriage by Dr. Rose Misati & Joan Kirera — a grounded, compassionate guide for couples at every stage. Read online instantly after paying with M-Pesa.";

export const metadata = {
  title,
  description,
  ...socialMeta({
    title,
    description,
    path: "/book",
    image: BOOK_OG_IMAGE,
  }),
};

export default function BookPage() {
  return <BookPageClient />;
}
