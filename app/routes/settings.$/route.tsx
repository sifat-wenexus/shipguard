import checkoutIcon from '~/assets/icons/checkout-extension.svg';
import pageIcon from '~/assets/icons/customer-claim-page.svg';
import widgetIcon from '~/assets/icons/widget-setup.svg';
import emailIcon from '~/assets/icons/email-outline.svg';
import serverIcon from '~/assets/icons/server.svg';

import { CalloutCard } from '~/components/callout-card';
import { json, useLoaderData } from '@remix-run/react';
import { shopify } from '~/modules/shopify.server';
import { prisma } from '~/modules/prisma.server';
import { useMemo } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  EmptyState,
  InlineGrid,
  InlineGridProps,
  Layout,
  Page,
  Text,
} from '@shopify/polaris';
import {
  CheckIcon,
  InfoIcon,
  SettingsIcon,
  WrenchIcon,
} from '@shopify/polaris-icons';

export async function loader({ request }) {
  const ctx = await shopify.authenticate.admin(request);
  const restAdminApi = await ctx.admin.rest.resources;
  const settingsCartSecond = [
    {
      id: 'settings/smtp-setup',
      name: 'SMTP Setup',
      description: 'Steps to enable Outgoing Mail Server.',
      installed: false,
      illustration: serverIcon,
      available: true,
    },
    {
      id: 'settings/email-template',
      name: 'Email Template Setup',
      description: 'Steps to enable .',
      installed: false,
      illustration: emailIcon,
      available: true,
    },
  ];
  try {
    const installed = await prisma.packageProtection.findFirst({
      where: { storeId: ctx.session.storeId },
      select: { enabled: true },
    });
    let claimPage = false;
    const theme = await restAdminApi.Theme.all({
      session: ctx.session,
    })
      .then((r) => r.data.find((item) => item.role === 'main'))
      .catch((err) => console.error(err));
    console.log(theme?.id);
    const template = await restAdminApi.Asset.all({
      session: ctx.session,
      theme_id: theme?.id,
      asset: { key: 'templates/page.claim-request.json' },
    });
    console.log('----------------------------', template?.data[0]?.value);
    claimPage = JSON.stringify(template?.data[0]?.value).includes(
      'package-protection-claim'
    );
    console.log(claimPage);
    const settingsCart = [
      {
        id: 'settings/widget-setup',
        name: 'Widget Setup',
        description: 'Steps to enable widget in your theme.',
        installed: installed?.enabled ?? false,
        illustration: widgetIcon,
        available: true,
      },
      {
        id: 'settings/claim-page',
        name: 'Customer Claim Page Setup',
        description: 'Steps to enable customer claim page in your theme.',
        installed: claimPage ?? false,
        illustration: pageIcon,
        available: true,
      },
      // {
      //   id: 'settings/checkout-extension',
      //   name: 'Checkout Extension Setup',
      //   description: 'Steps to enable checkout extension in your theme.',
      //   installed: false,
      //   illustration: checkoutIcon,
      //   available: true,
      // },
    ];

    return json({ settingsCart, settingsCartSecond });
  } catch (err) {
    console.log('li error ebar dekha jabe', err);
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
    });
  }
}

const Settings = () => {
  const { settingsCart, settingsCartSecond } = useLoaderData<typeof loader>();
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
    <div className="ml-4 sm:ml-4">
      <Page>
        <Layout>
          <div className="w-full  my-3 m-2 ml-6 sm:ml-0 mt-2">
            <h1 className="font-bold text-lg text-center">Store Code Setup</h1>{' '}
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
            </Box>
            <br />
            <h1 className="font-bold text-lg text-center mt-4">
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
                      app.installed ? (
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
      </Page>
    </div>
  );
};

export default Settings;
