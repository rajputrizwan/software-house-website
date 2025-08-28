"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";

const categories = [
  "All",
  "Development",
  "AI & Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
  "UI/UX Design",
];

export default function BlogPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setFilteredPosts(data || []);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let tempPosts = [...posts];

    if (selectedCategory !== "All") {
      tempPosts = tempPosts.filter(
        (post) => post.category === selectedCategory
      );
    }

    if (sortOrder === "Oldest") {
      tempPosts = tempPosts.reverse();
    }

    setFilteredPosts(tempPosts);
    setPage(1);
  }, [selectedCategory, sortOrder, posts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  // Get featured post (most recent post)
  const featuredPost = posts.length > 0 ? posts[0] : null;

  // Function to handle card click and redirect to blog detail page
  const handleCardClick = (postSlug) => {
    router.push(`/blog/${postSlug}`);
  };

  // Function to handle featured post click
  const handleFeaturedPostClick = () => {
    if (featuredPost) {
      router.push(`/blog/${featuredPost.slug}`);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Featured Hero */}
      {featuredPost && (
        <div
          className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 cursor-pointer"
          onClick={handleFeaturedPostClick}
        >
          <div className="p-8 md:p-12 lg:p-16 text-white">
            <span className="text-sm text-blue-100">
              {featuredPost.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              {featuredPost.title}
            </h1>
            <p className="text-blue-100 mt-4 max-w-2xl">
              {featuredPost.excerpt ||
                "Read our latest insights on technology and software development."}
            </p>
            <p className="text-blue-200 text-sm mt-4">
              {new Date(featuredPost.published_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              • {featuredPost.read_time || "5 mins read"}
            </p>
            <Button className="mt-6 bg-white text-blue-700 hover:bg-blue-50">
              Read Article
            </Button>
          </div>
        </div>
      )}

      {/* Blog Filters & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Newest">Newest</SelectItem>
            <SelectItem value="Oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => handleCardClick(post.slug)}
          >
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-600 transition-colors">
              <span className="text-white font-semibold text-lg">
                {post.category}
              </span>
            </div>
            <CardContent className="p-4">
              <span className="text-xs uppercase text-primary">
                {post.category}
              </span>
              <h2 className="text-lg font-semibold mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                • {post.read_time || "5 mins read"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                by {post.author || "Tech Team"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <Button
            variant="outline"
            className="rounded-full"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={page === i + 1 ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            className="rounded-full"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Bottom Banners */}
      <div className="grid md:grid-cols-3 gap-6 mt-14">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6">
          <h3 className="text-xl font-semibold">
            Need custom software solutions?
          </h3>
          <p className="mt-2 text-blue-100">
            Let our experts help you build the perfect solution
          </p>
          <Button className="mt-4 bg-white text-blue-700 hover:bg-blue-50">
            Contact Us
          </Button>
        </div>
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 flex items-end">
          <h3 className="text-xl font-semibold">Explore our case studies</h3>
        </div>
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-700 text-white p-6">
          <h3 className="text-xl font-semibold">Subscribe to our newsletter</h3>
          <p className="mt-2 text-blue-100">
            Get the latest tech insights delivered to your inbox
          </p>
          <Button className="mt-4 bg-white text-blue-700 hover:bg-blue-50">
            Subscribe
          </Button>
        </div>
      </div>
    </main>
  );
}
