// src/app/sitemap.js

export default async function sitemap() {
  const baseUrl = 'https://www.escstack.site';
  
  // ADD THE THREE NEW ROUTES HERE
  const routes = [
    '',
    '/about',
    '/services',
    '/work',
    '/contact',
    '/pricing',
    '/blog',
    '/careers',
    '/faq',
    '/stories',
    '/testimonials',
    '/privacy-policy',      // <--- NEW: Legal trust document
    '/terms-of-service',    // <--- NEW: Legal trust document
    '/cookie-policy',       // <--- NEW: Legal trust document
  ];

  const staticPages = routes.map((route) => {
    // Define priorities based on type
    const isHighPriority = route === '' || route === '/services' || route === '/contact' || route === '/work';
    const isLegalPage = route.includes('-policy') || route.includes('-service'); // New check for legal pages
    
    let priority = 0.7; // Default for informational/legal pages
    let changeFrequency = 'monthly';

    if (route === '') {
        priority = 1.0;
        changeFrequency = 'weekly';
    } else if (isHighPriority) {
        priority = 0.9;
        changeFrequency = 'weekly';
    } else if (isLegalPage) {
        // Legal pages should have lowest change frequency
        priority = 0.7;
        changeFrequency = 'yearly'; 
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: changeFrequency,
      priority: priority,
    };
  });

  return [
    ...staticPages,
    // ...dynamicBlogPosts,
  ];
}