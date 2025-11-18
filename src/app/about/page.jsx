import AboutContent from './AboutContent';
import Script from 'next/script';

// 1. FOUNDER DATA (Single Source of Truth)
// We define this here so we can use it for BOTH metadata and JSON-LD Schema
const founders = [
  {
    name: "Ayaz Hussain",
    role: "Founder & CEO",
    bio: "Visionary leader driving innovation and strategic growth for the company.",
    linkedin: "https://www.linkedin.com/in/ayaz-hussain-cs/",
    github: "https://github.com/ayaz7964",
    image: "/ayaz.png" // Matches your public folder
  },
  {
    name: "Muhammad Rizwan Rajput",
    role: "Co-Founder & CTO",
    bio: "Technology architect passionate about scalable systems and AI-driven products.",
    linkedin: "https://www.linkedin.com/in/rajput-rizwan/",
    github: "https://github.com/rajputrizwan",
    image: "/rizwan.png" // Matches your public folder
  },
  {
    name: "Muhammad Tayyab Bhutto",
    role: "Co-Founder & CPO",
    bio: "Creative mind shaping intuitive user experiences and visionary product design.",
    linkedin: "https://www.linkedin.com/in/muhammad-tayyab-bhutto/",
    github: "https://github.com/Muhammad-Tayyab-Bhutto",
    image: "/meer.png" // Note: Ensure this file matches Tayyab (Checked against your JSON)
  },
  {
    name: "Meer Khalil",
    role: "Co-Founder & Chief AI Officer",
    bio: "AI strategist leading intelligent automation and ethical model deployment.",
    linkedin: "https://www.linkedin.com/in/meer-khalil/",
    github: "https://github.com/meer-khalil",
    image: "/khalil.png" // Matches your public folder
  }
];

/** @type {import("next").Metadata} */
export const metadata = {
  title: 'About EscStack | Led by Ayaz Hussain, Rizwan Rajput & Senior Team',
  description: 'Meet the diverse talents behind EscStack. Founded by Ayaz Hussain and Rizwan Rajput, we are a SOC2-ready software house delivering 200+ projects in AI, Next.js, and Mobile.',
  
  // KEYWORDS: Heavy targeting on Founder Names for Personal Branding SEO
  keywords: [
    // Company Identity
    'About EscStack', 'Software House Mission', 'Senior Engineering Team',
    
    // Founder Names (Crucial for Ranking People)
    'Ayaz Hussain CEO', 'Muhammad Rizwan Rajput CTO', 'Muhammad Tayyab Bhutto CPO', 'Meer Khalil AI Officer',
    
    // Tech & Values
    'SOC2-ready', 'Outcome-Focused Development', 'Next.js Experts Pakistan', 'AI Strategists'
  ],

  // OPEN GRAPH: Uses the Team Image for social sharing
  openGraph: {
    title: 'We Create The Future | The EscStack Leadership',
    description: 'Visionary leaders driving innovation. Meet Ayaz, Rizwan, Tayyab, and Meer.',
    url: 'https://www.escstack.site/about',
    siteName: 'EscStack',
    images: [
      {
        url: '/ayaz.png', // Defaults to CEO image if no group shot exists, or use '/opengraph-image.png'
        width: 800,
        height: 800,
        alt: 'Ayaz Hussain - CEO of EscStack',
      },
    ],
    type: 'profile',
  },
};

export default function Page() {
  const baseUrl = 'https://www.escstack.site';

  // 2. CONSTRUCT JSON-LD SCHEMA (The SEO Secret Weapon)
  // This tells Google exactly who these people are and links them to the company.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EscStack",
    "url": baseUrl,
    "logo": `${baseUrl}/file.svg`, // Using your logo file
    "description": "A leading software house providing AI, Web, and Mobile App solutions.",
    "founder": founders.map((person) => ({
      "@type": "Person",
      "name": person.name,
      "jobTitle": person.role,
      "description": person.bio,
      "image": `${baseUrl}${person.image}`, // Absolute URL is required for Schema
      "sameAs": [
        person.linkedin,
        person.github
      ]
    })),
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 50,
      "maxValue": 100
    }
  };

  return (
    <>
      {/* Inject the Schema into the Head */}
      <Script
        id="about-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Render the Visual Content */}
      <AboutContent />
    </>
  );
}