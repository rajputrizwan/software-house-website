import LegalPageWrapper from '@/components/LegalPageWrapper';

export const metadata = {
  title: 'Terms of Service',
  description: 'The rules and agreements for using EscStack services.',
};

export default function TermsOfService() {
  return (
    <LegalPageWrapper title="Terms of Service" date="November 18, 2025">
      <p>
        Welcome to EscStack. By accessing our website or hiring our services, you agree to comply with the following terms and conditions.
      </p>

      <h3>1. Services</h3>
      <p>
        EscStack provides custom software development services, including but not limited to Web Development (Next.js), Mobile App Development (Flutter/React Native), and AI Solutions. All services are subject to a separate Master Services Agreement (MSA) or Statement of Work (SOW) signed by both parties.
      </p>

      <h3>2. Intellectual Property (IP)</h3>
      <ul>
        <li><strong>Client Ownership:</strong> Upon full payment, the client owns the source code and intellectual property of the custom software developed specifically for them.</li>
        <li><strong>EscStack Rights:</strong> We retain the right to reuse generic code libraries, design patterns, and developer tools that are not specific to the client's business logic.</li>
      </ul>

      <h3>3. Payments & Refunds</h3>
      <p>
        Payments are structured based on project milestones (e.g., 30% upfront, 40% beta, 30% final). Refunds are only issued if EscStack fails to deliver the agreed-upon scope of work as defined in the contract.
      </p>

      <h3>4. Limitation of Liability</h3>
      <p>
        While we strive for code excellence, EscStack is not liable for any indirect, incidental, or consequential damages arising from the use of our software, including data loss or business interruption. Clients are responsible for maintaining their own data backups.
      </p>

      <h3>5. Governing Law</h3>
      <p>
        These terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes shall be resolved in the courts of Sukkur, Sindh.
      </p>
      
      <h3>6. Contact</h3>
      <p>
        For legal inquiries, please contact: <a href="mailto:contact@escstack.site">contact@escstack.site</a>
      </p>
    </LegalPageWrapper>
  );
}