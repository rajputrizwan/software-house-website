"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

/**
 * MarkdownRenderer
 *
 * Renders Markdown content with:
 * - GitHub Flavored Markdown (tables, task lists, strikethrough)
 * - Raw HTML
 * - Syntax highlighting for code blocks
 *
 * @param {Object} props
 * @param {string} props.content - Markdown content
 */
export default function MarkdownRenderer({ content = "" }) {
  return (
    <div
      className="prose prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:p-4 prose-pre:rounded-xl
                 prose-img:rounded-lg prose-a:text-blue-400 hover:prose-a:text-blue-300"
      aria-label="Markdown Content"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
