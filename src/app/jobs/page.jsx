

// src/app/about/page.jsx

import JobsPage from './JobsPage';

/** @type {import("next").Metadata} */
export const metadata = {
  title: 'Openings | EscStack Senior Career Opportunities',
  description: 'Explore career opportunities to join our senior-only engineering pods. High-impact roles in Next.js, AI/ML, and Cloud DevOps. Apply today.',
  keywords: [
    'Jobs', 'Vacancies', 'Next.js Careers', 'Senior Roles', 'Remote Software Jobs', 
    'Hiring Engineers', 'Tech Jobs',
  ],
};

export default  function Page() {

  return (
    <>
      <JobsPage />
    </>
  );
}