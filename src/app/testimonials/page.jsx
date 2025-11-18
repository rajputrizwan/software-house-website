TestimonialsPage



import TestimonialsPage from './TestimonialsPage';

/** @type {import("next").Metadata} */
export const metadata = {
  // TITLE: Strong, Authoritative, and uses your tagline "Create The Future"
  title: 'About EscStack | Visionary Software House & Leadership Team',
  
  // DESCRIPTION: Highlights your stats (200+ projects), leadership, and mission.
  // This is the "Snippet" users will see in Google.
  description: 'Meet the team behind EscStack. Led by Ayaz Hussain (CEO) and Rizwan Rajput (CTO), we are a mission-driven software house with 200+ projects delivered. dedicated to innovation, integrity, and engineering excellence.',
  
  // KEYWORDS: Targets your Company Name, specific Founder Names (Crucial for Trust), and Values.
  keywords: [
    // Core Identity
    'About EscStack', 
    'EscStack Story', 
    'Software House Mission', 
    'Tech Innovation Company',
    
    // The Leadership Team (High SEO Value for Personal Branding)
    'Ayaz Hussain CEO', 
    'Muhammad Rizwan Rajput CTO', 
    'Muhammad Tayyab Bhutto CPO', 
    'Meer Khalil Chief AI Officer',
    
    // Stats & Values
    'Global Software Delivery', 
    '98% Client Satisfaction', 
    'Software Engineering Excellence', 
    'Sustainable Tech Solutions'
  ],

  // OPEN GRAPH: Makes the link look amazing on LinkedIn/Facebook
  openGraph: {
    title: 'We Create The Future | The EscStack Story',
    description: 'From a vision in 2015 to 200+ projects worldwide. Meet the diverse talents and visionary leaders driving innovation at EscStack.',
    url: 'https://www.escstack.site/about',
    siteName: 'EscStack',
    images: [
      {
        url: '/opengraph-image.png', // Uses your dynamic image
        width: 1200,
        height: 630,
        alt: 'EscStack Team and Mission',
      },
    ],
    type: 'profile', // Tells Google this page is about a company profile
  },
};
export default  function Page() {

  return (
    <>
      <TestimonialsPage />
    </>
  );
}