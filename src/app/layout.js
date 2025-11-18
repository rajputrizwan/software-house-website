// // app/layout.js
// import { Inter, Space_Grotesk } from "next/font/google";
// import "./globals.css";
// import Script from "next/script";
// import Providers from "./providers";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ThemeBodyWrapper from "../components/ThemeBodyWrapper";
// import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
// import { ThemeProvider } from "next-themes";

// const inter = Inter({
//   variable: "--font-sans-stack",
//   subsets: ["latin"],
//   weight: ["300", "400", "600", "700", "800"],
//   display: "swap",
// });
// const spaceGrotesk = Space_Grotesk({
//   variable: "--font-heading-stack",
//   subsets: ["latin"],
//   weight: ["400", "600", "700"],
//   display: "swap",
// });

// export const metadata = {
//   title: {
//     default: 'EscStack | Enterprise Software Development & AI Solutions',
//     template: '%s | escStack Software House',
//   },
//   description: 'Build intelligent, scalable software with senior-only teams. Specialized in Next.js, AI/LLM integration, and SOC2-ready cloud infrastructure.',
//   keywords: ['Software House', 'Next.js Developers', 'AI Engineering', 'SOC2 Software', 'escStack'],
//   alternates: {
//     canonical: 'https://www.escstack.site',
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en"
//       suppressHydrationWarning
//       // className="scroll-smooth"
//     >
//       <head>
//         <meta name="google-site-verification" content="jnByv2oanpnLvcEMWBV4H0eoPG19XmodKZipRmVK0Nc" />
//       </head>
//       <body
//         className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
//       >
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//           <Providers>
//             <Script
//               type="module"
//               src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
//               strategy="beforeInteractive"
//             />
//             <ClientLayoutWrapper>
//               <ThemeBodyWrapper>
//                 <Navbar />
//                 {/* <ToastProvider> */}
//                 <main className="flex-grow pt-16">{children}</main>
//                 {/* </ToastProvider> */}
//                 <Footer />
//               </ThemeBodyWrapper>
//             </ClientLayoutWrapper>
//           </Providers>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }



// app/layout.js
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeBodyWrapper from "../components/ThemeBodyWrapper";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Added 500 for better typography
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading-stack",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Added 500
  display: "swap",
});

// --- 1. THE MASTER SEO CONFIGURATION ---
export const metadata = {
  metadataBase: new URL('https://www.escstack.site'), // Fixes social sharing image issues
  
  // Dynamic Title Strategy: "Brand | Keywords"
  title: {
    default: 'EscStack | Enterprise Software Development & AI Solutions',
    template: '%s ',  //| EscStack Software House
  },
  
  // The "Click-Magnet" Description
  description: 'EscStack is a global software house delivering SOC2-ready web, mobile, and AI solutions. We partner with startups and enterprises to build scalable Next.js apps, cross-platform mobile solutions, and Deep Learning models.',

  // KEYWORD CLUSTERING (Targeting All Services)
  keywords: [
    // Core Identity
    'Software House', 'Custom Software Development', 'IT Solutions Provider', 'EscStack',
    
    // Web Development (Next.js Focus)
    'Next.js Developers', 'React.js Agency', 'Enterprise Web Applications', 'SaaS Development', 'Full Stack Development',
    
    // Mobile App Development
    'Mobile App Development', 'Flutter Developers', 'React Native Experts', 'Cross-Platform Apps', 'iOS and Android App Development',
    
    // AI & Deep Learning (High Value)
    'AI Solutions Company', 'Deep Learning Engineers', 'Machine Learning Services', 'LLM Integration', 'Generative AI Development', 'Python AI Developers',
    
    // Location & Scope
    'Software House in Pakistan', 'Global Software Agency', 'Offshore Software Development', 'Remote Engineering Teams'
  ],

  // Social Media "Card" Settings (Open Graph)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.escstack.site',
    siteName: 'EscStack - Intelligent Software',
    title: 'Build Intelligent, Scalable Software with EscStack',
    description: 'From MVP to IPO. We build world-class web & mobile apps with senior-only engineering teams. AI-powered and SOC2-ready.',
    images: [
      {
        url: '/opengraph-image.png', // We will generate this next
        width: 1200,
        height: 630,
        alt: 'EscStack Software House - Engineering the Future',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'EscStack | Enterprise Software & AI',
    description: 'Expert Next.js, Mobile, and AI engineering teams ready to scale your product.',
    images: ['/opengraph-image.png'], 
    creator: '@escstack',
  },

  // Robot Crawling (Max Visibility)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification for Search Console
  verification: {
    google: 'jnByv2oanpnLvcEMWBV4H0eoPG19XmodKZipRmVK0Nc',
  },
  
  // Canonical URL (Prevents duplicate content issues)
  alternates: {
    canonical: 'https://www.escstack.site',
  },
};

// --- 2. THE JSON-LD SCHEMA (The "Secret Weapon") ---
// This explicitly tells Google you are a Software Business, distinguishing you from drone hardware.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService", // Most accurate for Software House
  "name": "EscStack",
  "image": "https://www.escstack.site/opengraph-image.png",
  "description": "EscStack is a premier software house specializing in Next.js web development, mobile apps, and Artificial Intelligence solutions.",
  "url": "https://www.escstack.site",
  "telephone": "+923163797857",
  "email": "info.escstack@gmail.com", 
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "House No A 58, Ali Town Lahore ",
    "addressLocality": "Lahore",
    "postalCode": "60001",
    "addressCountry": "PK"
  },
  "areaServed": "World", // CRITICAL: Tells Google you serve clients globally
  "knowsAbout": [
    "Software Development",
    "Next.js",
    "Artificial Intelligence",
    "Deep Learning",
    "Mobile Applications",
    "Cloud Computing"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/escstack",
    "https://github.com/escstack",
    "https://x.com/EscStack",
    "https://www.behance.net/escstack",

    // Add Facebook/Twitter if you have them
  ]
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth" // Recommended for better UX
    >
      <head>
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
          <meta name="google-site-verification" content="jnByv2oanpnLvcEMWBV4H0eoPG19XmodKZipRmVK0Nc" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers>
            <Script
              type="module"
              src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
              strategy="beforeInteractive"
            />
            <ClientLayoutWrapper>
              <ThemeBodyWrapper>
                <Navbar />
                <main className="flex-grow pt-16">{children}</main>
                <Footer />
              </ThemeBodyWrapper>
            </ClientLayoutWrapper>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}