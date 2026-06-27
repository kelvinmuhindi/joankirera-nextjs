"use client";

import { useMemo, useState } from "react";
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
    if (p > 1) {
      const section = document.getElementById("postsSection");
      if (section) {
        const header = document.getElementById("header");
        const headerHeight = header ? header.offsetHeight : 0;
        const top =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          20;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
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

  return (
    <>
      <section className="latest-posts-container">
        <div className="container">
          <h2 className="fade-in-up">Latest Posts</h2>

          <div className="search-category-wrapper fade-in">
            <input
              type="text"
              className="search-input"
              placeholder="Search articles..."
              aria-label="Search blog posts"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <select
              className="category-dropdown"
              aria-label="Filter by category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              {CATEGORIES.map((c) => (
                <option value={c.value} key={c.value || "all"}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="posts" id="postsSection">
        {postsToShow.length === 0 ? (
          <div className="container" style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontSize: "2rem", color: "#4a4a4a" }}>No posts found</p>
            <p style={{ fontSize: "1.6rem", color: "#6b7280", marginTop: "10px" }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          postsToShow.map((post, index) => (
            <div
              className="panel fade-in"
              data-category={post.category}
              key={post.slug}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link href={`/blog/${post.slug}`} className="image-link">
                <img src={post.image} alt={post.title} loading="lazy" />
              </Link>
              <div className="date">{formatDate(post.date)}</div>
              <Link href={`/blog/${post.slug}`} className="title">
                {post.title}
              </Link>
            </div>
          ))
        )}
      </section>

      {totalPages > 1 && (
        <section>
          <ul className="pagination" aria-label="Blog pagination">
            {currentPage > 1 && (
              <li>
                <a
                  href="#"
                  aria-label="Previous page"
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(currentPage - 1);
                  }}
                >
                  ←
                </a>
              </li>
            )}

            {pageNumbers.map((p) =>
              typeof p === "number" ? (
                <li key={p}>
                  <a
                    href="#"
                    aria-label={`Page ${p}`}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={p === currentPage ? "active" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(p);
                    }}
                  >
                    {p}
                  </a>
                </li>
              ) : (
                <li key={p}>
                  <span style={{ padding: "10px", color: "#6b7280" }}>…</span>
                </li>
              )
            )}

            {currentPage < totalPages && (
              <li>
                <a
                  href="#"
                  aria-label="Next page"
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(currentPage + 1);
                  }}
                >
                  →
                </a>
              </li>
            )}
          </ul>
        </section>
      )}
    </>
  );
}
