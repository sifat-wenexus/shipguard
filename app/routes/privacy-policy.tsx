import { BlockStack, Divider, List, Page, Text } from '@shopify/polaris';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { Link } from '@remix-run/react';

export default function PrivacyPolicy() {
  return (
    <Page>
      <Link to={'https://shipping-protection.wenexus.io/'}>
        {' '}
        <img
          src="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Inhouse-Shipping-Protection_4a82e447-3fb5-48d1-b85e-7f46ab866e4a.png?v=1727505148"
          className="w-[220px] mx-auto h-auto my-4"
          alt="Overall: Shipping Protection"
        />
      </Link>

      <ShadowBevelBox divider={false}>
        <BlockStack gap="400">
          <Text as="h1" variant="headingLg">
            Overall: Shipping Protection - Privacy Policy
          </Text>

          <Text variant="bodyMd" as="p">
            <strong>Effective Date:</strong> 26 September 2024
          </Text>

          <Divider />

          <Text variant="headingMd" as="h2">
            1. Introduction
          </Text>
          <Text variant="bodyMd" as="p">
            At WeNexus ("we", "our", or "us"), we are committed to safeguarding
            your privacy and personal data. This Privacy Policy applies to the
            "Overall: Shipping Protection" app built and operated under WeNexus
            and available on the Shopify App Store. This app provides merchants
            with shipping protection options and integrates with Google OAuth
            2.0 for email services.
          </Text>

          <Text variant="headingMd" as="h2">
            2. Information We Collect
          </Text>
          <Text variant="bodyMd" as="p">
            a. <strong>From Shopify:</strong> When you install our app, we
            collect:
          </Text>
          <List type="bullet">
            <List.Item>
              Customer Name: To verify claims and for communication purposes.
            </List.Item>
            <List.Item>
              Customer Email: To verify claim requests and send notifications
              via the merchant’s SMTP provider.
            </List.Item>
            <List.Item>
              Customer Shipping Address: To confirm the appropriate shipment and
              manage shipping protection.
            </List.Item>
            <List.Item>
              Order Information: Collected to manage claims and shipping
              protection.
            </List.Item>
          </List>

          <Text variant="bodyMd" as="p">
            b. <strong>From Google OAuth 2.0:</strong> If you integrate with
            Google OAuth, we securely store your OAuth token and only use it to
            send emails related to shipping protection claims.
          </Text>

          <Text variant="bodyMd" as="p">
            c. <strong>Automatically Collected Data:</strong> We may also
            collect data such as your IP address, device information, and
            activity within the app for analytics and security purposes. Cookies
            may be used to enhance user experience.
          </Text>

          <Text variant="headingMd" as="h2">
            3. How We Use Your Information
          </Text>
          <List type="bullet">
            <List.Item>
              To verify claim requests using customer name, email, and shipping
              information.
            </List.Item>
            <List.Item>
              To process and manage shipping protection claims, refunds,
              reshipments, and cancellations.
            </List.Item>
            <List.Item>
              To send claim-related notifications via the merchant's SMTP
              provider (e.g., Gmail).
            </List.Item>
            <List.Item>
              To improve the app’s functionality and user experience based on
              collected data.
            </List.Item>
          </List>

          <Text variant="headingMd" as="h2">
            4. Free Early Access and Data Usage
          </Text>
          <List type="bullet">
            <List.Item>
              <b>Promotion Data</b>: Data collected during the free early access
              period is treated with the same security and privacy standards as
              in the paid plans.
            </List.Item>
            <List.Item>
              <b>Transition to Paid Plans</b>: Users who continue app usage
              after the introduction of pricing plans consent to their data
              being used under the updated Terms & Conditions.
            </List.Item>
          </List>

          <Text variant="headingMd" as="h2">
            5. How We Protect Your Information
          </Text>
          <Text variant="bodyMd" as="p">
            We implement security measures to protect your data. All information
            is encrypted during transmission and securely stored on our servers.
            OAuth tokens are handled with industry-standard security protocols.
          </Text>

          <Text variant="headingMd" as="h2">
            6. Sharing Your Information
          </Text>
          <Text variant="bodyMd" as="p">
            We do not sell or rent your personal information. We may share data
            with trusted service providers for app functionality or to comply
            with legal obligations.
          </Text>

          <Text variant="headingMd" as="h2">
            7. Google OAuth 2.0 Integration
          </Text>
          <Text variant="bodyMd" as="p">
            If you integrate Google OAuth 2.0, you authorize the app to send
            emails related to claims using your Gmail account. We do not access
            your Gmail inbox except for sending notifications.
          </Text>
          <Text variant="bodyMd" as="p">
            You can revoke access at any time via your Google account settings.
          </Text>

          <Text variant="headingMd" as="h2">
            8. Data Retention
          </Text>
          <Text variant="bodyMd" as="p">
            We retain your information for as long as necessary to provide our
            services or comply with legal obligations. If you uninstall our app,
            we will delete your data within a reasonable period unless needed
            for legal purposes.
          </Text>

          <Text variant="headingMd" as="h2">
            9. Your Rights
          </Text>
          <List type="bullet">
            <List.Item>
              You have the right to access, correct, or delete your personal
              information.
            </List.Item>
            <List.Item>
              You may revoke consent to Google OAuth 2.0 integration at any
              time.
            </List.Item>
            <List.Item>
              You can opt out of communications or request deletion of your
              Shopify account-related data.
            </List.Item>
          </List>

          <Text variant="headingMd" as="h2">
            10. Changes to this Policy
          </Text>
          <Text variant="bodyMd" as="p">
            We may update this Privacy Policy from time to time. Continued use
            of the app after updates signifies your acceptance of the new
            policy.
          </Text>

          <Text variant="headingMd" as="h2">
            11. Contact Us
          </Text>
          <BlockStack gap="100">
            <p>
              Email:{' '}
              <a className="underline" href="mailto:hello@wenexus.io">
                hello@wenexus.io
              </a>
            </p>
            <br />
            <p>
              <strong>Bangladesh Office:</strong> 7-8 Level 9 Block A, Banasree
              Main Road, Rampura, Dhaka
            </p>
            <p>
              <strong>USA Office: </strong>WeNexus LLC, 9420 Lazy Lane Space
              E-11, Tampa, Florida 33614
            </p>
          </BlockStack>
        </BlockStack>
      </ShadowBevelBox>
      <br />
    </Page>
  );
}
