import { getThemeFileInfo } from '~/modules/get-theme-file-content';
import { json, useLoaderData, useNavigate } from '@remix-run/react';
import type { InlineGridProps } from '@shopify/polaris';
import { CalloutCard } from '~/components/callout-card';
import { PageShell } from '~/components/page-shell';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import type { Prisma } from '#prisma-client';
import { useMemo } from 'react';


import checkoutIcon from '~/assets/icons/checkout-extension.svg';
import pageIcon from '~/assets/icons/customer-claim-page.svg';
import widgetIcon from '~/assets/icons/widget-setup.svg';
import emailIcon from '~/assets/icons/email-outline.svg';
import serverIcon from '~/assets/icons/server.svg';
import {
  EmptyState,
  InlineGrid,
  Layout,
  Button,
  Badge,
  Card,
  Page,
  Text,
  Box,
} from '@shopify/polaris';
import {
  cancelCustomerTemplate,
  refundCustomerTemplate,
  reOrderCustomerTemplate,
  reqAdminTemplate,
  reqCustomerTemplate,
} from '../settings.email-template/components/default-template-code';
import {
  SettingsIcon,
  WrenchIcon,
  CheckIcon,
  InfoIcon,
} from '@shopify/polaris-icons';

export async function loader({ request }) {
  const ctx = await shopify.authenticate.admin(request);

  const smtp = await prisma.smtpSetting.findFirst({
    where: { id: ctx.session.storeId },
  });
  const settingsCartSecond = [
    {
      id: 'settings/smtp-setup',
      name: 'SMTP Setup',
      description:
        'Configure the outgoing mail server to enable email notifications.',
      installed: smtp?.provider ?? false,
      illustration: serverIcon,
      available: true,
    },
    {
      id: 'settings/email-template',
      name: 'Email Template Setup',
      description: 'Edit and customize email templates to match your brand.',
      installed: false,
      illustration: emailIcon,
      available: true,
    },
  ];

  const { currencyCode } = await prisma.store.findFirstOrThrow({
    where: { id: ctx.session.storeId },
    select: { currencyCode: true },
  });

  try {
    const installed = await prisma.packageProtection.findFirst({
      where: { storeId: ctx.session.storeId },
      select: { enabled: true },
    });
    let claimPage = false;

    const templateInfo = await getThemeFileInfo(
      'templates/page.claim-request.json',
      ctx.session
    );

    if (templateInfo) {
      claimPage = true;
    }
    const settingsCart = [
      {
        id: 'settings/widget-setup',
        name: 'Widget Setup',
        description:
          'Follow steps to activate and integrate the widget into your theme.',
        installed: installed?.enabled ?? false,
        illustration: widgetIcon,
        available: true,
      },
      {
        id: 'settings/claim-page',
        name: 'Customer Claim Page Setup',
        description:
          'Enable the customer claim page in your theme to manage claims seamlessly.',
        installed: claimPage ?? false,
        illustration: pageIcon,
        available: true,
      },
      {
        id: 'settings/checkout-extension',
        name: 'Checkout Extension Setup',
        description: 'Enable the checkout extension in your theme.',
        installed: false,
        illustration: checkoutIcon,
        available: true,
      },
    ];
    // email template default create

    const templates = await prisma.emailTemplate.findMany({
      where: { storeId: ctx.session.storeId },
    });
    if (templates.length === 0) {
      const defaultTemplatesPayload: Prisma.EmailTemplateCreateManyInput[] = [
        {
          storeId: ctx.session.storeId!,
          body: reqAdminTemplate,
          subject: 'New Claim Request Submitted: Order {{order_id}}',
          name: 'CLAIM_REQUEST_EMAIL_FOR_ADMIN',
        },
        {
          storeId: ctx.session.storeId!,
          body: reqCustomerTemplate,
          subject: 'Claim Request Received: Order {{order_id}}',
          name: 'CLAIM_REQUEST_EMAIL_FOR_CUSTOMER',
        },
        {
          storeId: ctx.session.storeId!,
          body: refundCustomerTemplate,
          subject: 'Claim Approved: Refund Issued for Order {{order_id}}',
          name: 'CLAIM_REFUND_EMAIL_FOR_CUSTOMER',
        },
        {
          storeId: ctx.session.storeId!,
          body: reOrderCustomerTemplate,
          subject: 'Claim Approved: Replacement Order Confirmed for Order',
          name: 'CLAIM_REORDER_EMAIL_FOR_CUSTOMER',
        },
        {
          storeId: ctx.session.storeId!,
          body: cancelCustomerTemplate,
          subject: 'Claim Request Canceled: Order {{order_id}}',
          name: 'CLAIM_CANCEL_EMAIL_FOR_CUSTOMER',
        },
      ];
      await prisma.emailTemplate.createMany({
        data: defaultTemplatesPayload,
      });
    }

    return json({ settingsCart, settingsCartSecond, currencyCode });
  } catch (err) {
    console.log(err);
    return json({
      settingsCart: [
        {
          id: 'settings/widget-setup',
          name: 'Widget Setup',
          description: 'Steps to enable widget in your theme.',
          installed: false,
          illustration: widgetIcon,
          available: true,
        },
        {
          id: 'settings/claim-page',
          name: 'Customer Claim Page Setup',
          description: 'Steps to enable customer claim page in your theme.',
          installed: false,
          illustration: pageIcon,
          available: true,
        },
      ],
      settingsCartSecond,
      currencyCode,
    });
  }
}

const Settings = () => {
  const { settingsCart, settingsCartSecond, currencyCode } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const columns = useMemo<InlineGridProps['columns']>(
    () => ({
      xl: 2,
      lg: 2,
      md: 2,
      sm: 1,
      xs: 1,
    }),
    []
  );
  return (
    <PageShell currencyCode={currencyCode}>
      <Page title={'Settings'} backAction={{ onAction: () => navigate(-1) }}>
        <div className="ml-0 sm:ml-4">
          <Layout>
            <div className="w-full  my-3 m-2 ml-6 sm:ml-0 mt-8">
              <h1 className="font-bold text-lg text-center">
                Store Code Setup
              </h1>{' '}
              <p className="text-center">
                Code setup for in-house shipping protection
              </p>
              <br />
              <Box paddingBlockStart="400">
                {settingsCart.length === 0 ? (
                  <Card padding="400">
                    <EmptyState
                      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=150&height=150"
                      heading="Nothing here"
                    >
                      <Text as="p">No Cart Fund</Text>
                    </EmptyState>
                  </Card>
                ) : (
                  <InlineGrid columns={columns} gap="400">
                    {settingsCart.map((app) => (
                      <CalloutCard
                        button={
                          app.installed ? (
                            <Button
                              icon={SettingsIcon}
                              url={`/${app.id}`}
                              variant="primary"
                            >
                              Configure
                            </Button>
                          ) : app.available ? (
                            <Button
                              icon={WrenchIcon}
                              url={`/${app.id}`}
                              variant="primary"
                              tone="success"
                            >
                              Setup Settings
                            </Button>
                          ) : undefined
                        }
                        description={app.description}
                        image={app.illustration}
                        title={app.name}
                        key={app.id}
                        badge={
                          app.installed ? (
                            <Badge tone="success" size="large" icon={CheckIcon}>
                              Active
                            </Badge>
                          ) : app.name === 'Checkout Extension Setup' ? (
                            <Badge tone="critical" size="large" icon={InfoIcon}>
                              Shopify Plus required
                            </Badge>
                          ) : (
                            <Badge tone="warning" size="large" icon={InfoIcon}>
                              Action Required
                            </Badge>
                          )
                        }
                      />
                    ))}
                  </InlineGrid>
                )}
              </Box>
              <br />
              <h1 className="font-bold text-lg text-center mt-8">
                Setup SMTP Server & Mail Template
              </h1>{' '}
              <p className="text-center">
                Code setup for in-house shipping protection
              </p>
              <br />
              {settingsCart.length === 0 ? (
                <Card padding="400">
                  <EmptyState
                    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=150&height=150"
                    heading="Nothing here"
                  >
                    <Text as="p">No Cart Fund</Text>
                  </EmptyState>
                </Card>
              ) : (
                <InlineGrid columns={columns} gap="400">
                  {settingsCartSecond.map((app) => (
                    <CalloutCard
                      button={
                        app.installed ? (
                          <Button
                            icon={SettingsIcon}
                            url={`/${app.id}`}
                            variant="primary"
                          >
                            Configure
                          </Button>
                        ) : app.available ? (
                          <Button
                            icon={WrenchIcon}
                            url={`/${app.id}`}
                            variant="primary"
                            tone="success"
                          >
                            Setup Settings
                          </Button>
                        ) : undefined
                      }
                      description={app.description}
                      image={app.illustration}
                      title={app.name}
                      key={app.id}
                      badge={
                        app.name ===
                        'Email Template Setup' ? null : app.installed ? (
                          <Badge tone="success" size="large" icon={CheckIcon}>
                            Active
                          </Badge>
                        ) : app.name === 'Checkout Extension Setup' ? (
                          <Badge tone="critical" size="large" icon={InfoIcon}>
                            Shopify Plus Needed
                          </Badge>
                        ) : (
                          <Badge tone="warning" size="large" icon={InfoIcon}>
                            Action Required
                          </Badge>
                        )
                      }
                    />
                  ))}
                </InlineGrid>
              )}
            </div>
          </Layout>
        </div>
      </Page>
    </PageShell>
  );
};

export default Settings;
