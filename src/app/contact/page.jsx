

import ContactPage from './ContactPage';

/** @type {import("next").Metadata} */
export const metadata = {
  title: 'Start Your Software Project: Book a Call with EscStack Architects',
  description: 'Ready to build? Contact EscStack for a free discovery call. Talk to an architect about your Next.js, Mobile, or AI product roadmap and receive a fast, precise quote from our senior team.',
  keywords: [
    'Contact Software House', 'Book Discovery Call', 'Get Quote for Software', 
    'Start Software Project', 'Hire Next.js Developers',
  ],
};

export default  function Page() {

  return (  
    <>
      <ContactPage />
    </>
  );
}