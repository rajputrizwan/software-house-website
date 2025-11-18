

import ModernServicesPage from "./ModernServicesPage";

/** @type {import("next").Metadata} */
export const metadata = {
  // TITLE: One word focus "Investment" + SEO Keyword expansion
  title: 'Investment | Transparent Software Plans & Pricing Packages',
  
  // DESCRIPTION: Includes specific price points ($99), stats (1,200+ clients), and scope.
  // This proves to users you are affordable AND established before they even click.
  description: 'Transparent pricing for every stage: Starter plans from $99/mo to Custom Enterprise Solutions. Join 1,200+ clients building scalable Web, Mobile, and AI products with EscStack.',
  
  // KEYWORDS: Targets cost-related searches and specific service tiers
  keywords: [
    // Cost & Pricing Intent
    'Software Development Pricing', 
    'Mobile App Development Cost', 
    'Website Maintenance Packages', 
    'Enterprise Software Quote',
    
    // Specific Plans (Matches your content)
    'Startup Software Plans',
    'API Integration Costs',
    'Dedicated Account Manager',
    '24/7 Technical Support',
    
    // Commercial Intent
    'Hire Developers Cost',
    'EscStack Pricing',
    'Affordable Software House'
  ],

  // OPEN GRAPH: Visual proof of your value proposition
  openGraph: {
    title: 'Digital Innovation Made Simple | Plans from $99/mo',
    description: 'We transform ideas into solutions. Choose from Starter, Professional, or Enterprise plans. 350+ Projects Delivered.',
    url: 'https://www.escstack.site/services',
    siteName: 'EscStack',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'EscStack Pricing and Plans',
      },
    ],
  },
};
export default  function Page() {

  return (
    <>
      <ModernServicesPage />
    </>
  );
}