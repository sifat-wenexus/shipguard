import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { useBetterNavigate } from '~/hooks/use-better-navigate';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { ConfirmDialog } from '~/components/confirm-dialog';
import { queryProxy } from '~/modules/query/query-proxy';
import { useFormState } from '~/hooks/use-form-state';
import { HelpModal } from '~/components/help-modal';
import { useLoaderData } from '@remix-run/react';
import { MainNav } from '~/components/main-nav';
import * as Icons from '@shopify/polaris-icons';
import { SaveBar } from '~/components/save-bar';
import { Switch } from '~/components/switch';
import { json } from '@remix-run/node';

import style from './styles/route.css';

import {
  InlineStack,
  EmptyState,
  BlockStack,
  InlineGrid,
  DropZone,
  Divider,
  Button,
  Layout,
  Badge,
  Icon,
  Page,
  Text,
  Grid,
  Box,
} from '@shopify/polaris';

import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  LinksFunction,
} from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const body = await request.formData();
  const action = body.get('action');

  if (action === 'toggle') {
    const enabled = body.get('enabled') === 'true';

    try {
      await queryProxy.badgeSettings.upsert(
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
      message: `Trust Badge has been ${
        enabled ? 'installed' : 'uninstalled'
      } successfully!`,
    });
  } else if (action === 'save') {
    const badges = new Set(
      (body.get('selected') as string)
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== '')
    );

    try {
      const store = await queryProxy.store.findFirst(
        {
          select: {
            id: true,
            BadgeSettings: {
              include: {
                BadgeImages: true,
              },
            },
          },
        },
        ctx.session
      );

      if (!store) {
        return json({
          success: false,
          message: 'Store not found',
        });
      }

      const currentBadges = new Set(
        store.BadgeSettings?.BadgeImages.map((bi) => bi.id) ?? []
      );

      const toDelete = Array.from(currentBadges).filter((b) => !badges.has(b));
      const toCreate = Array.from(badges).filter((b) => !currentBadges.has(b));

      if (toDelete && toDelete.length > 0) {
        await queryProxy.badgeImage.deleteMany(
          {
            where: {
              id: {
                in: toDelete,
              },
            },
          },
          {
            session: ctx.session,
          }
        );
      }

      if (toCreate.length > 0) {
        await queryProxy.badgeImage.createMany(
          {
            data: toCreate.map((badge) => ({
              id: badge,
            })),
          },
          {
            session: ctx.session,
          }
        );
      }

      return json({
        success: true,
        message: 'Trust Badge settings has been updated successfully!',
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

  const settings = await queryProxy.badgeSettings.findFirst(
    {
      include: {
        BadgeImages: {
          select: {
            File: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    },
    ctx.session
  );

  const badges = await (
    await queryProxy.file.findMany(
      {
        select: {
          id: true,
          storeId: true,
        },
      },
      ctx.session
    )
  ).firstPage();
  const groups = await (
    await queryProxy.badgeGroup.findMany(
      {
        select: {
          id: true,
          name: true,
          Files: {
            select: {
              id: true,
            },
          },
        },
      },
      ctx.session
    )
  ).firstPage();

  return json({
    domain: ctx.session.shop,
    badges: badges.map((badge) => badge.id),
    groups: groups.map((g) => ({
      id: g.id,
      name: g.name,
      badges: g.Files.map((f) => f.id),
    })),
    uploads: badges
      .filter((badge) => badge.storeId !== null)
      .map((badge) => badge.id),
    enabled: settings?.enabled ?? false,
    selected: settings?.BadgeImages.map((bi) => bi.File.id) ?? [],
  });
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];

export default function App() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useBetterFetcher();
  const navigate = useBetterNavigate();

  const validImageTypes = useMemo(
    () => ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'],
    []
  );

  const confirmDialog = useRef<ConfirmDialog>(null);

  const [enabled, setEnabled] = useState(data.enabled);

  const initialState = useMemo(
    () => ({
      selected: new Set(data.selected),
    }),
    [data.selected]
  );

  const formState = useFormState(initialState);
  const { state } = formState;

  const selectedArr = useMemo(
    () => Array.from(state.selected),
    [state.selected]
  );

  const selectGroup = useCallback(
    (group: (typeof data.groups)[0]) => {
      formState.addChange({
        selected: new Set(group.badges),
      });
    },
    [data, formState]
  );

  const toggleEnabled = useCallback(
    (enabled: boolean) => {
      setEnabled(enabled);

      return fetcher.submit(
        {
          loading: true,
          toast: true,
        },
        {
          enabled,
          action: 'toggle',
        },
        {
          method: 'post',
        }
      );
    },
    [fetcher]
  );

  const unselectBadge = useCallback(
    (badge: string) => {
      formState.addChange({
        selected: new Set(
          Array.from(state.selected).filter((b) => b !== badge)
        ),
      });
    },
    [formState, state.selected]
  );

  const selectBadge = useCallback(
    (badge: string) => {
      formState.addChange({
        selected: new Set([...state.selected, badge]),
      });
    },
    [formState, state.selected]
  );

  const save = useCallback(async () => {
    try {
      await fetcher.submit(
        {
          loading: true,
          toast: true,
        },
        {
          action: 'save',
          selected: Array.from(state.selected),
        },
        {
          method: 'POST',
          navigate: true,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }, [fetcher, state]);

  const upload = useCallback(
    async (files: File[]) => {
      const formData = new FormData();

      formData.append('file', files[0]);

      await fetcher.submit(
        {
          loading: true,
          toast: true,
        },
        formData,
        {
          action: '/api/files',
          method: 'POST',
          encType: 'multipart/form-data',
        }
      );
    },
    [fetcher]
  );

  const deleteBadge = useCallback(
    async (badge: string) => {
      const confirmed = await confirmDialog.current?.confirm();

      if (!confirmed) {
        return;
      }

      await fetcher.submit(
        {
          loading: true,
          toast: true,
        },
        null,
        {
          action: `/api/files/${badge}`,
          method: 'POST',
        }
      );

      if (state.selected.has(badge)) {
        unselectBadge(badge);
      }
    },
    [state.selected, confirmDialog, fetcher, unselectBadge]
  );

  const validateImage = useCallback(
    (file: File) => {
      if (!validImageTypes.includes(file.type)) {
        return false;
      }

      return file.size <= 800000;
    },
    [validImageTypes]
  );

  return (
    <>
      <MainNav />

      <SaveBar formState={formState} onSave={save} />

      <ConfirmDialog
        ref={confirmDialog}
        title="Confirm delete"
        content="Are you sure, you want to delete this badge?"
        primaryAction={{
          content: 'Delete',
          destructive: true,
        }}
        secondaryAction={{
          content: "Don't delete",
        }}
      />

      <Page
        backAction={{ onAction: () => navigate('/', -1) }}
        subtitle="Increase trust and conversion rate with premium, proffesionally-designed badges that match your store's look and feel"
        titleMetadata={
          <Badge
            tone={enabled ? 'success' : 'warning'}
            icon={enabled ? Icons.CheckIcon : Icons.XIcon}
          >
            {enabled ? 'Installed' : 'Uninstalled'}
          </Badge>
        }
        title="Trust Seals and Badges"
        primaryAction={
          <div className="flex items-center">
            <Switch isOn={enabled} onToggle={toggleEnabled} />
          </div>
        }
      >
        <Layout>
          <Layout.Section variant="oneHalf">
            <ShadowBevelBox
              title="Pre-defined Groups"
              icon={<Icon source={Icons.MagicIcon} />}
            >
              {data.groups.length === 0 ? (
                <EmptyState
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=150&height=150"
                  heading="No Pre-defined Groups"
                >
                  <Text as="p">
                    Please contact support to add pre-defined groups.
                  </Text>
                </EmptyState>
              ) : (
                data.groups.map((g) => (
                  <div
                    className="flex justify-between items-center gap-2 p-4 bg-white rounded-md mb-3"
                    key={g.id}
                  >
                    <div className="flex gap-4">
                      {g.badges.map((badge) => (
                        <div
                          className=" hover:scale-105 rounded-full cursor-pointer hover:drop-shadow-md"
                          key={badge}
                        >
                          <img
                            src={`/api/files/${badge}`}
                            height="52px"
                            width="52px"
                            alt="badge"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={() => selectGroup(g)}>Select</Button>
                    </div>
                  </div>
                ))
              )}
            </ShadowBevelBox>

            <ShadowBevelBox
              title="Selected Badges"
              className="mt-4"
              icon={<Icon source={Icons.CheckIcon} />}
            >
              {state.selected.size === 0 ? (
                <Box
                  background="bg-surface-caution"
                  paddingInlineStart="200"
                  paddingBlockStart="200"
                  paddingInlineEnd="200"
                  paddingBlockEnd="200"
                  borderRadius="050"
                  as="section"
                >
                  <Text as="p" alignment="center">
                    Select badges from the{' '}
                    <span className="italic font-bold">Available Badges</span>{' '}
                    section below.
                  </Text>
                </Box>
              ) : (
                <BlockStack gap="500">
                  <InlineStack gap="200" wrap>
                    {selectedArr.map((badge) => (
                      <div key={badge} className="cursor-grab">
                        <div className="rounded-full  hover:drop-shadow-xl relative">
                          <img
                            src={`/api/files/${badge}`}
                            height="52px"
                            width="52px"
                            alt="badge"
                          />
                          <div
                            className=" cursor-pointer absolute  bottom-0 right-0  bg-white rounded-full hover:scale-105 shadow-md"
                            onClick={() => unselectBadge(badge)}
                          >
                            <Icon source={Icons.XIcon} tone="critical" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </InlineStack>

                  {state.selected.size < 4 && state.selected.size > 0 ? (
                    <Box
                      background="bg-surface-caution"
                      paddingInlineStart="200"
                      paddingBlockStart="200"
                      paddingInlineEnd="200"
                      paddingBlockEnd="200"
                      borderRadius="050"
                      as="section"
                    >
                      We recommend picking 4 badges to display on your store.
                    </Box>
                  ) : null}
                </BlockStack>
              )}
            </ShadowBevelBox>

            <ShadowBevelBox
              title="Available Badges"
              className="mt-4"
              icon={<Icon source={Icons.ListBulletedFilledIcon} />}
            >
              {data.badges.length === 0 ? (
                <EmptyState
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=150&height=150"
                  heading="No Badges Available"
                >
                  <Text as="p">
                    Please contact support. We will add badges for you.
                  </Text>
                </EmptyState>
              ) : (
                <InlineStack gap="200" wrap>
                  {data.badges.map((badge) => (
                    <div
                      className="hover:scale-105 rounded-full cursor-pointer hover:drop-shadow-xl"
                      onClick={() => selectBadge(badge)}
                      key={badge}
                    >
                      <img
                        src={`/api/files/${badge}`}
                        height="52px"
                        width="52px"
                        alt="badge"
                      />
                    </div>
                  ))}
                </InlineStack>
              )}
            </ShadowBevelBox>

            <ShadowBevelBox
              title="Your Uploads"
              className="mt-4"
              icon={<Icon source={Icons.UploadIcon} />}
            >
              <>
                {data.uploads.length === 0 ? (
                  <Box
                    background="bg-surface-caution"
                    paddingInlineStart="200"
                    paddingBlockStart="200"
                    paddingInlineEnd="200"
                    paddingBlockEnd="200"
                    borderRadius="050"
                    as="section"
                  >
                    <Text as="p" alignment="center">
                      Upload badges, and they will appear here.
                    </Text>
                  </Box>
                ) : (
                  <InlineStack gap="300" wrap>
                    {data.uploads.map((badge) => (
                      <div
                        key={badge}
                        className="group rounded-md hover:opacity-80 relative"
                      >
                        <div
                          className="group-hover:scale-105 rounded-full group-hover:drop-shadow-xl"
                          key={badge}
                        >
                          <img
                            src={`/api/files/${badge}`}
                            height="52px"
                            width="52px"
                            alt="badge"
                          />
                        </div>
                        <div
                          onClick={() => deleteBadge(badge)}
                          className=" cursor-pointer absolute invisible bottom-0 right-0 group-hover:visible bg-white shadow-lg rounded-md hover:scale-105"
                        >
                          <Icon source={Icons.DeleteIcon} tone="critical" />
                        </div>
                      </div>
                    ))}
                  </InlineStack>
                )}

                <Box paddingBlockStart="600">
                  <DropZone
                    errorOverlayText="File type must be .gif, .jpg, .png, or .svg and size must be less than 800kb"
                    accept={validImageTypes.join(',')}
                    customValidator={validateImage}
                    onDropAccepted={upload}
                    type="image"
                  >
                    <DropZone.FileUpload actionTitle="Upload your Badge" />
                  </DropZone>
                </Box>
              </>
            </ShadowBevelBox>
          </Layout.Section>

          <Layout.Section variant="oneHalf">
            <ShadowBevelBox
              title="Preview"
              icon={<Icon source={Icons.ViewIcon} />}
            >
              {state.selected.size === 0 ? (
                <Box
                  background="bg-surface-caution"
                  paddingInlineStart="200"
                  paddingBlockStart="200"
                  paddingInlineEnd="200"
                  paddingBlockEnd="200"
                  borderRadius="050"
                  as="section"
                >
                  <Text as="p" alignment="center">
                    No Badges selected yet.
                  </Text>
                </Box>
              ) : (
                <InlineStack gap="200" align="center">
                  {selectedArr.map((badge) => (
                    <div key={badge} className=" rounded-full  ">
                      <img
                        src={`/api/files/${badge}`}
                        height="52px"
                        width="52px"
                        alt="badge"
                      />
                    </div>
                  ))}
                </InlineStack>
              )}
            </ShadowBevelBox>

            <ShadowBevelBox
              title="Placement"
              className="mt-4"
              icon={<Icon source={Icons.DragDropIcon} />}
            >
              <InlineGrid gap="400" columns="repeat(1, minmax(0, 1fr))">
                <Box
                  background="bg-surface-secondary"
                  borderColor="transparent"
                  borderStyle="solid"
                  borderRadius="200"
                  borderWidth="050"
                  paddingBlockEnd="300"
                  paddingBlockStart="300"
                  paddingInlineStart="300"
                  paddingInlineEnd="300"
                >
                  <BlockStack inlineAlign="start" gap="200">
                    <Text as="p" fontWeight="bold" variant="bodyMd">
                      Place this app using Shopify Editor
                    </Text>

                    <Text as="p" variant="bodyMd">
                      Choose where to show the app on your store, using the
                      native Theme Editor. Click{' '}
                      <span className="italic font-bold">Add section</span> or{' '}
                      <span className="italic font-bold">Add block</span> then
                      find the app you need.
                    </Text>

                    <Button
                      url={`https://${data.domain}/admin/themes/current/editor`}
                      external={'true' as any}
                      icon={Icons.LinkIcon}
                      target="_blank"
                    >
                      Go to editor
                    </Button>
                  </BlockStack>
                </Box>
              </InlineGrid>
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
                    thumbnail="https://img.youtube.com/vi/fvj-t8-hGvg/maxresdefault.jpg"
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
                  Learn how to use Trust Badges and get the most out of it.
                  Check our Help Center for more information.
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
                  We're here to help you get the most out of Trust Badges. If
                  you have any questions, please contact us.
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
