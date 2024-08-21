import { scrollToTopIcons } from '~/components/scroll-to-top-icons/scroll-to-top-icon';
import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { hexToHsba, hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import { useBetterNavigate } from '~/hooks/use-better-navigate';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import type { SerializeFrom } from '@remix-run/server-runtime';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { queryProxy } from '~/modules/query/query-proxy';
import { useCallback, useMemo, useState } from 'react';
import { useFormState } from '~/hooks/use-form-state';
import { HelpModal } from '~/components/help-modal';
import { useLoaderData } from '@remix-run/react';
import { SaveBar } from '~/components/save-bar';
import { MainNav } from '~/components/main-nav';
import * as Icons from '@shopify/polaris-icons';
import { Switch } from '~/components/switch';
import { json } from '@remix-run/node';

import style from './styles/route.css';

import {
  InlineStack,
  BlockStack,
  rgbaString,
  EmptyState,
  InlineGrid,
  Checkbox,
  hsbToRgb,
  Divider,
  Button,
  Layout,
  Badge,
  Page,
  Text,
  Grid,
  Icon,
  Box,
  RangeSlider,
} from '@shopify/polaris';

import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  LinksFunction,
} from '@remix-run/node';
import { ColorPicker2 } from '~/components/color-picker-2';
import Preview from './components/preview';

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const body: any = await request.formData();
  const action = body.get('action');

  if (action === 'toggle') {
    const enabled = body.get('enabled') === 'true';

    try {
      await queryProxy.scrollToTopSettings.upsert(
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
      message: `Scroll to Top Button has been ${
        enabled ? 'installed' : 'uninstalled'
      } successfully!`,
    });
  } else if (action === 'save') {
    const state = JSON.parse(body.get('state'));

    // if (typeof icon !== 'string') {
    //   return json({
    //     success: false,
    //     message: 'Invalid Icon ID',
    //   });
    // }
    const scrollToTopCreateAndUpdate = {
      icon: state.selected,
      showOnDesktop: state.showOnDesktop,
      showOnMobile: state.showOnMobile,
      backgroundColor: hsbaToHexWithAlpha(state.backgroundColor),
      iconColor: hsbaToHexWithAlpha(state.iconColor),
      iconSize: state.iconSize,
      right: state.right,
      bottom: state.bottom,
    };

    try {
      await queryProxy.scrollToTopSettings.upsert(
        {
          create: scrollToTopCreateAndUpdate,
          update: scrollToTopCreateAndUpdate,
        },
        {
          session: ctx.session,
        }
      );

      return json({
        success: true,
        message: 'Scroll to Top Button settings has been updated successfully!',
      });
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

  const settings = await queryProxy.scrollToTopSettings.findFirst(
    undefined,
    ctx.session
  );

  return json({
    domain: ctx.session.shop,
    enabled: settings?.enabled ?? false,
    settings: {
      selected: settings?.icon ?? 'one',
      showOnDesktop: settings?.showOnDesktop ?? true,
      showOnMobile: settings?.showOnMobile ?? true,
      backgroundColor: hexToHsba(settings?.backgroundColor ?? '#ffffff'),
      iconColor: hexToHsba(settings?.iconColor ?? '#000000'),
      padding: settings?.padding ?? 10,
      shape: settings?.shape ?? 'ROUNDED',
      iconSize: settings?.iconSize ?? 25,
      right: settings?.right ?? 10,
      bottom: settings?.bottom ?? 5,
    },
  });
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];

export default function App() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useBetterFetcher();
  const navigate = useBetterNavigate();

  const initialState = useMemo(() => data.settings, [data.settings]);
  const formState = useFormState(initialState);

  const [enabled, setEnabled] = useState(data.enabled);
  const { state } = formState;

  // console.log('state: ', state);

  const toggleEnabled = useCallback(
    (enabled: boolean) => {
      setEnabled(enabled);

      return fetcher.submit(
        {
          toast: true,
          loading: true,
        },
        { enabled, action: 'toggle' },
        { method: 'post' }
      );
    },
    [fetcher]
  );

  const save = useCallback(() => {
    return fetcher.submit(
      {
        toast: true,
        loading: true,
      },
      {
        state: JSON.stringify(state),
        action: 'save',
      },
      {
        method: 'POST',
      }
    );
  }, [fetcher, state.selected]);

  return (
    <>
      <MainNav />

      <SaveBar formState={formState} onSave={save} />

      <Page
        backAction={{ onAction: () => navigate('/', -1) }}
        subtitle="Bring your customers back to the top of the page, where they can see product photos and purchase options."
        titleMetadata={
          <Badge
            tone={enabled ? 'success' : 'warning'}
            icon={enabled ? Icons.CheckIcon : Icons.XIcon}
          >
            {enabled ? 'Installed' : 'Uninstalled'}
          </Badge>
        }
        title="Scroll to Top Button"
        primaryAction={
          <div className="flex items-center">
            <Switch isOn={enabled} onToggle={toggleEnabled} />
          </div>
        }
      >
        <Layout>
          <Layout.Section variant="oneHalf">
            <ShadowBevelBox
              title="Available Icons"
              icon={<Icon source={Icons.MagicIcon} />}
            >
              <Box paddingBlockStart="100" paddingBlockEnd="100">
                {scrollToTopIcons.length === 0 ? (
                  <div style={{ '--p-space-1600': '0' } as any}>
                    <EmptyState
                      heading="No icons available, please contact support"
                      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=140&height=140"
                    />
                  </div>
                ) : (
                  <InlineStack gap="200" wrap>
                    {scrollToTopIcons.map((icon) => (
                      <div
                        key={icon.id}
                        className={`p-4 m-2  hover:scale-105 cursor-pointer hover:drop-shadow-xl ${
                          icon.id === state.selected
                            ? 'ring-2 ring-green-500 ring-offset-0 rounded-md'
                            : 'outline-dashed outline-1 outline-offset-0 rounded-md'
                        }`}
                        onClick={() =>
                          formState.addChange({ selected: icon.id })
                        }
                      >
                        <icon.icon
                          bgColor={hsbaToHexWithAlpha(
                            formState.staged.backgroundColor
                          )}
                          color={hsbaToHexWithAlpha(formState.staged.iconColor)}
                        />
                      </div>
                    ))}
                  </InlineStack>
                )}
              </Box>
            </ShadowBevelBox>

            <ShadowBevelBox
              icon={<Icon source={Icons.SettingsIcon} />}
              title="Settings"
              className="mt-4"
            >
              <Box paddingBlockEnd="100">
                <BlockStack gap="100">
                  <Checkbox
                    label="Show on mobile"
                    onChange={(showOnMobile) =>
                      formState.addChange({ showOnMobile })
                    }
                    checked={state.showOnMobile}
                  />
                  <Checkbox
                    label="Show on desktop"
                    onChange={(showOnDesktop) =>
                      formState.addChange({ showOnDesktop })
                    }
                    checked={state.showOnDesktop}
                  />
                </BlockStack>
                <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
                  <Divider />
                </Box>

                {/* <div className="grid gap-5 grid-cols-2"> */}
                <Box paddingBlockStart="100" paddingBlockEnd="100">
                  <ColorPicker2
                    onChange={(backgroundColor) =>
                      formState.addChange({
                        backgroundColor,
                      })
                    }
                    placeholder={hsbaToHexWithAlpha(
                      formState.staged.backgroundColor
                    ).replace('#', '')}
                    color={formState.staged.backgroundColor}
                    label={'Background'}
                    className="!w-full"
                    allowAlpha={false}
                  />
                </Box>
                <div className="mt-1"></div>
                <Box paddingBlockStart="100" paddingBlockEnd="100">
                  <ColorPicker2
                    onChange={(iconColor) =>
                      formState.addChange({
                        iconColor,
                      })
                    }
                    placeholder={hsbaToHexWithAlpha(
                      formState.staged.iconColor
                    ).replace('#', '')}
                    color={formState.staged.iconColor}
                    label={'Icon Color'}
                    className="!w-full"
                    allowAlpha={false}
                  />
                </Box>

                <Box paddingBlockStart="100" paddingBlockEnd="100">
                  <RangeSlider
                    label="Icon Size"
                    onChange={(iconSize: number) =>
                      formState.addChange({ iconSize })
                    }
                    value={+formState.staged.iconSize}
                    output
                    suffix={
                      <p
                        style={{
                          minWidth: '24px',
                          textAlign: 'right',
                        }}
                      >
                        {formState.staged.iconSize}px
                      </p>
                    }
                    min={15}
                    max={60}
                  />
                </Box>
                <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
                  <Divider />
                </Box>

                <Box paddingBlockStart="100" paddingBlockEnd="100">
                  <RangeSlider
                    label="Distance From Right"
                    onChange={(right: number) => formState.addChange({ right })}
                    value={+formState.staged.right}
                    output
                    suffix={
                      <p
                        style={{
                          minWidth: '24px',
                          textAlign: 'right',
                        }}
                      >
                        {formState.staged.right}%
                      </p>
                    }
                    // min={0}
                    max={100}
                  />
                </Box>
                <Box paddingBlockStart="100" paddingBlockEnd="100">
                  <RangeSlider
                    label="Distance From Bottom"
                    onChange={(bottom: number) =>
                      formState.addChange({ bottom })
                    }
                    value={+formState.staged.bottom}
                    output
                    suffix={
                      <p
                        style={{
                          minWidth: '24px',
                          textAlign: 'right',
                        }}
                      >
                        {formState.staged.bottom}%
                      </p>
                    }
                    min={5}
                    max={30}
                  />
                </Box>
              </Box>
            </ShadowBevelBox>
          </Layout.Section>

          <Layout.Section variant="oneHalf">
            <ShadowBevelBox
              title="Preview"
              icon={<Icon source={Icons.ViewIcon} />}
            >
              <Box paddingBlockStart="100" paddingBlockEnd="400">
                <Preview formState={formState} />
              </Box>
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

export type ScrollToTopLoaderData = SerializeFrom<typeof loader>;
