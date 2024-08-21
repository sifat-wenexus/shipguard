import { hexToHsba, hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import {
  getShopifyRestClient,
  shopify as shopifyRemix,
} from '../../modules/shopify.server';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBetterNavigate } from '~/hooks/use-better-navigate';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { queryProxy } from '~/modules/query/query-proxy';
import { useFormState } from '~/hooks/use-form-state';
import { HelpModal } from '~/components/help-modal';
import { MainNav } from '~/components/main-nav';
import { SaveBar } from '~/components/save-bar';
import * as Icons from '@shopify/polaris-icons';
import Dashboard from './components/dashboard';
import { Switch } from '~/components/switch';

import {
  Divider,
  Layout,
  Button,
  Badge,
  Grid,
  Page,
  Tabs,
  Box,
  Icon,
} from '@shopify/polaris';

import style from './styles/route.css';
import Settings from './components/settings';
import { prisma } from '~/modules/prisma.server';
import Order from './components/order';
import FileClaimRequest from './components/claim-request';
import CodeSetup from './components/page-setup';
import Pricing from './components/pricing';

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const body = await request.formData();
  const action = body.get('action');

  if (action === 'toggle') {
    const enabled = body.get('enabled') === 'true';

    try {
      await queryProxy.packageProtection.upsert(
        {
          create: {
            enabled,
          },
          update: {
            enabled,
          },
        },
        {
          session: ctx.session,
        }
      );
      const shopifyRest = await ctx.admin.rest.resources;
      const isExistPage = (
        await shopifyRest.Page.all({ session: ctx.session })
      ).data.find((page) => page.title === 'Claim Request');
      console.log('isExistPage', isExistPage);
      if (enabled) {
        try {
          console.log('continuing...');
          const themes = (
            await shopifyRest.Theme.all({ session: ctx.session })
          ).data.find((theme) => theme.role === 'main');
          if (!themes || !themes.id) {
            throw new Error('theme not found!');
          }
          const template = new shopifyRest.Asset({
            session: ctx.session,
          });
          template.theme_id = themes!.id;

          template.key = 'templates/page.claim-request.json';
          template.value = JSON.stringify({
            sections: {
              main: {
                type: 'main-page',
                settings: {
                  padding_top: 20,
                  padding_bottom: 20,
                },
              },
            },
            order: ['main'],
          });
          await template.save({ update: true });
          //  page creating or updating
          if (isExistPage) {
            const page = new shopifyRest.Page({ session: ctx.session });
            page.id = isExistPage.id;
            page.published = true;
            page.redirectNewHandle = true;
            await page.save({ update: true });
          }

          if (!isExistPage) {
            const page = new shopifyRest.Page({ session: ctx.session });
            page.title = 'Claim Request';
            page.template_suffix = 'claim-request';

            await page.save({ update: true });
          }

          console.log('---------------------success----------');
        } catch (e) {
          console.log('---------------------- error -------------------');
          console.error('Error:', e);
        }
      } else {
        console.log('make page draft');
        if (isExistPage) {
          const page = new shopifyRest.Page({ session: ctx.session });
          page.id = isExistPage.id;
          page.published = false;
          page.redirectNewHandle = false;
          // page.template_suffix = 'claim-request';
          await page.save({ update: true });
        }
      }

      console.log('clicked', enabled);
    } catch (e) {
      console.error(e);
      return json({
        success: false,
        message:
          'Something went wrong, please try again later or contact support',
      });
    }

    return json({
      success: true,
      message: `Package protection ${
        enabled ? 'installed' : 'uninstalled'
      } successfully!`,
    });
  } else if (action === 'save') {
    const state = JSON.parse(body.get('state') as string);

    const {
      excludeProductVariant,
      switchColor,
      price,
      percentage,
      defaultPercentage,
      ...payload
    } = state;
    const packageProtectionCreateAndUpdate = {
      switchColor: hsbaToHexWithAlpha(state.switchColor),
      defaultPercentage: Number(defaultPercentage),
      percentage: Number(percentage),
      price: Number(price),
      ...payload,
    };

    try {
      await queryProxy.packageProtection.upsert(
        {
          create: packageProtectionCreateAndUpdate,
          update: packageProtectionCreateAndUpdate,
        },
        {
          session: ctx.session,
        }
      );

      if (excludeProductVariant.length === 0) {
        await prisma.excludedPackageProtectionProduct.deleteMany();
        return json({
          success: true,
          message: 'Package protection has been updated successfully!',
        });
      } else {
        const existId = excludeProductVariant.map((product) => product.id);

        // Delete all products not in existId
        await prisma.excludedPackageProtectionProduct.deleteMany({
          where: {
            NOT: {
              id: {
                in: existId,
              },
            },
          },
        });

        // Upsert products and collect variant data
        const upsertPromises: any[] = [];
        const variantData: any[] = [];

        excludeProductVariant.forEach((item) => {
          const payload = {
            id: item.id,
            image: Array.isArray(item.images)
              ? JSON.stringify(item.images)
              : item.images,
            productId: item.id,
            totalInventory: item.totalInventory,
            totalVariants: item.totalVariants,
            title: item.title,
            status: item.status,
            productType: item.productType,
            vendor: item.vendor,
            storeId: ctx.session.storeId!,
          };

          upsertPromises.push(
            prisma.excludedPackageProtectionProduct.upsert({
              create: payload,
              update: payload,
              where: { id: item.id },
            })
          );

          item.variants.forEach((variant) => {
            variantData.push({
              id: variant.id,
              price: variant.price,
              inventoryQuantity: variant.inventoryQuantity,
              productId: variant.productId || variant.product.id,
            });
          });
        });

        // Perform all upserts in parallel
        await Promise.all(upsertPromises);

        // Insert variants
        if (variantData.length > 0) {
          await prisma.excludedPackageProtectionVariant.createMany({
            data: variantData,
            skipDuplicates: true,
          });
        }

        return json({
          success: true,
          message: 'Package protection has been updated successfully!',
        });
      }
    } catch (e) {
      console.error(e);
      return json({
        success: false,
        message:
          'Something went wrong, please try again later or contact support',
      });
    }
  }

  return json({ success: false, message: 'Unknown action' });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const res = await ctx.admin.rest.resources.Order.find({
    session: ctx.session,
    id: 5511720861743,
  });
  // console.log('res----> \n \n', res, '\n \n');

  const settingsData = await prisma.packageProtection.findFirst({
    include: {
      excludedPackageProtectionProducts: {
        include: { excludedPackageProtectionVariants: true },
      },
    },
    where: { storeId: ctx.session.storeId },
  });
  return json({
    enabled: settingsData?.enabled ?? false,
    data: {
      insurancePriceType: settingsData?.insurancePriceType ?? 'PERCENTAGE',
      insuranceDisplayButton: settingsData?.insuranceDisplayButton ?? false,
      disabledDescription:
        settingsData?.disabledDescription ?? 'Write your disabled description.',
      enabledDescription:
        settingsData?.enabledDescription ?? 'Write your enabled description.',
      defaultPercentage: settingsData?.defaultPercentage ?? 2,
      percentage: settingsData?.percentage ?? 3,
      policyUrl: settingsData?.policyUrl ?? 'www.yourpolicyurl.com',
      title: settingsData?.title ?? 'Package Protection',
      price: settingsData?.price ?? 0,
      icon: settingsData?.icon ?? 'one',
      css: settingsData?.css ?? '',

      switchColor: settingsData?.switchColor
        ? hexToHsba(settingsData.switchColor)
        : hexToHsba('#22c122'),
      insuranceFulfillmentStatus:
        settingsData?.insuranceFulfillmentStatus ??
        'Mark as fulfilled when first item(s) are fulfilled',

      defaultSetting: settingsData?.defaultSetting ?? true,
      cssSelector: settingsData?.cssSelector ?? '',
      position: settingsData?.position ?? 'BEFORE',
      showOnCartPage: settingsData?.showOnCartPage ?? true,
      showOnMiniCart: settingsData?.showOnMiniCart ?? false,
      excludeProductVariant:
        settingsData?.excludedPackageProtectionProducts.map((e) => ({
          ...e,
          variants: e.excludedPackageProtectionVariants,
          images: e.image,
        })) ?? [],
    },
  });
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];

export default function App() {
  const data = useLoaderData<typeof loader>();
  const navigate = useBetterNavigate();
  const fetcher = useBetterFetcher();

  const [tab, setTab] = useState(0);
  const [enabled, setEnabled] = useState(data.enabled);

  const initialState = useMemo(() => data.data, [data.data]);
  const formState = useFormState(initialState);

  const { state } = formState;
  const save = useCallback(async () => {
    try {
      await fetcher.submit(
        {
          loading: true,
          toast: true,
        },
        {
          state: JSON.stringify(state),
          action: 'save',
        },
        {
          method: 'POST',
        }
      );
    } catch (e) {
      console.error(e);
    }
  }, [fetcher, state]);

  const toggleEnabled = useCallback(
    (enabled: boolean) => {
      setEnabled(enabled);

      return fetcher.submit(
        {
          loading: true,
          toast: true,
        },
        {
          action: 'toggle',
          enabled,
        },
        {
          method: 'post',
        }
      );
    },
    [fetcher]
  );

  // this for ctrl + s fn
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        save();
      }
    };
    document.body.addEventListener('keydown', handleKeyPress);
    return () => {
      document.body.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  //-----------

  const tabs = [
    {
      id: 'all-customers-fitted-2',
      content: (
        <div className="flex items-center gap-1">
          <Icon source={Icons.ChartHistogramSecondLastIcon}></Icon> Dashboard
        </div>
      ),
      panelID: 'all-customers-fitted-content-2',
    },
    {
      id: 'accepts-marketing-fitted-2',
      content: (
        <div className="flex items-center gap-1">
          <Icon source={Icons.OrderIcon}></Icon> Order
        </div>
      ),
      panelID: 'accepts-marketing-fitted-Content-2',
    },
    {
      id: 'accepts-marketing-fitted-4',
      content: (
        <div className="flex items-center gap-1">
          <Icon source={Icons.ClipboardCheckIcon}></Icon> Claim Request
        </div>
      ),
      panelID: 'accepts-marketing-fitted-Content-3',
    },
    {
      id: 'accepts-marketing-fitted-3',
      content: (
        <div className="flex items-center gap-1">
          <Icon source={Icons.SettingsIcon}></Icon> Settings
        </div>
      ),
      panelID: 'accepts-marketing-fitted-Content-3',
    },
    {
      id: 'accepts-marketing-fitted-5',
      content: (
        <div className="flex items-center gap-1">
          <Icon source={Icons.PriceListIcon}></Icon> Pricing
        </div>
      ),
      panelID: 'accepts-marketing-fitted-Content-3',
    },
  ];
  const [searchParams, setSearchParams] = useSearchParams();

  const switchTab = useCallback(
    (index: number) => {
      const params = new URLSearchParams(searchParams);

      switch (index) {
        case 1:
          setTab(1);
          params.set('tab', 'order');
          break;
        case 2:
          setTab(2);
          params.set('tab', 'claim-request');
          break;
        case 3:
          setTab(3);
          params.set('tab', 'settings');
          break;
        case 4:
          setTab(4);
          params.set('tab', 'pricing');
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
      case 'order':
        setTab(1);
        break;
      case 'claim-request':
        setTab(2);
        break;
      case 'settings':
        setTab(3);
        break;
      case 'pricing':
        setTab(4);
        break;
      default:
        setTab(0);
    }
  }, [searchParams]);

  let currentTab: React.ReactNode | null = null;
  switch (tab) {
    case 0:
      currentTab = <Dashboard />;
      break;

    case 1:
      currentTab = <Order />;
      break;

    case 2:
      currentTab = <FileClaimRequest />;
      break;
    case 3:
      currentTab = <Settings formState={formState} enabled={data.enabled} />;
      break;
    case 4:
      currentTab = <Pricing />;
      break;

    default:
      break;
  }

  return (
    <>
      <MainNav />
      <SaveBar formState={formState} onSave={save} />
      <Page
      // backAction={{ onAction: () => navigate('/', -1) }}
      // subtitle="Follow EU's regulations on processing personal data by obtaining consent before visitors start the checkout process."
      // title="Cart page insurance"
      // titleMetadata={
      //   <Badge
      //     icon={enabled ? Icons.TaxIcon : Icons.CreditCardCancelIcon}
      //     tone={enabled ? 'success' : 'warning'}
      //   >
      //     {enabled ? 'Installed' : 'Uninstalled'}
      //   </Badge>
      // }
      // primaryAction={
      //   <div className="flex items-center">
      //     <Switch isOn={enabled} onToggle={toggleEnabled} />
      //   </div>
      // }
      >
        <Layout>
          <Layout.Section variant="fullWidth">
            <div className="bg-white rounded shadow p-3 my-2 sticky top-32">
              <Tabs tabs={tabs} selected={tab} onSelect={switchTab}></Tabs>
            </div>
          </Layout.Section>
          {currentTab}
        </Layout>

        {/* <Box paddingBlockStart="1000" paddingBlockEnd="1000">
          <Divider borderWidth="050" />
        </Box> */}
      </Page>
    </>
  );
}
