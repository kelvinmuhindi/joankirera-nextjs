import SafeImage from "@/components/SafeImage";
import { DEFAULT_OG_IMAGE, socialMeta } from "@/lib/seo";
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

  const description = `${post.title} - Joan Kirera`;

  // Use the article's own picture when social crawlers can read it
  // (jpg/png/webp). SVG and the odd .jfif fall back to the site card.
  const usable = /\.(jpe?g|png|webp)$/i.test(post.image || "");
  const image = usable
    ? { url: post.image, alt: post.title }
    : DEFAULT_OG_IMAGE;

  const published = new Date(post.date);
  const extra = Number.isNaN(published.getTime())
    ? {}
    : { publishedTime: published.toISOString() };

  return {
    title: post.title,
    description,
    ...socialMeta({
      title: post.title,
      description,
      path: `/blog/${slug}`,
      image,
      type: "article",
      extra,
    }),
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
            <SafeImage
              src={post.image}
              alt={post.title}
              width={1200}
              height={675}
              preload
              sizes="(max-width: 900px) 100vw, 860px"
              className="blog-post-image"
            />
          </div>
        )}

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />

        <footer className="blog-post-footer">
          <div className="post-author-bio">
            <p className="author-signature">
              By Joan Kirera - Psychologist / Marriage and Family Therapist
            </p>
          </div>
          <div className="post-navigation">
            <Link href="/blog" className="btn btn--primary">
              ← Back to All Posts
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
