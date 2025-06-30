import React from "react";
import "./../css/terms.css"; // Link this file to apply styling

function TermsOfService() {
  return (
    <>
      <header className="terms-header">
        <h1>The Window Knight - Terms of Service</h1>
      </header>

      <div className="terms-container">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using The Window Knight’s services, you agree to be
          bound by these Terms of Service. If you do not agree, please do not
          use our website or services.
        </p>

        <h2>2. Services Provided</h2>
        <p>
          The Window Knight offers professional window cleaning and related
          services. The exact services and pricing may vary based on location
          and service package.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>
          Users agree to provide accurate contact and property information. You
          agree not to misuse our services or interfere with others’ use.
        </p>

        <h2>4. Payment and Cancellation</h2>
        <p>
          Payments are due upon completion unless otherwise agreed. Cancellations
          must be made at least 24 hours in advance. Late cancellations may incur
          a fee.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          While we take every precaution, The Window Knight is not liable for
          damages resulting from weather, structural weaknesses, or circumstances
          beyond our control.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content on our website, including branding and materials, belongs
          to The Window Knight and may not be copied or redistributed without
          permission.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Any changes will be posted
          on this page with an updated effective date.
        </p>

        <h2>8. Contact</h2>
        <p>
          For any questions about these Terms, please contact us at{" "}
          <strong>legal@thewindowknight.com</strong>.
        </p>
      </div>

      <footer className="terms-footer">
        &copy; 2025 The Window Knight. All rights reserved.
      </footer>
    </>
  );
}

export default TermsOfService;
