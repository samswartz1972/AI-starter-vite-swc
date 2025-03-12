import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <BackButton to="/" label="Back to Home" />

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">
            Last Updated: June 1, 2023
          </p>

          <div className="prose prose-slate max-w-none">
            <p>
              At SocialCommerce, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our platform. Please read this privacy
              policy carefully. If you do not agree with the terms of this
              privacy policy, please do not access the platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-medium mt-6 mb-3">Personal Data</h3>
            <p>
              We may collect personally identifiable information, such as your:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Date of birth</li>
              <li>Postal address</li>
              <li>Payment information</li>
              <li>Other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">Usage Data</h3>
            <p>
              We may also collect information about how the platform is accessed
              and used. This usage data may include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Your computer's Internet Protocol address (e.g., IP address)
              </li>
              <li>Browser type and version</li>
              <li>Pages of our platform that you visit</li>
              <li>Time and date of your visit</li>
              <li>Time spent on those pages</li>
              <li>Device identifiers</li>
              <li>Other diagnostic data</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              AI-Generated Content Data
            </h3>
            <p>When you use our AI content generation tools, we collect:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Prompts and inputs you provide to the AI tools</li>
              <li>Generated outputs and results</li>
              <li>
                Your interactions with and modifications to AI-generated content
              </li>
              <li>Usage patterns of AI features</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p>
              We may use the information we collect for various purposes,
              including to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, operate, and maintain our platform</li>
              <li>Improve, personalize, and expand our platform</li>
              <li>Understand and analyze how you use our platform</li>
              <li>
                Develop new products, services, features, and functionality
              </li>
              <li>
                Communicate with you for customer service, updates, and
                marketing purposes
              </li>
              <li>Process transactions and send related information</li>
              <li>Find and prevent fraud</li>
              <li>Train and improve our AI models and algorithms</li>
              <li>For other purposes with your consent</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              3. Sharing Your Information
            </h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                provide services on our behalf, such as payment processing, data
                analysis, email delivery, hosting services, and customer
                service.
              </li>
              <li>
                <strong>Business Partners:</strong> Partners with whom we
                jointly offer products or services.
              </li>
              <li>
                <strong>Affiliates:</strong> Our parent company, subsidiaries,
                and affiliates.
              </li>
              <li>
                <strong>Legal Requirements:</strong> To comply with applicable
                law, regulation, legal process, or governmental request.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any
                merger, sale of company assets, financing, or acquisition of all
                or a portion of our business.
              </li>
              <li>
                <strong>With Your Consent:</strong> In other ways we may
                describe when you provide the information or with your consent.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              4. Data Security
            </h2>
            <p>
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, please also remember that we
              cannot guarantee that the internet itself is 100% secure. Although
              we will do our best to protect your personal information,
              transmission of personal information to and from our platform is
              at your own risk.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              5. Your Data Protection Rights
            </h2>
            <p>
              Depending on your location, you may have the following rights
              regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Right to Access:</strong> The right to request copies of
                your personal data.
              </li>
              <li>
                <strong>Right to Rectification:</strong> The right to request
                that we correct inaccurate information about you.
              </li>
              <li>
                <strong>Right to Erasure:</strong> The right to request that we
                delete your personal data in certain circumstances.
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> The right to
                request that we restrict the processing of your personal data in
                certain circumstances.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> The right to request
                that we transfer the data we have collected to another
                organization or directly to you.
              </li>
              <li>
                <strong>Right to Object:</strong> The right to object to our
                processing of your personal data in certain circumstances.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@socialcommerce.com"
                className="text-primary hover:underline"
              >
                privacy@socialcommerce.com
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              6. Children's Privacy
            </h2>
            <p>
              Our platform is not intended for children under the age of 13. We
              do not knowingly collect personally identifiable information from
              children under 13. If you are a parent or guardian and you are
              aware that your child has provided us with personal data, please
              contact us.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              7. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our platform and hold certain information. Cookies are files
              with a small amount of data which may include an anonymous unique
              identifier. You can instruct your browser to refuse all cookies or
              to indicate when a cookie is being sent. However, if you do not
              accept cookies, you may not be able to use some portions of our
              platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              8. Third-Party Links
            </h2>
            <p>
              Our platform may contain links to other websites that are not
              operated by us. If you click on a third-party link, you will be
              directed to that third party's site. We strongly advise you to
              review the Privacy Policy of every site you visit. We have no
              control over and assume no responsibility for the content, privacy
              policies, or practices of any third-party sites or services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date. You are advised to review
              this Privacy Policy periodically for any changes. Changes to this
              Privacy Policy are effective when they are posted on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:privacy@socialcommerce.com"
                className="text-primary hover:underline"
              >
                privacy@socialcommerce.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
