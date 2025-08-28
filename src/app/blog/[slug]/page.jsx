"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MarkdownRenderer from "../_components/MarkdownRenderer";

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch main post by slug
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", params.slug)
          .single();

        if (error) throw error;
        setPost(data);

        // Fetch related posts
        if (data?.category) {
          const { data: related } = await supabase
            .from("posts")
            .select("*")
            .eq("category", data.category)
            .neq("slug", params.slug)
            .limit(3)
            .order("published_at", { ascending: false });
          setRelatedPosts(related || []);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <Button className="mt-4" onClick={() => router.push("/blog")}>
              Back to Blog
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push("/blog")}
      >
        &larr; Back to Blog
      </Button>

      {/* Article Header */}
      <div className="mb-8">
        <span className="text-sm text-primary font-medium uppercase">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">{post.title}</h1>
        <div className="flex items-center mt-4 text-muted-foreground flex-wrap">
          <span>
            {new Date(post.published_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="mx-2">•</span>
          <span>{post.read_time || "5"} min read</span>
          <span className="mx-2">•</span>
          <span>by {post.author || "Tech Team"}</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.image_url ? (
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        </div>
      ) : (
        <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl mb-8 flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {post.category}
          </span>
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
        {post.content ? (
          <MarkdownRenderer content={post.content} />
        ) : (
          <div>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget urna ultrices ultricies.
            </p>
            <p className="mb-4">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Donec velit nunc, efficitur eu lectus at.
            </p>
          </div>
        )}
      </article>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card
                key={relatedPost.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => router.push(`/blog/${relatedPost.slug}`)}
              >
                <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-600 transition-colors">
                  <span className="text-white font-semibold text-sm">
                    {relatedPost.category}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(relatedPost.published_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Enjoyed this article?</h2>
          <p className="text-muted-foreground mb-4">
            Subscribe to our newsletter for more insights like this
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
