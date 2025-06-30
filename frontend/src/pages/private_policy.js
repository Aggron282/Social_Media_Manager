import React from "react";
import "./../css/policy.css"; // Link this file to apply styling

function PrivatePolicy() {
  return (
    <>
      <header className="policy-header">
        <h1>The Window Knight - Privacy Policy</h1>
      </header>

      <div className="policy-container">
        <h2>1. Introduction</h2>
        <p>
          At The Window Knight, your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your information when
          you use our website and services.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address,
          phone number, and location when you submit forms or contact us.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use your information to provide services, respond to inquiries,
          improve our website, and send updates or promotional content (only
          with your consent).
        </p>

        <h2>4. Sharing Information</h2>
        <p>
          We do not sell or rent your personal data. Information may be shared
          with third-party services strictly for providing our services (e.g.,
          scheduling, payments).
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You can request access, updates, or deletion of your personal data at
          any time by contacting us at privacy@thewindowknight.com.
        </p>

        <h2>6. Cookies</h2>
        <p>
          We use cookies for analytics and performance. You can control or
          disable cookies in your browser settings.
        </p>

        <h2>7. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your data.
          However, no system is 100% secure, so please use caution when sharing
          sensitive information.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy occasionally. Updates will be
          posted here with the date of change.
        </p>

        <h2>9. Contact</h2>
        <p>
          For any questions or concerns about your data or this policy, contact
          us at <strong>privacy@thewindowknight.com</strong>.
        </p>
      </div>

      <footer className="policy-footer">
        &copy; 2025 The Window Knight. All rights reserved.
      </footer>
    </>
  );
}

export default PrivatePolicy;
