import type { TabProps } from '@shopify/polaris/build/ts/src/components/Tabs/types';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { InlineStack, TextField, Card, Page, Tabs } from '@shopify/polaris';
import { MainNav, MainNavContext } from '~/components/main-nav';
import type { OverallApp } from '~/components/apps-context';
import { boundary } from '~/shopify-app-remix/server';
import { shopify } from '~/modules/shopify.server';
import type { HeadersArgs } from '@remix-run/node';
import { Dashboard } from '~/components/dashboard';
import { prisma } from '~/modules/prisma.server';
import { Apps } from '~/components/apps';
import { json } from '@remix-run/node';

import {
  useLoaderData,
  useRouteError,
  useSearchParams,
} from '@remix-run/react';

export async function loader({ request }) {
  const ctx = await shopify.authenticate.admin(request);

  const settings = await prisma.store.findFirstOrThrow({
    where: {
      domain: ctx.session.shop,
    },
    select: {
      BadgeSettings: {
        select: {
          enabled: true,
        },
      },
      ScrollToTopSettings: {
        select: {
          enabled: true,
        },
      },
      CheckoutTermsSettings: { select: { enabled: true } },
      PackageProtection: { select: { enabled: true } },
    },
  });

  const apps: OverallApp[] = [
    {
      id: 'trust-badge',
      name: 'Trust Seals and Badges',
      description:
        "Boost your store's trust and conversion rates with premium, professionally designed badges.",
      installed: settings.BadgeSettings?.enabled ?? false,
      illustration:
        'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
      available: true,
    },
    {
      id: 'payment-logos',
      name: 'Payment Logos',
      description:
        'Build trust by letting your visitors know you accept various payment methods.',
      illustration:
        'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
      installed: false,
      available: false,
    },
    {
      id: 'scroll-to-top',
      name: 'Scroll to Top Button',
      description:
        'Bring your customers back to the top of the page, with a single click.',
      illustration:
        'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
      installed: settings.ScrollToTopSettings?.enabled ?? false,
      available: true,
    },
    {
      id: 'sales-campaign',
      name: 'Sales Campaign & Discount',
      description:
        'Create sales campaigns and manage discounts by collections, products, or your entire store.',
      illustration:
        'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
      installed: true,
      available: true,
      automatic: true,
    },
    {
      id: 'terms-setting',
      name: 'Checkout Terms & Conditions ',
      description:
        'Create terms and conditions for validation and user agreement.',
      illustration:
        'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
      installed: settings.CheckoutTermsSettings?.enabled ?? false,
      available: true,
      automatic: true,
    },
    {
      id: 'package-protection',
      name: 'Package Protection ',
      description: 'Create Package Protection for better shipment.',
      illustration:
        'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
      installed: settings.PackageProtection?.enabled ?? false,
      available: true,
      automatic: true,
    },
  ];

  return json({ apps });
}

export default function App() {
  const { apps } = useLoaderData<typeof loader>();
  const tabsRaw = useContext(MainNavContext);

  const tabs = useMemo<TabProps[]>(() => {
    const counts = {
      'all-apps': apps.filter((app) => app.available).length,
      'active-apps': apps.filter((app) => app.installed).length,
      'upcoming-apps': apps.filter((app) => !app.available).length,
    };

    for (const key in counts) {
      tabsRaw.some((tab) => {
        const found = tab.id === key;

        if (found) {
          tab.badge = counts[key];
        }

        return found;
      });
    }

    return tabsRaw.map(({ url, ...tab }) => ({
      ...tab,
    }));
  }, [apps, tabsRaw]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>('');

  const [tab, setTab] = useState(0);

  const appsFiltered = useMemo<OverallApp[]>(() => {
    if (tab === 0) {
      return apps;
    }

    let filtered: OverallApp[] = apps;

    if (tab === 2) {
      filtered = apps.filter((app) => app.installed);
    } else if (tab === 3) {
      filtered = apps.filter((app) => !app.available);
    } else if (tab === 1) {
      filtered = apps.filter((app) => app.available);
    }

    if (search) {
      const keywords = search
        .split(' ')
        .filter((keyword) => keyword.length > 0);

      filtered = filtered.filter((app) => {
        const name = app.name.toLowerCase();
        const description = app.description.toLowerCase();

        return keywords.some((keyword) => {
          const lowerKeyword = keyword.toLowerCase();

          return (
            name.includes(lowerKeyword) || description.includes(lowerKeyword)
          );
        });
      });
    }

    return filtered;
  }, [apps, tab, search]);

  const switchTab = useCallback(
    (index: number) => {
      const params = new URLSearchParams(searchParams);

      switch (index) {
        case 1:
          setTab(1);
          params.set('tab', 'all');
          break;
        case 2:
          setTab(2);
          params.set('tab', 'active');
          break;
        case 3:
          setTab(3);
          params.set('tab', 'upcoming');
          break;
        default:
          setTab(0);
          params.delete('tab');
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    switch (searchParams.get('tab')) {
      case 'all':
        setTab(1);
        break;
      case 'active':
        setTab(2);
        break;
      case 'upcoming':
        setTab(3);
        break;
      default:
        setTab(0);
    }
  }, [searchParams]);

  return (
    <Page>
      <MainNav />

      <Card padding="200">
        <InlineStack align="space-between" blockAlign="center">
          <div className="w-full md:w-auto md:mr-1 order-2 p-2 md:p-0">
            <TextField
              onClearButtonClick={() => setSearch('')}
              placeholder="Search"
              onChange={setSearch}
              inputMode="search"
              autoComplete="on"
              label="Search"
              value={search}
              labelHidden
              clearButton
            />
          </div>

          <div className="order-3 md:order-1 md:mt-0 mt-4">
            <Tabs onSelect={switchTab} selected={tab} tabs={tabs} />
          </div>
        </InlineStack>
      </Card>

      {tab === 0 ? <Dashboard /> : <Apps apps={appsFiltered} tab={tab} />}
    </Page>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs: HeadersArgs) => {
  return boundary.headers(headersArgs);
};
