"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "children-wellness", label: "Children Wellness" },
  { value: "dating-premarital", label: "Dating and Premarital" },
  { value: "family", label: "Family" },
  { value: "individual-wellness", label: "Individual Wellness" },
  { value: "loss-grief", label: "Loss and Grief" },
  { value: "marriage", label: "Marriage" },
  { value: "mental-health", label: "Mental Health" },
  { value: "parenting-coparenting", label: "Parenting and Co-parenting" },
  { value: "relationships", label: "Relationships" },
  { value: "separation-divorce", label: "Separation and Divorce" },
  { value: "teenagers", label: "Teenagers" },
];

const POSTS_PER_PAGE = 12;
const CATEGORY_LABELS = Object.fromEntries(
  CATEGORIES.filter((c) => c.value).map((c) => [c.value, c.label])
);

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogList({ posts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const sorted = useMemo(
    () =>
      [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [posts]
  );

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return sorted.filter((post) => {
      const matchesSearch = !term || post.title.toLowerCase().includes(term);
      const matchesCategory = !category || post.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [sorted, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const postsToShow = filtered.slice(start, start + POSTS_PER_PAGE);

  function goToPage(p) {
    setPage(p);
    const section = document.getElementById("postsSection");
    if (!section) return;
    // Offset for the sticky header and the sticky filter bar
    const stickyHeight =
      (document.getElementById("header")?.offsetHeight ?? 0) +
      (document.querySelector(".blog-filters")?.offsetHeight ?? 0);
    const top =
      section.getBoundingClientRect().top + window.scrollY - stickyHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });
  }

  // Build page numbers with ellipsis, mirroring the original pagination logic
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pageNumbers.push("ellipsis-" + i);
    }
  }

  const showFeatured = currentPage === 1 && !search.trim() && !category;

  return (
    <>
      <section className="latest-posts-container">
        <div className="container">
          <h2 className="fade-in-up">Latest Posts</h2>
        </div>
      </section>

      <div className="blog-filters">
        <div className="container blog-filters__inner">
          <input
            type="search"
            className="search-input"
            placeholder="Search articles..."
            aria-label="Search blog posts"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <div className="category-chips" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                type="button"
                key={c.value || "all"}
                className={`chip${category === c.value ? " chip--active" : ""}`}
                aria-pressed={category === c.value}
                onClick={() => {
                  setCategory(c.value);
                  setPage(1);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="posts" id="postsSection">
        {postsToShow.length === 0 ? (
          <div className="posts__empty">
            <p className="posts__empty-title">No posts found</p>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          postsToShow.map((post, index) => {
            const featured = showFeatured && index === 0;
            return (
              <article
                className={`panel${featured ? " panel--featured" : ""}`}
                data-category={post.category}
                key={post.slug}
              >
                <div className="panel__media">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes={
                      featured
                        ? "(max-width: 900px) 100vw, 640px"
                        : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px"
                    }
                  />
                </div>
                <div className="panel__body">
                  <div className="panel__meta">
                    <span className="panel__tag">
                      {CATEGORY_LABELS[post.category] || post.category}
                    </span>
                    <span className="date">{formatDate(post.date)}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="title">
                    {post.title}
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </section>

      {totalPages > 1 && (
        <nav aria-label="Blog pagination">
          <ul className="pagination">
            {currentPage > 1 && (
              <li>
                <button
                  type="button"
                  aria-label="Previous page"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  ←
                </button>
              </li>
            )}

            {pageNumbers.map((p) =>
              typeof p === "number" ? (
                <li key={p}>
                  <button
                    type="button"
                    aria-label={`Page ${p}`}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={p === currentPage ? "active" : undefined}
                    onClick={() => goToPage(p)}
                  >
                    {p}
                  </button>
                </li>
              ) : (
                <li key={p} className="pagination__gap" aria-hidden="true">
                  …
                </li>
              )
            )}

            {currentPage < totalPages && (
              <li>
                <button
                  type="button"
                  aria-label="Next page"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  →
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
