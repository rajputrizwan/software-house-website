"use client";

import Link from "next/link";

export default function Sidebar({
  categories = [],
  tags = [],
  recent = [],
  activeCategory,
  onCategoryClick,
  activeTag,
  onTagClick,
}) {
  return (
    <aside className="space-y-8">
      {/* Categories */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryClick(cat === "All" ? null : cat)}
              className={`text-sm px-3 py-1 rounded-full border transition ${
                (activeCategory ?? "All") === cat
                  ? "bg-foreground text-background"
                  : "hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["All", ...tags].map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag === "All" ? null : tag)}
              className={`text-sm px-3 py-1 rounded-full border transition ${
                (activeTag ?? "All") === tag
                  ? "bg-foreground text-background"
                  : "hover:bg-muted"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Recent Posts</h3>
        <ul className="space-y-2 text-sm">
          {recent.map((p) => (
            <li key={p.id}>
              <Link
                href={`/blog/${p.slug}`}
                className="hover:underline text-gray-300"
              >
                {p.title}
              </Link>
              <div className="opacity-60 text-xs">
                {new Date(p.published_at).toDateString()}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
