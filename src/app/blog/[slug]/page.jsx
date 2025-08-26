// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { createClient } from "@supabase/supabase-js";

// // ✅ Setup Supabase client
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function BlogPostPage() {
//   const { slug } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!slug) return;

//     const fetchPost = async () => {
//       const { data, error } = await supabase
//         .from("posts")
//         .select("*")
//         .eq("slug", slug)
//         .single();

//       if (error) console.error("Error fetching post:", error);
//       else setPost(data);

//       setLoading(false);
//     };

//     fetchPost();
//   }, [slug]);

//   if (loading) return <p className="text-center mt-10">Loading post...</p>;
//   if (!post) return <p className="text-center mt-10">Post not found.</p>;

//   return (
//     <article className="container mx-auto px-4 py-12 max-w-3xl">
//       {/* Banner */}
//       {post.image_url && (
//         <img
//           src={post.image_url}
//           alt={post.title}
//           className="w-full h-64 object-cover rounded-2xl mb-6"
//         />
//       )}

//       {/* Title */}
//       <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
//       <p className="text-gray-400 text-sm mb-6">
//         {new Date(post.published_at).toDateString()} • {post.author}
//       </p>

//       {/* Content */}
//       <div className="prose prose-invert max-w-none">{post.content}</div>
//     </article>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import MarkdownRenderer from "../_components/MarkdownRenderer";
import { motion } from "framer-motion";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error) setPost(data);
      setLoading(false);
    })();
  }, [slug]);

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading post...</p>;
  if (!post)
    return <p className="text-center mt-10 text-gray-400">Post not found.</p>;

  return (
    <article className="container mx-auto px-6 py-12 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-6 shadow-xl"
          />
        )}

        <h1 className="text-4xl font-extrabold text-white mb-3">
          {post.title}
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {new Date(post.published_at).toLocaleDateString()} • {post.author}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
        >
          <MarkdownRenderer content={post.content} />
        </motion.div>

        {post.tags?.length ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full border text-gray-200"
              >
                #{t}
              </span>
            ))}
          </motion.div>
        ) : null}
      </motion.div>
    </article>
  );
}
