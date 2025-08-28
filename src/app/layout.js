import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeBodyWrapper from "../components/ThemeBodyWrapper";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper"; // ✅ new wrapper

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EscTech",
  description: "Modern tech solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Script
            type="module"
            src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
            strategy="beforeInteractive"
          />
          {/* 🔹 Client wrapper handles loader */}
          <ClientLayoutWrapper>
            <ThemeBodyWrapper>
              <Navbar />
              <main className="flex-grow pt-20 pb-24">{children}</main>
              <Footer />
            </ThemeBodyWrapper>
          </ClientLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
