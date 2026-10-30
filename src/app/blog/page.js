import { getAllBlogMeta } from "@/lib/blog";
import BlogList from "@/components/BlogList";
import { socialMeta } from "@/lib/seo";

const title = "Blog";
const description =
  "Mental health and therapy insights from Joan Kirera — articles on marriage, parenting, grief, relationships, and personal growth.";

export const metadata = {
  title,
  description,
  ...socialMeta({
    title,
    description,
    path: "/blog",
  }),
};

export default function BlogPage() {
  const posts = getAllBlogMeta();
  return <BlogList posts={posts} />;
}
