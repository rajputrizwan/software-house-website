import React from 'react';

export default function LegalPageWrapper({ title, date, children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      {/* Header Section */}
      <div className="w-full bg-slate-50 dark:bg-[#0f172a] py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">
            Last Updated: <span className="text-blue-600 dark:text-blue-400">{date}</span>
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 max-w-3xl py-16">
        <article className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900 dark:prose-strong:text-white
          prose-li:marker:text-blue-600 dark:prose-li:marker:text-blue-500">
          {children}
        </article>
      </div>
    </div>
  );
}