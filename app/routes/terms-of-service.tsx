import { Page, BlockStack, Text, List, Divider } from '@shopify/polaris';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { Link } from '@remix-run/react';

export default function TermsConditions() {
  return (
    <Page>
      <Link to={'https://shipguard.app/'}>
        <img
          src="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Shipguard-shipping-protection.png?v=1731747621"
          className="w-[220px] mx-auto h-auto my-4"
          alt="ShipGuard: Shipping Protection"
        />
      </Link>

      <ShadowBevelBox divider={false}>
        <BlockStack gap="400">
          <Text as="h1" variant="headingLg">
            ShipGuard: Shipping Protection - Terms & Conditions
          </Text>

          <Text variant="bodyMd" as="p">
            <strong>Effective Date:</strong> 26 September 2024
          </Text>

          <Divider />

          <Text variant="headingMd" as="h2">
            1. Agreement to Terms
          </Text>
          <Text variant="bodyMd" as="p">
            By installing and using the "ShipGuard: Shipping Protection" Shopify
            app you ("Merchant" or "User") agree to comply with these Terms &
            Conditions. If you do not agree, you must uninstall the app and
            discontinue using our services.
          </Text>

          <Text variant="headingMd" as="h2">
            2. Services Provided
          </Text>
          <Text variant="bodyMd" as="p">
            The "ShipGuard: Shipping Protection" app offers the following
            services:
          </Text>
          <List type="bullet" gap="loose">
            <List.Item>
              Shipping Protection: Allows merchants to offer fixed-price and
              percentage-based shipping protection options to their customers.
            </List.Item>
            <List.Item>
              Claim Management: Provides a claim request form and processing
              system for shipping-related claims, including refunds,
              reshipments, or cancellations.
            </List.Item>
            <List.Item>
              Email Services: The app can send email notifications related to
              claims and shipping protection via the merchant’s custom SMTP
              provider or Google OAuth 2.0 integration with Gmail.
            </List.Item>
          </List>

          <Text variant="headingMd" as="h2">
            3. Free Early Access
          </Text>

          <List type="bullet" gap="loose">
            <List.Item>
              <b>Limited-Time Offer</b>: We offer free early access to the app
              for a limited time to users who install during the promotional
              period
            </List.Item>
            <List.Item>
              <b>Changes to Pricing</b>: We reserve the right to introduce new
              pricing plans or subscription tiers for all users, including those
              who initially obtained free access. Continued use of the app after
              the introduction of a paid plan implies acceptance of the new
              pricing terms.
            </List.Item>
            <List.Item>
              <b>Notifications</b>: Users will be notified in advance of any
              pricing changes to allow for decisions regarding continued app
              usage.
            </List.Item>
          </List>

          <Text variant="headingMd" as="h2">
            4. Merchant Responsibilities
          </Text>
          <Text variant="bodyMd" as="p">
            <strong>Data Accuracy:</strong> You are responsible for ensuring the
            accuracy of customer information (e.g., name, email, shipping
            details) when using our app for claim verification and
            communication.
          </Text>
          <Text variant="bodyMd" as="p">
            <strong>Consent:</strong> You are responsible for obtaining customer
            consent to collect personal data and send email communications
            related to shipping protection.
          </Text>
          <Text variant="bodyMd" as="p">
            <strong>Compliance:</strong> You must comply with all applicable
            laws and regulations regarding data protection, email
            communications, and consumer rights.
          </Text>

          <Text variant="headingMd" as="h2">
            5. Google OAuth 2.0 Integration
          </Text>
          <Text variant="bodyMd" as="p">
            <strong>Authorization:</strong> By enabling Google OAuth 2.0, you
            authorize the app to send emails on your behalf using your Gmail
            account for the purpose of managing claim notifications.
          </Text>
          <Text variant="bodyMd" as="p">
            <strong>Email Content:</strong> The app does not access or read your
            Gmail inbox. It only sends emails related to claims such as claim
            approvals, rejections, and other notifications.
          </Text>
          <Text variant="bodyMd" as="p">
            <strong>Revoking Access:</strong> You can revoke Google OAuth 2.0
            access at any time by managing your permissions in your Google
            account settings.
          </Text>

          <Text variant="headingMd" as="h2">
            6. Data Security
          </Text>
          <Text variant="bodyMd" as="p">
            We implement reasonable measures to protect your data, but you
            acknowledge that no system is completely secure. We are not liable
            for data breaches, provided we have taken necessary and appropriate
            precautions to secure your data.
          </Text>

          <Text variant="headingMd" as="h2">
            7. Limitation of Liability
          </Text>
          <Text variant="bodyMd" as="p">
            We strive to ensure that the app functions correctly, but we do not
            guarantee that it will meet all of your expectations. We are not
            responsible for:
          </Text>
          <List type="bullet" gap="loose">
            <List.Item>
              Indirect Damages: Any incidental, consequential, or indirect
              damages arising from the use or inability to use the app.
            </List.Item>
            <List.Item>
              Service Interruptions: We are not responsible for delays or
              failures in email delivery through SMTP services (including
              Gmail).
            </List.Item>
          </List>

          <Text variant="headingMd" as="h2">
            8. Termination
          </Text>
          <Text variant="bodyMd" as="p">
            We reserve the right to terminate or suspend your access to the app
            without prior notice if you violate these Terms & Conditions or
            engage in fraudulent activities.
          </Text>

          <Text variant="headingMd" as="h2">
            9. Governing Law
          </Text>
          <Text variant="bodyMd" as="p">
            These Terms & Conditions are governed by the laws of [Your
            Jurisdiction]. Any disputes arising from these terms will be
            resolved in the courts located in [Your Jurisdiction].
          </Text>

          <Text variant="headingMd" as="h2">
            10. Modifications to Terms
          </Text>
          <Text variant="bodyMd" as="p">
            We may update these Terms & Conditions at any time. Continued use of
            the app after changes are posted constitutes your acceptance of the
            revised terms.
          </Text>

          <Text variant="headingMd" as="h2">
            11. Contact Us
          </Text>
          <Text variant="bodyMd" as="p">
            If you have any questions or concerns about these Terms & Conditions
            please contact us at:
          </Text>

          <BlockStack gap="100">
            <p>
              Email:{' '}
              <a className="underline" href={`mailto:hello@wenexus.io`}>
                hello@wenexus.io
              </a>
            </p>
            <br />
            <p>
              <strong>Bangladesh Office:</strong> WeNexus, 7-8 Level 9 Block A,
              Banasree Main Road, Rampura, Dhaka
            </p>
            <p>
              <strong>USA Office:</strong> WeNexus LLC, 9420 Lazy Lane Space
              E-11, Tampa, Florida 33614
            </p>
          </BlockStack>
        </BlockStack>
      </ShadowBevelBox>
      <br />
    </Page>
  );
}
