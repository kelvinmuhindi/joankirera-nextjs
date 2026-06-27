import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogMeta, getBlogPost } from "@/lib/blog";

export function generateStaticParams() {
  return getAllBlogMeta().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: `${post.title} - Joan Kirera`,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="blog-post-article section-padding">
      <div className="blog-post-container">
        <header className="blog-post-header fade-in-up">
          <Link href="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
          <h1 className="blog-post-title">{post.title}</h1>
        </header>

        {post.image && (
          <div className="blog-post-image-wrapper fade-in">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="blog-post-image"
            />
          </div>
        )}

        <div
          className="blog-post-content fade-in"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />

        <div
          style={{
            textAlign: "center",
            marginTop: "5rem",
            paddingTop: "4rem",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <p
            style={{
              fontSize: "1.7rem",
              color: "var(--text-medium)",
              marginBottom: "2rem",
            }}
          >
            If this resonated with you, Joan would love to walk this journey
            with you.
          </p>
          <Link href="/contact" className="btn btn--primary">
            Book a Session
          </Link>
        </div>
      </div>
    </article>
  );
}
