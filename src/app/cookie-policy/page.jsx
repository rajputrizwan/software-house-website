import LegalPageWrapper from '@/components/LegalPageWrapper';

export const metadata = {
  title: 'Cookie Policy',
  description: 'Information about how EscStack uses cookies.',
};

export default function CookiePolicy() {
  return (
    <LegalPageWrapper title="Cookie Policy" date="November 18, 2025">
      <p>
        This Cookie Policy explains what cookies are, how EscStack uses them, and your choices regarding their use.
      </p>

      <h3>1. What Are Cookies?</h3>
      <p>
        Cookies are small text files stored on your device (computer or mobile) when you visit certain websites. They help the website recognize your device and remember your preferences.
      </p>

      <h3>2. How We Use Cookies</h3>
      <p>We use cookies for the following purposes:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> These are necessary for the website to function (e.g., secure log-ins, session management).</li>
        <li><strong>Analytics Cookies:</strong> We use tools like Google Analytics to understand how visitors interact with our site (e.g., pages visited, time spent). This data is anonymized.</li>
        <li><strong>Performance Cookies:</strong> These help us load pages faster by caching certain assets on your browser.</li>
      </ul>

      <h3>3. Managing Cookies</h3>
      <p>
        Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you.
      </p>

      <h3>4. Third-Party Cookies</h3>
      <p>
        Some cookies are placed by third-party services that appear on our pages (e.g., YouTube video embeds, social media sharing buttons). We do not control these cookies.
      </p>

      <h3>5. Updates to This Policy</h3>
      <p>
        We may update this Cookie Policy from time to time. We encourage you to review this page periodically for any changes.
      </p>
    </LegalPageWrapper>
  );
}