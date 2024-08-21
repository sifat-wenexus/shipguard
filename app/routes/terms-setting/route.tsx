import { hexToHsba, hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { useBetterNavigate } from '~/hooks/use-better-navigate';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import InformationInput from './components/information-input';
import PreviewCheckout from './components/preview-chekout';
import { queryProxy } from '~/modules/query/query-proxy';
import { useCallback, useEffect, useState } from 'react';
import { useFormState } from '~/hooks/use-form-state';
import { HelpModal } from '~/components/help-modal';
import ProductCard from './components/product-card';
import { SaveBar } from '~/components/save-bar';
import { MainNav } from '~/components/main-nav';
import * as Icons from '@shopify/polaris-icons';
import Settings from './components/settings';
import { Switch } from '~/components/switch';
import Style from './components/style';
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  Scripts,
  Links,
  Meta,
} from '@remix-run/react';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  LinksFunction,
  json,
} from '@remix-run/node';
import {
  FormLayout,
  Divider,
  Layout,
  Button,
  Badge,
  Page,
  Icon,
  Grid,
  Box,
} from '@shopify/polaris';

import style from './styles/route.css';

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);
  const body: any = await request.formData();
  const action = body.get('action');

  if (action === 'toggle') {
    const enabled = body.get('enabled') === 'true';
    try {
      await queryProxy.checkoutTermsSettings.upsert(
        {
          where: { storeId: ctx.session.storeId },
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
      message: `Terms & Conditions ${
        enabled ? 'installed' : 'uninstalled'
      } successfully!`,
    });
  } else if (action === 'save') {
    const stateValue = JSON.parse(body.get('state'));
    try {
      const checkoutTermsSettingsCreateAndUpdateData = {
        ...stateValue,
        textFontSize: stateValue.textFontSize.toString(),
        warningTextFontSize: stateValue.warningTextFontSize.toString(),
        textColor: hsbaToHexWithAlpha(stateValue.textColor),
        textLinkColor: hsbaToHexWithAlpha(stateValue.textLinkColor),
        warningTextColor: hsbaToHexWithAlpha(stateValue.warningTextColor),
        warningTextLinkColor: hsbaToHexWithAlpha(
          stateValue.warningTextLinkColor
        ),
      };

      await queryProxy.checkoutTermsSettings.upsert(
        {
          where: { storeId: ctx.session.storeId },
          create: checkoutTermsSettingsCreateAndUpdateData,
          update: checkoutTermsSettingsCreateAndUpdateData,
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
      message: `Save successfully!`,
    });
  }

  return json({ success: false, message: 'Unknown action' });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);
  const settingsData = await queryProxy.checkoutTermsSettings.findFirst(
    undefined,
    ctx.session
  );

  return json({
    enabled: settingsData?.enabled ?? false,
    data: {
      text: settingsData?.text ?? '',
      warningText: settingsData?.warningText ?? '',
      position: settingsData?.position ?? 'BEFORE',
      showOnCartPage: settingsData?.showOnCartPage ?? false,
      showOnMiniCart: settingsData?.showOnMiniCart ?? false,
      checked: settingsData?.checked ?? false,
      textFontSize: settingsData?.textFontSize ?? 14,
      textColor: hexToHsba(settingsData?.textColor ?? '#000000'),
      textLinkColor: hexToHsba(settingsData?.textLinkColor ?? '#115ccf'),
      textLinkUnderline: settingsData?.textLinkUnderline ?? false,
      warningTextFontSize: settingsData?.warningTextFontSize ?? 14,
      warningTextColor: hexToHsba(settingsData?.warningTextColor ?? '#cc0000'),
      warningTextLinkColor: hexToHsba(
        settingsData?.warningTextLinkColor ?? '#115ccf'
      ),
      warningTextLinkUnderline: settingsData?.warningTextLinkUnderline ?? false,
      textAlign: settingsData?.textAlign ?? 'CENTER',
    },
  });
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];

export default function App() {
  const data = useLoaderData<typeof loader>();
  const navigate = useBetterNavigate();
  const fetcher = useBetterFetcher();

  const [enabled, setEnabled] = useState(data.enabled);

  const formState = useFormState(data.data, false, {
    text: {
      target: 'staged',
      validate: (value: string) => {
        if (value === '') {
          return {
            message: 'text is required',
            type: 'error',
          };
        }
      },
    },
    warningText: {
      target: 'staged',
      validate: (value: string) => {
        if (value === '') {
          return {
            message: 'Warning text is required',
            type: 'error',
          };
        }
      },
    },
    link: {
      target: 'staged',
      validate: (value: string) => {
        if (value === '') {
          return {
            message: 'link is required',
            type: 'error',
          };
        }
      },
    },
  });
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

  return (
    <>
      <MainNav />
      <SaveBar formState={formState} onSave={save} />
      <Page
        backAction={{ onAction: () => navigate('/', -1) }}
        subtitle="Follow EU's regulations on processing personal data by obtaining consent before visitors start the checkout process."
        title="Checkout Terms & Conditions"
        titleMetadata={
          <Badge
            icon={enabled ? Icons.TaxIcon : Icons.CreditCardCancelIcon}
            tone={enabled ? 'success' : 'warning'}
          >
            {enabled ? 'Installed' : 'Uninstalled'}
          </Badge>
        }
        primaryAction={
          <div className="flex items-center">
            <Switch isOn={enabled} onToggle={toggleEnabled} />
          </div>
        }
      >
        <Layout>
          <Layout.Section variant="oneHalf">
            {/* information card */}
            <ShadowBevelBox
              icon={<Icon source={Icons.InfoIcon} />}
              title="Information"
            >
              <FormLayout>
                <InformationInput formState={formState} />
              </FormLayout>
            </ShadowBevelBox>
            {/* setting card */}
            <ShadowBevelBox
              icon={<Icon source={Icons.SettingsIcon} />}
              title="Settings"
              className="my-4"
            >
              <FormLayout>
                <FormLayout.Group>
                  <Settings formState={formState} />
                </FormLayout.Group>
              </FormLayout>
            </ShadowBevelBox>
            {/* style card */}
            <ShadowBevelBox
              icon={<Icon source={Icons.MagicIcon} />}
              title="Styles"
              className="my-4"
            >
              <FormLayout>
                <FormLayout.Group>
                  <Style formState={formState} />
                </FormLayout.Group>
              </FormLayout>
            </ShadowBevelBox>
          </Layout.Section>
          {/* preview card */}
          <Layout.Section variant="oneHalf">
            <ShadowBevelBox
              icon={<Icon source={Icons.ViewIcon} />}
              title="Preview"
            >
              <ProductCard card={1} />
              <div className="mt-4"></div>
              <ProductCard card={2} />
              <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
                <Divider />
              </Box>

              {formState.staged.position === 'BEFORE' && (
                <PreviewCheckout formState={formState} />
              )}
              <button
                className="bg-gray-950 text-gray-300 font-semibold text-base p-3 my-3 rounded w-full hover:bg-black hover:text-gray-100 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={!formState.staged.checked}
              >
                Checkout $800.00
              </button>
              {formState.staged.position === 'AFTER' && (
                <PreviewCheckout formState={formState} />
              )}
            </ShadowBevelBox>
          </Layout.Section>
        </Layout>

        <Box paddingBlockStart="1000" paddingBlockEnd="1000">
          <Divider borderWidth="050" />
        </Box>

        <Box paddingBlockEnd="400">
          <Grid columns={{ md: 3, lg: 2, xl: 3, sm: 2, xs: 1 }}>
            <Grid.Cell>
              <ShadowBevelBox title="Watch the Tutorial" divider={false}>
                <Box paddingBlockStart="300">
                  <HelpModal
                    video="https://www.youtube.com/embed/rgZU5pDf6mw?si=EeaXQcg8gvEz36RV"
                    thumbnail="https://i.ytimg.com/vi/rgZU5pDf6mw/maxresdefault.jpg"
                    duration={60 * 9 + 29}
                  />
                </Box>
              </ShadowBevelBox>
            </Grid.Cell>

            <Grid.Cell>
              <ShadowBevelBox
                className="h-full bg-[var(--p-color-bg-surface)]"
                title="Check our Help Center"
                divider={false}
              >
                <Box paddingBlockStart="300" paddingBlockEnd="300">
                  Learn how to use Scroll to Top Button and get the most out of
                  it. Check our Help Center for more information.
                </Box>

                <Button icon={Icons.QuestionCircleIcon}>Get Help</Button>
              </ShadowBevelBox>
            </Grid.Cell>

            <Grid.Cell>
              <ShadowBevelBox
                className="h-full bg-[var(--p-color-bg-surface)]"
                title="We're here for you, 24/7"
                divider={false}
              >
                <Box paddingBlockStart="300" paddingBlockEnd="300">
                  We're here to help you get the most out of Scroll to Top
                  Button. If you have any questions, please contact us.
                </Box>

                <Button icon={Icons.ChatIcon}>Contact us</Button>
              </ShadowBevelBox>
            </Grid.Cell>
          </Grid>
        </Box>
      </Page>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : 'Unknown Error'}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
