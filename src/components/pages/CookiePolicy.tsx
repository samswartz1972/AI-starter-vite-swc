import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <BackButton to="/" label="Back to Home" />

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          <p className="text-muted-foreground mb-6">
            Last Updated: June 1, 2023
          </p>

          <div className="prose prose-slate max-w-none">
            <p>
              This Cookie Policy explains how SocialCommerce ("we", "us", or
              "our") uses cookies and similar technologies on our platform. This
              policy is part of our Privacy Policy. By using our platform, you
              consent to our use of cookies in accordance with this Cookie
              Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are stored on your device
              (computer, tablet, or mobile) when you visit a website. They are
              widely used to make websites work more efficiently, provide a
              better user experience, and give information to the website
              owners.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              2. Types of Cookies We Use
            </h2>
            <p>We use the following types of cookies on our platform:</p>

            <h3 className="text-xl font-medium mt-6 mb-3">Essential Cookies</h3>
            <p>
              These cookies are necessary for the platform to function properly.
              They enable core functionality such as security, network
              management, and account access. You may disable these by changing
              your browser settings, but this may affect how the platform
              functions.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Performance and Analytics Cookies
            </h3>
            <p>
              These cookies help us understand how visitors interact with our
              platform by collecting and reporting information anonymously. They
              help us improve our platform by collecting information on how it
              is used.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Functionality Cookies
            </h3>
            <p>
              These cookies enable the platform to provide enhanced
              functionality and personalization. They may be set by us or by
              third-party providers whose services we have added to our pages.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Targeting and Advertising Cookies
            </h3>
            <p>
              These cookies are used to deliver advertisements more relevant to
              you and your interests. They are also used to limit the number of
              times you see an advertisement as well as help measure the
              effectiveness of advertising campaigns.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Social Media Cookies
            </h3>
            <p>
              These cookies are set by social media services that we have added
              to the platform to enable you to share our content with your
              friends and networks. They can track your browser across other
              sites and build a profile of your interests, which may impact the
              content and messages you see on other websites you visit.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              3. Specific Cookies We Use
            </h2>
            <p>
              Here is a list of the main cookies we use and what we use them
              for:
            </p>

            <table className="w-full border-collapse border border-gray-300 my-4">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-gray-300 p-2 text-left">
                    Cookie Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Purpose
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">session_id</td>
                  <td className="border border-gray-300 p-2">
                    Maintains your session state
                  </td>
                  <td className="border border-gray-300 p-2">Session</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">auth_token</td>
                  <td className="border border-gray-300 p-2">
                    Authenticates your account
                  </td>
                  <td className="border border-gray-300 p-2">30 days</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">_ga</td>
                  <td className="border border-gray-300 p-2">
                    Google Analytics - Used to distinguish users
                  </td>
                  <td className="border border-gray-300 p-2">2 years</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">_gid</td>
                  <td className="border border-gray-300 p-2">
                    Google Analytics - Used to distinguish users
                  </td>
                  <td className="border border-gray-300 p-2">24 hours</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">_fbp</td>
                  <td className="border border-gray-300 p-2">
                    Facebook - Used to deliver advertisements
                  </td>
                  <td className="border border-gray-300 p-2">3 months</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">preferences</td>
                  <td className="border border-gray-300 p-2">
                    Stores your platform preferences
                  </td>
                  <td className="border border-gray-300 p-2">1 year</td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              4. Third-Party Cookies
            </h2>
            <p>
              Some cookies are placed by third parties on our platform. These
              third parties include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Google Analytics (for analytics)</li>
              <li>Facebook (for social sharing and advertising)</li>
              <li>Twitter (for social sharing)</li>
              <li>Stripe (for payment processing)</li>
              <li>Other advertising and analytics providers</li>
            </ul>
            <p>
              These third parties may use cookies, pixel tags, and other storage
              technologies to collect or receive information from our platform
              and elsewhere on the internet and use that information to provide
              measurement services and target ads.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              5. Managing Cookies
            </h2>
            <p>
              Most web browsers allow you to manage your cookie preferences. You
              can set your browser to refuse cookies, or to alert you when
              cookies are being sent. The methods for doing so vary from browser
              to browser, and from version to version. You can however obtain
              up-to-date information about blocking and deleting cookies via
              these links:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p>
              Please note that blocking all cookies will have a negative impact
              upon the usability of many websites. If you block cookies, you may
              not be able to use all the features on our platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              6. Cookie Consent
            </h2>
            <p>
              When you first visit our platform, we will ask for your consent to
              use cookies. You can choose to accept all cookies, only essential
              cookies, or customize your preferences. You can change your cookie
              preferences at any time by clicking on the "Cookie Settings" link
              in the footer of our platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              7. Changes to This Cookie Policy
            </h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify
              you of any changes by posting the new Cookie Policy on this page
              and updating the "Last Updated" date. You are advised to review
              this Cookie Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact
              us at{" "}
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

export default CookiePolicy;
