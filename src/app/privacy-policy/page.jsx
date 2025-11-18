import LegalPageWrapper from '@/components/LegalPageWrapper';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How EscStack collects, uses, and protects your data.',
};

export default function PrivacyPolicy() {
  return (
    <LegalPageWrapper title="Privacy Policy" date="November 18, 2025">
      <p>
        At <strong>EscStack</strong> ("we," "our," or "us"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or engage our software development services.
      </p>

      <h3>1. Information We Collect</h3>
      <p>We collect information to provide better services to our clients. This includes:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, and company details provided when you fill out forms or contact us.</li>
        <li><strong>Project Data:</strong> Information related to your software requirements, specifications, and business logic necessary for project delivery.</li>
        <li><strong>Technical Data:</strong> IP address, browser type, and usage data collected automatically via cookies to improve website performance.</li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <p>Your data is used strictly for professional purposes:</p>
      <ul>
        <li>To design, build, and deploy software solutions (Web, Mobile, AI) for you.</li>
        <li>To communicate project updates, milestones, and technical support.</li>
        <li>To send invoices, contracts, and legal documentation.</li>
        <li>To improve our website security and user experience.</li>
      </ul>

      <h3>3. AI & Data Processing</h3>
      <p>
        As an AI-focused software house, we may process data to train or fine-tune machine learning models <strong>only if explicitly agreed upon</strong> in a separate Non-Disclosure Agreement (NDA). We do not use client proprietary data to train public models without consent.
      </p>

      <h3>4. Data Sharing & Security</h3>
      <p>
        We do not sell your personal data. We may share data with trusted third-party vendors (e.g., AWS, Vercel, Google Cloud) strictly for hosting and infrastructure purposes. We implement industry-standard security measures, including SSL encryption and strict access controls, to protect your information.
      </p>

      <h3>5. Contact Us</h3>
      <p>If you have questions about this policy, please contact us at:</p>
      <ul>
        <li><strong>Email:</strong> contact@escstack.site</li>
        <li><strong>Address:</strong> House No 65 Gulshan e Rehmat, Sukkur 65200, Pakistan</li>
      </ul>
    </LegalPageWrapper>
  );
}