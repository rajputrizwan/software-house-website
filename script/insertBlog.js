// // import { createClient } from "@supabase/supabase-js";

// // // 1️⃣ Connect to Supabase
// // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // ensure this is set in your environment variables
// // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // ensure this is set in your environment variables
// // const supabase = createClient(supabaseUrl, supabaseKey);

// // // 2️⃣ Blog data
// // const blog = {
// //   title: "The Ultimate Guide to Web Development",
// //   slug: "ultimate-guide-web-development",
// //   content: `
// // # The Ultimate Guide to Web Development: From Basics to Advanced Techniques

// // Web development is one of the most dynamic and in-demand skills in today’s digital era. Whether you want to create personal projects, freelance for clients, or work at a tech giant, web development opens countless opportunities. This comprehensive guide will take you from the basics to advanced concepts, giving you a clear roadmap to becoming a skilled web developer.

// // ## 1. Introduction: What is Web Development?

// // Web development is the process of building websites and web applications that run on the internet. A website might be a simple portfolio, a blog, or a complex e-commerce platform. A web application could be a social media platform, an online editor, or a SaaS product.

// // There are three main types of web development:

// // - Front-End Development
// // - Back-End Development
// // - Full-Stack Development

// // ...

// // (You can paste the full blog content here in Markdown)
// // `,
// //   category: "Web Development",
// // };

// // // 3️⃣ Insert blog into Supabase
// // async function insertBlog() {
// //   const { data, error } = await supabase
// //     .from("blogs") // make sure your table name is 'blogs'
// //     .insert([blog]);

// //   if (error) {
// //     console.error("Error inserting blog:", error);
// //   } else {
// //     console.log("Blog inserted successfully:", data);
// //   }
// // }

// // insertBlog();

// import { useState, useEffect } from "react";
// import { createClient } from "@supabase/supabase-js";
// import ReactMarkdown from "react-markdown";

// const BlogPublisher = () => {
//   const [supabaseUrl, setSupabaseUrl] = useState("");
//   const [supabaseKey, setSupabaseKey] = useState("");
//   const [supabaseClient, setSupabaseClient] = useState(null);

//   const [title, setTitle] = useState("The Ultimate Guide to Web Development");
//   const [slug, setSlug] = useState("ultimate-guide-web-development");
//   const [content, setContent] = useState("Write your markdown here...");
//   const [category, setCategory] = useState("Web Development");

//   const [status, setStatus] = useState({ message: "", type: "" });

//   useEffect(() => {
//     if (title && !slug) {
//       const generatedSlug = title
//         .toLowerCase()
//         .replace(/[^a-z0-9 -]/g, "")
//         .replace(/\s+/g, "-")
//         .replace(/-+/g, "-")
//         .trim();
//       setSlug(generatedSlug);
//     }
//   }, [title, slug]);

//   const handleConnect = () => {
//     if (!supabaseUrl || !supabaseKey) {
//       setStatus({
//         message: "Please provide both Supabase URL and Key",
//         type: "error",
//       });
//       return;
//     }
//     try {
//       const client = createClient(supabaseUrl, supabaseKey);
//       setSupabaseClient(client);
//       setStatus({
//         message: "Connected to Supabase successfully!",
//         type: "success",
//       });
//     } catch (error) {
//       setStatus({
//         message: `Connection failed: ${error.message}`,
//         type: "error",
//       });
//     }
//   };

//   const handlePublish = async () => {
//     if (!supabaseClient) {
//       setStatus({ message: "Please connect to Supabase first", type: "error" });
//       return;
//     }
//     if (!title || !slug || !content) {
//       setStatus({ message: "Please fill in all fields", type: "error" });
//       return;
//     }

//     const blog = {
//       title,
//       slug,
//       content,
//       category,
//       created_at: new Date().toISOString(),
//     };

//     const { data, error } = await supabaseClient.from("blogs").insert([blog]);
//     if (error) setStatus({ message: error.message, type: "error" });
//     else
//       setStatus({ message: "Blog published successfully!", type: "success" });
//   };

//   return (
//     <div className="container">
//       <h1>Supabase Blog Publisher</h1>

//       <div>
//         <h2>Supabase Configuration</h2>
//         <input
//           placeholder="Supabase URL"
//           value={supabaseUrl}
//           onChange={(e) => setSupabaseUrl(e.target.value)}
//         />
//         <input
//           placeholder="Supabase Key"
//           value={supabaseKey}
//           onChange={(e) => setSupabaseKey(e.target.value)}
//         />
//         <button onClick={handleConnect}>Connect</button>
//       </div>

//       <div>
//         <h2>Blog Content</h2>
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           placeholder="Slug"
//           value={slug}
//           onChange={(e) => setSlug(e.target.value)}
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option>Web Development</option>
//           <option>Technology</option>
//           <option>Programming</option>
//           <option>Design</option>
//           <option>Other</option>
//         </select>
//         <textarea
//           placeholder="Content (Markdown)"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <button onClick={handlePublish}>Publish Blog</button>
//       </div>

//       {status.message && <p className={status.type}>{status.message}</p>}

//       <div>
//         <h2>Preview</h2>
//         <h3>{title}</h3>
//         <p>Slug: {slug}</p>
//         <p>Category: {category}</p>
//         <ReactMarkdown>{content}</ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// export default BlogPublisher;

// script/insertPost.js
import { createClient } from "@supabase/supabase-js";

// 1️⃣ Connect to Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 2️⃣ Blog data
const post = {
  title: "The Ultimate Guide to Web Development",
  slug: "ultimate-guide-web-development",
  content: `
# The Ultimate Guide to Web Development: From Basics to Advanced Techniques

Web development is one of the most dynamic and in-demand skills in today's digital era. Whether you want to create personal projects, freelance for clients, or work at a tech giant, web development opens countless opportunities. This comprehensive guide will take you from the basics to advanced concepts, giving you a clear roadmap to becoming a skilled web developer.

## 1. Introduction: What is Web Development?

Web development is the process of building websites and web applications that run on the internet. A website might be a simple portfolio, a blog, or a complex e-commerce platform. A web application could be a social media platform, an online editor, or a SaaS product.

There are three main types of web development:

- Front-End Development
- Back-End Development
- Full-Stack Development
`,
  excerpt: "A comprehensive guide from basics to advanced web development.",
  category: "Development", // Must match your CHECK constraint
  author: "Tech Team",
  author_bio: "A team of experienced developers and tech writers.",
  image_url: null,
  read_time: "10 mins read",
  tags: ["Web Development", "Programming"],
};

// 3️⃣ Insert post into Supabase
async function insertPost() {
  const { data, error } = await supabase.from("posts").insert([post]);

  if (error) {
    console.error("Error inserting post:", error);
  } else {
    console.log("Post inserted successfully:", data);
  }
}

insertPost();
