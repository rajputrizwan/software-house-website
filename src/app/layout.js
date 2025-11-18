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

const inter = Inter({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading-stack",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: 'EscStack | Enterprise Software Development & AI Solutions',
    template: '%s | escStack Software House',
  },
  description: 'Build intelligent, scalable software with senior-only teams. Specialized in Next.js, AI/LLM integration, and SOC2-ready cloud infrastructure.',
  keywords: ['Software House', 'Next.js Developers', 'AI Engineering', 'SOC2 Software', 'escStack'],
  alternates: {
    canonical: 'https://www.escstack.site',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // className="scroll-smooth"
    >
      <head>
        <meta name="google-site-verification" content="jnByv2oanpnLvcEMWBV4H0eoPG19XmodKZipRmVK0Nc" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Script
              type="module"
              src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
              strategy="beforeInteractive"
            />
            <ClientLayoutWrapper>
              <ThemeBodyWrapper>
                <Navbar />
                {/* <ToastProvider> */}
                <main className="flex-grow pt-16">{children}</main>
                {/* </ToastProvider> */}
                <Footer />
              </ThemeBodyWrapper>
            </ClientLayoutWrapper>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
