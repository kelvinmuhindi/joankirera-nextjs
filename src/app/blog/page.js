import { getAllBlogMeta } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export const metadata = {
  title: "Blog",
  description:
    "Mental health and therapy insights from Joan Kirera — articles on marriage, parenting, grief, relationships, and personal growth.",
};

export default function BlogPage() {
  const posts = getAllBlogMeta();
  return <BlogList posts={posts} />;
}
