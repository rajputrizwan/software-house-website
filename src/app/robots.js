// src/app/robots.js

export default function robots() {
  const baseUrl = 'https://www.escstack.site';

  return {
    rules: {
      userAgent: '*', // Applies to all bots (Google, Bing, Yahoo, etc.)
      allow: '/',
      disallow: [
        '/api/',     // Block API routes to save "Crawl Budget"
        '/admin/',   // Block admin dashboards (if you have any)
        '/private/', // Block private folders
        '/test/',    // Block your test folder visible in your screenshot
      ],
    },
    // This links your robots file directly to your sitemap
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}