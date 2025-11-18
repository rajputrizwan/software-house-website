// src/app/about/page.jsx

import PortfolioSection from "./PortfolioSection";

/** @type {import("next").Metadata} */
export const metadata = {
  title: 'Software Development Portfolio | Measurable Outcomes & Case Studies',
  description: 
    'View EscStack’s portfolio of high-impact software solutions. See how our senior-only teams delivered scalable Next.js and AI products with measurable business outcomes for our clients.',
  keywords: [
    'Software Portfolio', 'Technical Case Studies', 'Client Outcomes', 
    'Next.js Projects', 'Enterprise Portfolio', 'MVP Success Stories',
  ],
};

export default  function Page() {

  return (
    <>
      <PortfolioSection />
    </>
  );
}