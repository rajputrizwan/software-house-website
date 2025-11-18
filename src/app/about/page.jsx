// src/app/about/page.jsx
import AboutContent from './AboutContent';

/** @type {import("next").Metadata} */
export const metadata = {
  title: 'About Us',
  description: 'Learn about EscStack, a leading software house providing AI, Web, and Mobile App solutions.',
  // You can add openGraph images here too!
};

export default function Page() {
  return (
    <>
      <AboutContent />
    </>
  );
}