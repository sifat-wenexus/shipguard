import { CampaignActions } from '~/routes/sales-campaign._index/components/campaign-actions';
import type { IndexTableProps } from '@shopify/polaris/build/ts/src/components/IndexTable';
import type { BulkAction } from '@shopify/polaris/build/ts/src/components/BulkActions';
import { useQueryPaginated } from '~/hooks/use-query-paginated';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { DateWithTimezone } from '~/modules/utils/date-utils';
import { ConfirmDialog } from '~/components/confirm-dialog';
import { queryProxy } from '~/modules/query/query-proxy';
import { useCallback, useMemo, useRef } from 'react';
import type { LinksFunction } from '@remix-run/node';
import { HelpModal } from '~/components/help-modal';
import { MainNav } from '~/components/main-nav';
import * as Icons from '@shopify/polaris-icons';
import { useNavigate } from '@remix-run/react';

import style from './styles/route.css';

import {
  useIndexResourceState,
  useBreakpoints,
  EmptyState,
  IndexTable,
  Divider,
  Button,
  Badge,
  Grid,
  Card,
  Page,
  Text,
  Box,
} from '@shopify/polaris';
import {
  getCampaignStatus,
  getCampaignStatusBadgeProps,
} from '~/routes/sales-campaign._index/modules/campaign-status';
import { useI18n } from '@shopify/react-i18n';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];

export default function App() {
  const confirmDialog = useRef<ConfirmDialog>(null);
  const navigate = useNavigate();
  const [i18n] = useI18n();
  const pageSize = 10;

  const defaultFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en', {
        day: 'numeric',
        year: '2-digit',
        month: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
      }),
    []
  );

  const query = useMemo(
    () =>
      queryProxy.salesCampaign.subscribeFindMany({
        pageSize,
        where: {
          status: {
            not: 'ARCHIVED',
          },
        },
        include: {
          StartDateTimeZone: true,
          EndDateTimeZone: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    []
  );

  const subscription = useQueryPaginated(query);

  const formatters = useMemo(() => {
    if (!subscription.data) {
      return null;
    }

    const uniqueTimeZones = new Set(
      subscription.data.map((campaign) => campaign.StartDateTimeZone.id)
    );

    const formatters: Record<string, Intl.DateTimeFormat> = {};

    for (const timeZone of uniqueTimeZones) {
      formatters[timeZone] = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        year: '2-digit',
        month: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone,
      });
    }

    return formatters;
  }, [subscription.data]);

  const campaigns = useMemo(() => {
    if (!subscription.data) {
      return [];
    }

    return subscription.data.map((campaign) => {
      const startDate = new Date(campaign.startDate);
      const endDate = campaign.endDate ? new Date(campaign.endDate) : null;

      return {
        ...campaign,
        id: campaign.id.toString(),
        startDate: (
          formatters?.[campaign.StartDateTimeZone.id] ?? defaultFormatter
        )?.format(startDate),
        endDate: endDate
          ? (
              formatters?.[campaign.StartDateTimeZone.id] ?? defaultFormatter
            ).format(endDate)
          : null,
        statusUpdatedAt: campaign.statusUpdatedAt
          ? defaultFormatter.format(new Date(campaign.statusUpdatedAt))
          : null,
        status: getCampaignStatus(campaign),
      };
    });
  }, [defaultFormatter, formatters, subscription.data]);

  const {
    handleSelectionChange,
    allResourcesSelected,
    selectedResources,
    clearSelection,
  } = useIndexResourceState(campaigns);

  const resourceName = useMemo(
    () => ({
      singular: 'Campaign',
      plural: 'Campaigns',
    }),
    []
  );

  const headings = useMemo<IndexTableProps['headings']>(
    () => [
      {
        title: 'Name',
        key: 'name',
      },
      {
        title: 'Revenue',
        key: 'revenue',
      },
      {
        title: 'Schedule',
        key: 'schedule',
      },
      {
        title: 'Status',
        key: 'status',
      },
      {
        title: '',
        key: 'actions',
      },
    ],
    []
  );

  const deleteCampaigns = useCallback(async (...ids: number[]) => {
    const confirmed = await confirmDialog.current?.confirm();

    if (!confirmed) {
      return;
    }

    try {
      shopify.loading(true);

      await queryProxy.salesCampaign.deleteMany({
        where: {
          id: {
            in: ids.map((id) => Number(id)),
          },
        },
      });

      shopify.toast.show(`${ids.length} campaign(s) deleted successfully.`);
    } catch (e) {
      console.error(e);

      shopify.toast.show('Something went wrong. Please try again.', {
        isError: true,
      });
    } finally {
      shopify.loading(false);
    }
  }, []);
  const updateStatus = useCallback(async (id: number, action: string) => {
    shopify.loading(true);

    try {
      await queryProxy.salesCampaign.update({
        where: {
          id,
        },
        data: {
          status:
            action === 'pause'
              ? 'DISABLED'
              : action === 'cancel'
              ? 'DRAFT'
              : action === 'resume'
              ? 'PUBLISHED'
              : 'ARCHIVED',
          statusUpdatedAt: new Date(),
        },
      });

      shopify.toast.show(
        `Campaign ${
          action === 'pause'
            ? 'paused'
            : action === 'cancel'
            ? 'canceled'
            : 'resumed'
        } successfully.`
      );
    } catch (e) {
      shopify.toast.show('Something went wrong. Please try again.', {
        isError: true,
      });
    } finally {
      shopify.loading(false);
    }
  }, []);
  const endCampaign = useCallback(
    async (id: number) => {
      const campaign = subscription.data?.find(
        (campaign) => campaign.id === id
      );

      if (!campaign) {
        return;
      }

      await queryProxy.salesCampaign.update({
        where: {
          id,
        },
        data: {
          endDate: new DateWithTimezone(campaign.endDateTimezoneId, new Date()),
        },
      });
    },
    [subscription.data]
  );
  const duplicateCampaign = useCallback(
    async (id: number) => {
      navigate(`/sales-campaign/legacy/duplicate/${id}`);
    },
    [navigate]
  );

  const handleCampaignAction = useCallback(
    async (id: number, action: string) => {
      if (action === 'edit') {
        return navigate(`/sales-campaign/legacy/${id}`);
      }

      if (action === 'delete') {
        return deleteCampaigns(id);
      }

      if (
        action === 'pause' ||
        action === 'resume' ||
        action === 'cancel' ||
        action === 'archive'
      ) {
        return updateStatus(id, action);
      }

      if (action === 'end') {
        return endCampaign(id);
      }

      if (action === 'duplicate') {
        return duplicateCampaign(id);
      }
    },
    [deleteCampaigns, duplicateCampaign, endCampaign, navigate, updateStatus]
  );

  const bulkActions: BulkAction[] = useMemo(
    () => [
      {
        id: 'delete',
        content: 'Delete',
        onAction: async () => {
          await deleteCampaigns(...selectedResources.map(Number));
          clearSelection();
        },
      },
    ],
    [clearSelection, deleteCampaigns, selectedResources]
  );

  const loading = subscription.loading || !formatters;
  const page = subscription.page ?? 1;
  const pages = subscription.pages ?? 0;
  const count = subscription.count ?? 0;
  const hasMoreItems = page * pageSize < count;

  const breakpoints = useBreakpoints();

  return (
    <>
      <MainNav />

      <ConfirmDialog
        content="Are you sure, you want to delete selected campaign(s)?"
        title="Confirm delete"
        ref={confirmDialog}
        primaryAction={{
          content: 'Delete',
          destructive: true,
        }}
        secondaryAction={{
          content: "Don't delete",
        }}
      />

      <Page
        subtitle="Create sales campaigns and manage discounts by collections, products, or your entire store."
        filterActions
        actionGroups={[
          {
            title: 'Actions',
            actions: [
              {
                content: 'Import',
                icon: Icons.ImportIcon,
              },
              {
                content: 'Export',
                icon: Icons.ExportIcon,
              },
            ],
          },
        ]}
        primaryAction={
          <Button
            url="/sales-campaign/legacy/create"
            icon={Icons.PlusIcon}
            variant="primary"
          >
            Create Campaign
          </Button>
        }
        backAction={{ onAction: () => navigate(-1) }}
        title="Sales Campaign & Discount"
      >
        <Card padding="0">
          <IndexTable
            onSelectionChange={handleSelectionChange}
            promotedBulkActions={bulkActions}
            condensed={breakpoints.smDown}
            hasMoreItems={hasMoreItems}
            resourceName={resourceName}
            bulkActions={bulkActions}
            headings={headings}
            loading={loading}
            itemCount={count}
            pagination={{
              onPrevious: subscription.previous,
              onNext: subscription.next,
              hasNext: hasMoreItems,
              hasPrevious: page > 1,
              label: (
                <span>
                  Showing{' '}
                  {pages === 1 ? (
                    `all ${campaigns.length}`
                  ) : (
                    <span>
                      {Math.min((page - 1) * pageSize + 1, count)} -{' '}
                      {Math.min(page * pageSize, count)} of{' '}
                      {Math.min(page * pageSize, campaigns.length ?? 0)} of{' '}
                      {count}
                    </span>
                  )}{' '}
                  Campaigns
                </span>
              ),
            }}
            lastColumnSticky
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            emptyState={
              loading ? (
                <></>
              ) : (
                <EmptyState
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=150&height=150"
                  heading="Create your first Campaign"
                  action={{
                    url: '/sales-campaign/legacy/create',
                    content: 'Create Campaign',
                    icon: Icons.PlusIcon,
                  }}
                >
                  <Text as="p">
                    You can create sales campaigns and manage discounts by
                    products, collections, tags, or your entire store with a few
                    clicks.
                  </Text>
                </EmptyState>
              )
            }
          >
            {campaigns.map((campaign, i) => (
              <IndexTable.Row
                selected={selectedResources.includes(campaign.id.toString())}
                id={campaign.id.toString()}
                key={campaign.id}
                rowType="data"
                position={i}
                onClick={() => {
                  navigate(`/sales-campaign/legacy/${campaign.id}`);
                }}
              >
                <IndexTable.Cell className="text-center">
                  {campaign.name}
                </IndexTable.Cell>
                <IndexTable.Cell className="text-center">
                  {i18n.formatCurrency(Number(campaign.revenue))}
                </IndexTable.Cell>
                <IndexTable.Cell className="text-center">
                  {campaign.status === 'Scheduled' ? (
                    <Badge
                      tone="enabled"
                      size="large"
                    >{`Starts at ${campaign.startDate}`}</Badge>
                  ) : campaign.status === 'Ended' ? (
                    <Badge
                      tone="read-only"
                      size="large"
                    >{`Ended at ${campaign.endDate}`}</Badge>
                  ) : campaign.status === 'Running' ? (
                    <Badge size="large" tone="info">
                      {campaign.endDate
                        ? `Ends at ${campaign.endDate}`
                        : `Never ends, unless manually ended`}
                    </Badge>
                  ) : campaign.status === 'Paused' ? (
                    <Badge size="large" tone="attention">
                      {`Paused at ${campaign.statusUpdatedAt}`}
                    </Badge>
                  ) : null}
                </IndexTable.Cell>
                <IndexTable.Cell className="text-center">
                  <Badge {...getCampaignStatusBadgeProps(campaign.status)} />
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <CampaignActions
                    status={campaign.status}
                    onAction={(action) =>
                      handleCampaignAction(Number(campaign.id), action)
                    }
                  />
                </IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
        </Card>

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
