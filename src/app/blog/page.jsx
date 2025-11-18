// src/app/about/page.jsx

import BlogPage from './BlogPage';

/** @type {import("next").Metadata} */
export const metadata = {
  title: 'Technical Blog: Next.js, AI & Cloud Engineering Insights',
  description: 'Deep dives on MLOps, Next.js architecture, and SOC2 DevOps practices. Expert technical articles and engineering insights from our senior development teams.',
  keywords: [
    'Engineering Blog', 'Next.js Technical Articles', 'DevOps Guides', 
    'MLOps Best Practices', 'Software Architecture Insights', 'TypeScript',
  ],
};
export default  function Page() {

  return (
    <>
      <BlogPage />
    </>
  );
}