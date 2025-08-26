// components/blog/BlogCard.jsx
"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function BlogCard({ post }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl transition-all h-full flex flex-col">
        {/* Image */}
        {post.image_url && (
          <div className="relative group">
            <img
              src={post.image_url}
              alt={post.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
          </div>
        )}

        {/* Content */}
        <CardContent className="p-5 flex flex-col flex-1">
          <Link href={`/blog/${post.slug}`} className="block flex-1">
            <h2 className="text-xl font-semibold leading-tight line-clamp-2 hover:text-primary transition-colors">
              {post.title}
            </h2>
          </Link>

          <p className="text-xs text-muted-foreground mt-2">
            {new Date(post.published_at).toDateString()} ·{" "}
            <span className="font-medium">{post.author}</span>
          </p>

          {post.excerpt && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";

// const cardVariants = {
//   hidden: { opacity: 0, y: 12, scale: 0.995 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 160, damping: 14 },
//   },
//   hover: {
//     scale: 1.03,
//     transition: { type: "spring", stiffness: 300, damping: 20 },
//   },
// };

// export default function BlogCard({ post }) {
//   return (
//     <motion.article
//       layout
//       initial="hidden"
//       animate="visible"
//       whileHover="hover"
//       variants={cardVariants}
//       className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-lg"
//     >
//       <Link href={`/blog/${post.slug}`} className="block">
//         {post.image_url ? (
//           <img
//             src={post.image_url}
//             alt={post.title}
//             className="w-full h-56 object-cover"
//             loading="lazy"
//             decoding="async"
//           />
//         ) : (
//           <div className="w-full h-56 bg-slate-700/30" />
//         )}

//         <div className="p-5">
//           <h2 className="text-2xl font-bold text-white mb-2 leading-tight line-clamp-2">
//             {post.title}
//           </h2>
//           <p className="text-gray-400 text-sm mb-4 line-clamp-3">
//             {post.excerpt}
//           </p>

//           <div className="flex justify-between items-center text-xs text-gray-400">
//             <time dateTime={post.published_at}>
//               {new Date(post.published_at).toLocaleDateString()}
//             </time>
//             <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-xs">
//               {post.category ?? "General"}
//             </span>
//           </div>
//         </div>
//       </Link>
//     </motion.article>
//   );
// }
