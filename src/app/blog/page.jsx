"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "./_components/Sidebar";
import BlogCard from "./_components/BlogCard";

// ✅ Setup Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [recent, setRecent] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 6;

  // 🔹 Fetch posts with filters
  const fetchPage = async (reset = false) => {
    setLoading(true);

    let q = supabase
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false })
      .range(
        reset ? 0 : (page - 1) * PAGE_SIZE,
        reset ? PAGE_SIZE - 1 : page * PAGE_SIZE - 1
      );

    if (activeCategory) q = q.eq("category", activeCategory);
    if (activeTag) q = q.contains("tags", [activeTag]);
    if (query) q = q.ilike("title", `%${query}%`);

    const { data, error } = await q;
    if (error) console.error("Error fetching posts:", error);

    if (reset) {
      setPosts(data || []);
      setPage(1);
    } else {
      setPosts((prev) => [...prev, ...(data || [])]);
    }

    setHasMore(data && data.length === PAGE_SIZE);
    setLoading(false);
  };

  // 🔹 Fetch categories, tags, and recent posts
  useEffect(() => {
    const fetchMeta = async () => {
      const { data: tagsData } = await supabase.from("tags_view").select("*");
      const { data: recentData } = await supabase
        .from("recent_posts")
        .select("*");
      const { data: cats } = await supabase
        .from("posts")
        .select("category")
        .not("category", "is", null);

      setTags(tagsData?.map((t) => t.tag) || []);
      setRecent(recentData || []);
      setCategories([...new Set(cats?.map((c) => c.category))]);
    };

    fetchMeta();
    fetchPage(true);
  }, []);

  // 🔹 Refetch when filters/search change
  useEffect(() => {
    fetchPage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTag, activeCategory, query]);

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>

      {/* Search */}
      <div className="mb-8 flex gap-3">
        <Input
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={() => fetchPage(true)} disabled={loading}>
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar
            categories={categories}
            tags={tags}
            recent={recent}
            activeTag={activeTag}
            onTagClick={(tag) => setActiveTag(tag)}
            activeCategory={activeCategory}
            onCategoryClick={(cat) => setActiveCategory(cat)}
          />
        </div>

        {/* Posts */}
        <div className="lg:col-span-3">
          {loading && posts.length === 0 ? (
            <p className="opacity-70">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="opacity-70">No posts found.</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button onClick={() => fetchPage(false)} disabled={loading}>
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import Sidebar from "./_components/Sidebar";
// import BlogCard from "./_components/BlogCard";
// import { motion, AnimatePresence } from "framer-motion";

// const listContainer = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
// };
// const listItem = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function BlogPage() {
//   const [posts, setPosts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [pageIndex, setPageIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [recent, setRecent] = useState([]);
//   const PAGE_SIZE = 6;

//   const fetchFilters = useCallback(async () => {
//     // tags & categories & recent
//     const [tagsRes, catsRes, recentRes] = await Promise.all([
//       supabase.from("tags_view").select("tag"),
//       supabase.from("posts").select("category").not("category", "is", null),
//       supabase
//         .from("posts")
//         .select("title,slug,published_at")
//         .order("published_at", { ascending: false })
//         .limit(5),
//     ]);

//     if (!tagsRes.error)
//       setTags([...new Set((tagsRes.data || []).map((t) => t.tag))]);
//     if (!catsRes.error)
//       setCategories(
//         [...new Set((catsRes.data || []).map((c) => c.category))].filter(
//           Boolean
//         )
//       );
//     if (!recentRes.error) setRecent(recentRes.data || []);
//   }, []);

//   const fetchPage = useCallback(
//     async (reset = false) => {
//       setLoading(true);
//       const from = reset ? 0 : pageIndex * PAGE_SIZE;
//       const to = from + PAGE_SIZE - 1;
//       let q = supabase
//         .from("posts")
//         .select("*")
//         .order("published_at", { ascending: false })
//         .range(from, to);
//       if (search) q = q.ilike("title", `%${search}%`);
//       const { data, error } = await q;
//       if (!error) {
//         setPosts((prev) => (reset ? data ?? [] : [...prev, ...(data ?? [])]));
//         if ((data ?? []).length < PAGE_SIZE) {
//           // no more
//         }
//         if (reset) setPageIndex(1);
//         else setPageIndex((p) => p + 1);
//       }
//       setLoading(false);
//     },
//     [pageIndex, search]
//   );

//   useEffect(() => {
//     fetchFilters();
//     fetchPage(true);
//   }, [fetchFilters, fetchPage]);

//   useEffect(() => {
//     // when search changes, reset listing
//     const t = setTimeout(() => fetchPage(true), 400);
//     return () => clearTimeout(t);
//   }, [search, fetchPage]);

//   return (
//     <section className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
//       {/* Main */}
//       <div className="lg:col-span-3">
//         {/* Search */}
//         <motion.div
//           initial={{ opacity: 0, y: -8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.36 }}
//           className="mb-6"
//         >
//           <div className="relative">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search posts, tags, or authors..."
//               className="w-full px-5 py-3 rounded-2xl bg-slate-800 text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-blue-500 outline-none"
//             />
//             <div className="absolute right-3 top-3 opacity-60 text-sm">⌘K</div>
//           </div>
//         </motion.div>

//         {/* Posts grid */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={listContainer}
//           className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
//         >
//           <AnimatePresence>
//             {posts.map((p) => (
//               <motion.div
//                 key={p.id}
//                 layout
//                 variants={listItem}
//                 exit={{ opacity: 0, y: 8 }}
//               >
//                 <BlogCard post={p} />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* Load more */}
//         <div className="mt-10 flex justify-center">
//           <motion.button
//             whileTap={{ scale: 0.98 }}
//             onClick={() => fetchPage()}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Load More"}
//           </motion.button>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <aside>
//         <Sidebar
//           categories={categories}
//           tags={tags}
//           recent={recent}
//           onTagClick={(t) => {
//             setSearch(t ? `#${t}` : "");
//             setPageIndex(0);
//             fetchPage(true);
//           }}
//           onCategoryClick={(c) => {
//             setSearch(c || "");
//             setPageIndex(0);
//             fetchPage(true);
//           }}
//         />
//       </aside>
//     </section>
//   );
// }
