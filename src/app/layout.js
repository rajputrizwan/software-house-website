// app/layout.js
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeBodyWrapper from "../components/ThemeBodyWrapper";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
// import { ToastProvider } from "@/components//ToastProvider";

const inter = Inter({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: 'swap',
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading-stack",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: 'swap',
});

export const metadata = {
  title: "EscTech",
  description: "Modern tech solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" 
    // className="scroll-smooth"

    >
      <head />
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
