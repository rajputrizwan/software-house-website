"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
        {/* Post Image */}
        {post.image_url ? (
          <div className="overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-52 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-semibold">{post.category}</span>
          </div>
        )}

        {/* Post Content */}
        <CardContent className="p-6">
          <span className="text-xs uppercase font-medium text-primary">
            {post.category}
          </span>
          <h2 className="text-xl font-semibold mt-2 group-hover:text-primary transition line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(post.published_at).toLocaleDateString()} •{" "}
            {post.read_time || "5"} min read
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
            by {post.author || "Tech Team"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
