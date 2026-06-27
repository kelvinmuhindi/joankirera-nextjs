import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

let indexCache = null;

export function getAllBlogMeta() {
  if (indexCache) return indexCache;
  const raw = fs.readFileSync(path.join(BLOG_DIR, "_index.json"), "utf-8");
  indexCache = JSON.parse(raw);
  return indexCache;
}

export function getBlogPost(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getAllCategories() {
  const meta = getAllBlogMeta();
  const categories = new Set(meta.map((p) => p.category));
  return Array.from(categories).sort();
}

export function formatCategoryLabel(category) {
  return category
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
