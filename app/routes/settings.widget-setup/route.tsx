import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import CustomizedInsuranceStyle from './components/customized-insurance-style';
import { hexToHsba, hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { Banner, Box, Button, Layout, Page, Text } from '@shopify/polaris';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import InsurancePricing from './components/insurance-pricing';
import { useLivePageData } from '~/hooks/use-live-page-data';
import SpecialSettings from './components/special-settings';
import { queryProxy } from '~/modules/query/query-proxy';
import Tutorial from '../settings.$/components/tutorial';
import PublishButton from './components/publish-button';
import type { PackageProtection } from '#prisma-client';
import PlacementCard from './components/placement-cart';
import WarningBanner from '~/components/warning-banner';
import { ArrowLeftIcon } from '@shopify/polaris-icons';
import { useFormState } from '~/hooks/use-form-state';
import { PageShell } from '~/components/page-shell';
import { prisma } from '~/modules/prisma.server';
import { useLoaderData } from '@remix-run/react';
import { SaveBar } from '~/components/save-bar';
import Preview from './components/preview';
import Content from './components/content';
import style from './styles/route.css';
import Css from './components/css';

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const body = await request.formData();
  const action = body.get('action');

  if (action === 'toggle') {
    const enabled = body.get('enabled') === 'true';
    const state = JSON.parse(body.get('state') as string);

    const {
      excludeProductVariant,
      switchColor,
      price,
      percentage,
      minimumFee,
      maximumFee,
      ...payload
    } = state;
    const packageProtectionCreateAndUpdate: Partial<PackageProtection> = {
      switchColor: hsbaToHexWithAlpha(state.switchColor),
      minimumFee: Number(minimumFee),
      maximumFee: Number(maximumFee),
      percentage: Number(percentage),
      price: Number(price),
      enabled: enabled,
      ...payload,
    };
    try {
      await queryProxy.packageProtection.upsert(
        {
          create: packageProtectionCreateAndUpdate,
          update: packageProtectionCreateAndUpdate,
          where: {
            storeId: ctx.session.storeId,
          },
        },
        {
          session: ctx.session,
        }
      );
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
      minimumFee,
      maximumFee,
      ...payload
    } = state;
    const packageProtectionCreateAndUpdate: Partial<PackageProtection> = {
      switchColor: hsbaToHexWithAlpha(state.switchColor),
      minimumFee: Number(minimumFee),
      maximumFee: Number(maximumFee),
      percentage: Number(percentage),

      price: Number(price),
      ...payload,
    };

    try {
      await queryProxy.packageProtection.upsert(
        {
          create: packageProtectionCreateAndUpdate,
          update: packageProtectionCreateAndUpdate,
          where: {
            storeId: ctx.session.storeId,
          },
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

  const settingsData = await prisma.packageProtection.findFirst({
    include: {
      excludedPackageProtectionProducts: {
        include: { excludedPackageProtectionVariants: true },
      },
    },
    where: { storeId: ctx.session.storeId },
  });

  const { currencyCode } = await prisma.store.findFirstOrThrow({
    where: { id: ctx.session.storeId },
    select: { currencyCode: true },
  });

  return json({
    enabled: settingsData?.enabled ?? false,
    currencyCode: currencyCode,
    data: {
      insurancePriceType: settingsData?.insurancePriceType ?? 'NOT_SELECTED',
      insuranceDisplayButton: settingsData?.insuranceDisplayButton ?? true,
      disabledDescription:
        settingsData?.disabledDescription ??
        'By deselecting we are not liable for lost, damaged, or stolen items.',
      enabledDescription:
        settingsData?.enabledDescription ?? '100% Covers Damage, Lost & Theft',
      minimumFee: settingsData?.minimumFee ?? '',
      maximumFee: settingsData?.maximumFee ?? '',
      percentage: settingsData?.percentage ?? '',
      policyUrl: settingsData?.policyUrl ?? '',
      title: settingsData?.title ?? 'Package Protection',
      price: settingsData?.price ?? '',
      icon: settingsData?.icon ?? 'three',
      css: settingsData?.css ?? '',

      switchColor: settingsData?.switchColor
        ? hexToHsba(settingsData.switchColor)
        : hexToHsba('#6bce6a'),
      insuranceFulfillmentStatus:
        settingsData?.insuranceFulfillmentStatus ??
        'Mark as fulfilled immediately after purchase',

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

      isSingle: settingsData?.isSingle ?? true,
      fixedMultiplePlan: settingsData?.fixedMultiplePlan ?? [
        {
          protectionFees: '',
          cartMinPrice: '',
          cartMaxPrice: '',
        },
      ],
    },
  });
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
const Settings = () => {
  const fetcher = useBetterFetcher();
  const data = useLoaderData<typeof loader>();
  const initialState = useMemo(() => data.data, [data.data]);
  const formState = useFormState(initialState, undefined, {
    percentage: {
      target: 'both',
      validate: (value: string) => {
        if (formState.state.insurancePriceType === 'PERCENTAGE') {
          if (value === '') {
            return {
              type: 'error',
              message: 'This field is required.',
            };
          }
          if (Number(value) === 0) {
            return {
              type: 'error',
              message: 'Percentage can not be Zero.',
            };
          }
        }
      },
    },
    minimumFee: {
      target: 'both',
      validate: (value: string) => {
        if (
          value === '' &&
          formState.state.insurancePriceType === 'PERCENTAGE'
        ) {
          return {
            type: 'error',
            message: 'This field is required.',
          };
        }
      },
    },
    maximumFee: {
      target: 'both',
      validate: (value: string) => {
        if (
          Number(value) <= Number(formState.state.minimumFee) &&
          formState.state.insurancePriceType === 'PERCENTAGE'
        ) {
          return {
            type: 'error',
            message: 'Max Fee Must be Getter Then Min Fee.',
          };
        }
      },
    },
    title: {
      target: 'both',
      validate: (value: string) => {
        if (value === '') {
          return {
            type: 'error',
            message: 'This field is required.',
          };
        }
      },
    },
    enabledDescription: {
      target: 'both',
      validate: (value: string) => {
        if (value === '') {
          return {
            type: 'error',
            message: 'This field is required.',
          };
        }
      },
    },
    disabledDescription: {
      target: 'both',
      validate: (value: string) => {
        if (value === '') {
          return {
            type: 'error',
            message: 'This field is required.',
          };
        }
      },
    },
  });

  const [enabled] = useState(data.enabled);
  const [insurancePriceError, setInsurancePriceError] = useState(false);
  const { state } = formState;
  const { storeInfo } = useLivePageData();

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

  useEffect(() => {
    if (state.insurancePriceType) {
      setInsurancePriceError(false);
    }
  }, [state.insurancePriceType]);
  return (
    <PageShell currencyCode={data.currencyCode}>
      <div className="m-2 sm:m-0">
        <SaveBar formState={formState} onSave={save} />
        <Page>
          <Layout>
            <Layout.Section variant="fullWidth">
              {insurancePriceError && (
                <>
                  <Banner
                    title="Insurance Pricing is Required."
                    tone="warning"
                  />

                  <br />
                </>
              )}
              {<WarningBanner storeInfo={storeInfo} />}
            </Layout.Section>
            <Layout.Section variant="oneHalf">
              <Box paddingBlockEnd={'500'}>
                <div className="flex items-center gap-4">
                  <Button icon={ArrowLeftIcon} url="/settings"></Button>
                  <Text as="h1" variant="headingLg">
                    Widget Setup
                  </Text>
                </div>
              </Box>
              <div className="sm:hidden block">
                <Preview formState={formState} />
              </div>

              <PublishButton
                enabled={enabled}
                formState={formState}
                setInsurancePriceError={setInsurancePriceError}
              />
              <PlacementCard formState={formState} />
              <InsurancePricing
                formState={formState}
                insurancePriceError={insurancePriceError}
              />
              <CustomizedInsuranceStyle formState={formState} />
              <Content formState={formState} />
              <SpecialSettings formState={formState} />
              <Css formState={formState} />
              {/* <Box paddingBlockEnd={'1200'}></Box> */}
            </Layout.Section>
            {/* preview card */}
            <Layout.Section variant="oneHalf">
              <div className="hidden sm:block">
                <Preview formState={formState} />
              </div>
            </Layout.Section>
          </Layout>
          <Tutorial />
        </Page>
      </div>
    </PageShell>
  );
};

export default Settings;

// TODO: version:2 ---> international protection support and pricing for other countries.
// TODO: version:2 --> claim page app block content customization
