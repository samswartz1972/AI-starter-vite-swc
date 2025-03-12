import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <BackButton to="/" label="Back to Home" />

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-6">
            Last Updated: June 1, 2023
          </p>

          <div className="prose prose-slate max-w-none">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service")
              carefully before using the SocialCommerce platform (the "Service")
              operated by SocialCommerce, Inc. ("us", "we", or "our").
            </p>

            <p>
              Your access to and use of the Service is conditioned on your
              acceptance of and compliance with these Terms. These Terms apply
              to all visitors, users, and others who access or use the Service.
            </p>

            <p>
              By accessing or using the Service, you agree to be bound by these
              Terms. If you disagree with any part of the terms, then you may
              not access the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Accounts</h2>
            <p>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our Service.
            </p>

            <p>
              You are responsible for safeguarding the password that you use to
              access the Service and for any activities or actions under your
              password, whether your password is with our Service or a
              third-party service.
            </p>

            <p>
              You agree not to disclose your password to any third party. You
              must notify us immediately upon becoming aware of any breach of
              security or unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, videos, or
              other material ("Content"). You are responsible for the Content
              that you post on or through the Service, including its legality,
              reliability, and appropriateness.
            </p>

            <p>
              By posting Content on or through the Service, you represent and
              warrant that: (i) the Content is yours (you own it) or you have
              the right to use it and grant us the rights and license as
              provided in these Terms, and (ii) the posting of your Content on
              or through the Service does not violate the privacy rights,
              publicity rights, copyrights, contract rights or any other rights
              of any person.
            </p>

            <p>
              We reserve the right to terminate the account of any user found to
              be infringing on a copyright.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              3. AI-Generated Content
            </h2>
            <p>
              Our Service provides tools for generating content using artificial
              intelligence ("AI-Generated Content"). You retain ownership of any
              AI-Generated Content you create using our Service, subject to our
              underlying intellectual property rights in the AI technology.
            </p>

            <p>
              You are responsible for how you use AI-Generated Content. We do
              not guarantee that AI-Generated Content will be accurate,
              complete, or suitable for any particular purpose. You should
              review and edit AI-Generated Content before using it.
            </p>

            <p>
              You agree not to use our AI tools to generate content that is
              illegal, harmful, misleading, discriminatory, or otherwise
              violates these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. E-Commerce</h2>
            <p>
              If you wish to purchase any product or service made available
              through the Service ("Purchase"), you may be asked to supply
              certain information relevant to your Purchase including your
              credit card number, the expiration date of your credit card, your
              billing address, and your shipping information.
            </p>

            <p>
              You represent and warrant that: (i) you have the legal right to
              use any credit card(s) or other payment method(s) in connection
              with any Purchase; and that (ii) the information you supply to us
              is true, correct, and complete.
            </p>

            <p>
              The Service may employ the use of third-party services for the
              purpose of facilitating payment and the completion of Purchases.
              By submitting your information, you grant us the right to provide
              the information to these third parties subject to our Privacy
              Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              5. Prohibited Uses
            </h2>
            <p>
              You may use the Service only for lawful purposes and in accordance
              with these Terms. You agree not to use the Service:
            </p>

            <ul className="list-disc pl-6 mb-4">
              <li>
                In any way that violates any applicable national or
                international law or regulation.
              </li>
              <li>
                For the purpose of exploiting, harming, or attempting to exploit
                or harm minors in any way.
              </li>
              <li>
                To transmit, or procure the sending of, any advertising or
                promotional material, including any "junk mail", "chain letter",
                "spam", or any other similar solicitation.
              </li>
              <li>
                To impersonate or attempt to impersonate the Company, a Company
                employee, another user, or any other person or entity.
              </li>
              <li>
                In any way that infringes upon the rights of others, or in any
                way is illegal, threatening, fraudulent, or harmful.
              </li>
              <li>
                To engage in any other conduct that restricts or inhibits
                anyone's use or enjoyment of the Service, or which, as
                determined by us, may harm the Company or users of the Service
                or expose them to liability.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms.
            </p>

            <p>
              Upon termination, your right to use the Service will immediately
              cease. If you wish to terminate your account, you may simply
              discontinue using the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              In no event shall the Company, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from (i) your
              access to or use of or inability to access or use the Service;
              (ii) any conduct or content of any third party on the Service;
              (iii) any content obtained from the Service; and (iv) unauthorized
              access, use or alteration of your transmissions or content,
              whether based on warranty, contract, tort (including negligence)
              or any other legal theory, whether or not we have been informed of
              the possibility of such damage.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will try to
              provide at least 30 days' notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>

            <p>
              By continuing to access or use our Service after those revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, please stop using the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:legal@socialcommerce.com"
                className="text-primary hover:underline"
              >
                legal@socialcommerce.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
