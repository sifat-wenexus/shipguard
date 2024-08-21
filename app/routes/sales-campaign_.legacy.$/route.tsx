import { CollectionsSummary } from '~/routes/sales-campaign_.legacy.$/components/collections-summary';
import { ProductsSummary } from '~/routes/sales-campaign_.legacy.$/components/products-summary';
import { timezoneRowToResourceItem } from '~/modules/utils/timezone-row-to-resource-item';
import { Include } from '~/routes/sales-campaign_.legacy.$/components/include';
import type { DateTimePickerValue } from '~/components/date-time-picker';
import { shopify as shopifyRemix } from '../../modules/shopify.server';
import { ExcludeUniversal } from './components/exclude-universal';
import { useBetterNavigate } from '~/hooks/use-better-navigate';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { ScrollIntoView } from '~/components/scroll-into-view';
import { DateTimePicker } from '~/components/date-time-picker';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { queryProxy } from '~/modules/query/query-proxy';
import { useLoaderData, Form } from '@remix-run/react';
import { useFormState } from '~/hooks/use-form-state';
import { HelpModal } from '~/components/help-modal';
import type { Unpacked } from '~/types/type-utils';
import { MainNav } from '~/components/main-nav';
import * as Icons from '@shopify/polaris-icons';
import { SaveBar } from '~/components/save-bar';
import { Summary } from './components/summary';
import { useCallback, useMemo } from 'react';
import { json } from '@remix-run/node';
import style from './styles/route.css';
import _ from 'lodash';

import {
  getDateTimeLocalValue,
  DateWithTimezone,
} from '~/modules/utils/date-utils';

import {
  FormLayout,
  ChoiceList,
  TextField,
  Checkbox,
  Divider,
  Button,
  Layout,
  Select,
  Banner,
  Badge,
  Page,
  Grid,
  Icon,
  Box,
  Text,
} from '@shopify/polaris';

import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  LinksFunction,
} from '@remix-run/node';

import type {
  SalesCampaignDiscountType,
  SalesCampaignRangeType,
  SalesCampaignInclude,
  SalesCampaignExclude,
  SalesCampaign,
  ContentStatus,
} from '#prisma-client';

import type {
  SalesCampaignState,
  ExcludeSimplified,
  IncludeSimplified,
} from '~/routes/sales-campaign_.legacy.$/types';

import {
  getCampaignStatusBadgeProps,
  getCampaignStatus,
} from '~/routes/sales-campaign._index/modules/campaign-status';

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  let state: SalesCampaignState;

  try {
    state = JSON.parse(data.get('state') as string);
  } catch (e) {
    return json(
      {
        success: false,
        message: 'State is required',
      },
      {
        status: 400,
      }
    );
  }

  const ctx = await shopifyRemix.authenticate.admin(request);

  return queryProxy
    .$transaction(
      (trx) =>
        new Promise(async (resolve) => {
          let campaign: SalesCampaign;

          if (!state.id) {
            campaign = await trx.salesCampaign.create(
              {
                data: {
                  name: state.title,
                  createCollection: state.createCollection,
                  rangeType: state.rangeType,
                  startDate: state.startDate
                    ? new Date(state.startDate)
                    : new Date(),
                  endDate: state.endDate ? new Date(state.endDate) : undefined,
                  startDateTimezoneId: state.startTimeZone.id,
                  endDateTimezoneId: state.endTimeZone.id,
                  status: state.status,
                },
              },
              {
                session: ctx.session,
              }
            );
          } else {
            campaign = await trx.salesCampaign.update(
              {
                where: {
                  id: state.id,
                },
                data: {
                  name: state.title,
                  createCollection: state.createCollection,
                  status: state.status,
                  rangeType: state.rangeType,
                  startDate: state.startDate
                    ? new Date(state.startDate)
                    : new Date(),
                  endDate: state.endDate ? new Date(state.endDate) : undefined,
                  startDateTimezoneId: state.startTimeZone.id,
                  endDateTimezoneId: state.endTimeZone.id,
                },
              },
              {
                session: ctx.session,
              }
            );
          }

          const includesToCreate = state.includes.filter((si) => !si.id);
          const includesToUpdate = state.includes.filter((si) => si.id);
          const includesToUpdateIds = new Set(
            includesToUpdate.map((si) => si.id)
          );
          const includesToCreateOrUpdate =
            includesToCreate.concat(includesToUpdate);

          const excludesToCreate = state.excludes.filter((se) => !se.id);
          const excludesToUpdate = state.excludes.filter((se) => se.id);
          const excludesToUpdateIds = new Set(
            excludesToUpdate.map((se) => se.id)
          );
          const excludesToCreateOrUpdate =
            excludesToCreate.concat(excludesToUpdate);

          await new Promise(async (resolve) => {
            const includes = await trx.salesCampaignInclude.findMany(
              {
                pageSize: 1000,
                where: {
                  campaignId: campaign.id,
                },
              },
              ctx.session
            );

            includes.addListener(async (data) => {
              const includesToDelete = data.filter(
                (i) => !includesToUpdateIds.has(i.id)
              );

              await trx.salesCampaignInclude.deleteMany(
                {
                  where: {
                    id: {
                      in: includesToDelete.map((i) => i.id),
                    },
                  },
                },
                {
                  session: ctx.session,
                }
              );

              if (includes.hasNext) {
                return includes.next();
              }

              return resolve(undefined);
            });
          });

          await new Promise(async (resolve) => {
            const excludes = await trx.salesCampaignExclude.findMany(
              {
                pageSize: 1000,
                where: {
                  campaignId: campaign.id,
                },
              },
              ctx.session
            );

            excludes.addListener(async (data) => {
              const excludesToDelete = data.filter(
                (e) => !excludesToUpdateIds.has(e.id)
              );

              await trx.salesCampaignExclude.deleteMany(
                {
                  where: {
                    id: {
                      in: excludesToDelete.map((e) => e.id),
                    },
                  },
                },
                {
                  session: ctx.session,
                }
              );

              if (excludes.hasNext) {
                return excludes.next();
              }

              return resolve(undefined);
            });
          });

          if (includesToCreateOrUpdate.length > 0) {
            await Promise.all(
              includesToCreateOrUpdate.map(
                (includeSimplified) =>
                  new Promise<SalesCampaignInclude>(async (resolve) => {
                    const include = await trx.salesCampaignInclude[
                      includeSimplified.id ? 'update' : 'create'
                    ](
                      {
                        data: {
                          productVendors: includeSimplified.productVendors,
                          discountValue: includeSimplified.discountValue,
                          discountType: includeSimplified.discountType,
                          productTypes: includeSimplified.productTypes,
                          productTags: includeSimplified.productTags,
                          campaignId: campaign.id,
                          allProducts: includeSimplified.all,
                          name: includeSimplified.name,
                        },
                      },
                      {
                        session: ctx.session,
                      }
                    );

                    if (includeSimplified.id) {
                      await trx.salesCampaignInclude.update({
                        where: {
                          id: includeSimplified.id,
                        },
                        data: {
                          Collections: {
                            set: [],
                          },
                          Products: {
                            set: [],
                          },
                        },
                      });
                    }

                    let collectionsFinished = false;
                    let productsFinished = false;

                    const collections = await trx.collection.findMany({
                      pageSize: 1000,
                      where: {
                        id: {
                          in: includeSimplified.collections,
                        },
                      },
                      select: {
                        id: true,
                      },
                    });
                    const products = await trx.product.findMany({
                      pageSize: 1000,
                      where: {
                        id: {
                          in: includeSimplified.products,
                        },
                      },
                      select: {
                        id: true,
                      },
                    });

                    collections.addListener(async (data) => {
                      await trx.salesCampaignInclude.update({
                        where: {
                          id: include.id,
                        },
                        data: {
                          Collections: {
                            connect: data.map((c) => ({
                              id: c.id,
                            })),
                          },
                        },
                      });

                      if (collections.hasNext) {
                        return collections.next();
                      }

                      collectionsFinished = true;

                      if (productsFinished) {
                        resolve(include);
                      }
                    });

                    products.addListener(async (data) => {
                      await trx.salesCampaignInclude.update({
                        where: {
                          id: include.id,
                        },
                        data: {
                          Products: {
                            connect: data.map((p) => ({
                              id: p.id,
                            })),
                          },
                        },
                      });

                      if (products.hasNext) {
                        return products.next();
                      }

                      productsFinished = true;

                      if (collectionsFinished) {
                        resolve(include);
                      }
                    });
                  })
              )
            );
          }

          if (excludesToCreateOrUpdate.length > 0) {
            await Promise.all(
              excludesToCreateOrUpdate.map(
                (excludeSimplified) =>
                  new Promise<SalesCampaignExclude>(async (resolve) => {
                    const exclude = await trx.salesCampaignExclude[
                      excludeSimplified.id ? 'update' : 'create'
                    ](
                      {
                        data: {
                          productVendors: excludeSimplified.productVendors,
                          productTypes: excludeSimplified.productTypes,
                          productTags: excludeSimplified.productTags,
                          campaignId: campaign.id,
                        },
                      },
                      {
                        session: ctx.session,
                      }
                    );

                    if (excludeSimplified.id) {
                      await trx.salesCampaignExclude.update({
                        where: {
                          id: excludeSimplified.id,
                        },
                        data: {
                          Collections: {
                            set: [],
                          },
                          Products: {
                            set: [],
                          },
                          Variants: {
                            set: [],
                          },
                        },
                      });
                    }

                    let collectionsFinished = false;
                    let productsFinished = false;
                    let variantsFinished = false;

                    const collections = await trx.collection.findMany({
                      pageSize: 1000,
                      where: {
                        id: {
                          in: excludeSimplified.collections,
                        },
                      },
                      select: {
                        id: true,
                      },
                    });

                    const products = await trx.product.findMany({
                      pageSize: 1000,
                      where: {
                        id: {
                          in: excludeSimplified.products,
                        },
                      },
                      select: {
                        id: true,
                      },
                    });

                    const variants = await trx.productVariant.findMany({
                      pageSize: 1000,
                      where: {
                        id: {
                          in: excludeSimplified.productVariants,
                        },
                      },
                      select: {
                        id: true,
                      },
                    });

                    collections.addListener(async (data) => {
                      await trx.salesCampaignExclude.update({
                        where: {
                          id: exclude.id,
                        },
                        data: {
                          Collections: {
                            connect: data.map((c) => ({
                              id: c.id,
                            })),
                          },
                        },
                      });

                      if (collections.hasNext) {
                        return collections.next();
                      }

                      collectionsFinished = true;

                      if (productsFinished && variantsFinished) {
                        resolve(exclude);
                      }
                    });

                    products.addListener(async (data) => {
                      await trx.salesCampaignExclude.update({
                        where: {
                          id: exclude.id,
                        },
                        data: {
                          Products: {
                            connect: data.map((p) => ({
                              id: p.id,
                            })),
                          },
                        },
                      });

                      if (products.hasNext) {
                        return products.next();
                      }

                      productsFinished = true;

                      if (collectionsFinished && variantsFinished) {
                        resolve(exclude);
                      }
                    });

                    variants.addListener(async (data) => {
                      await trx.salesCampaignExclude.update({
                        where: {
                          id: exclude.id,
                        },
                        data: {
                          Variants: {
                            connect: data.map((p) => ({
                              id: p.id,
                            })),
                          },
                        },
                      });

                      if (variants.hasNext) {
                        return variants.next();
                      }

                      variantsFinished = true;

                      if (collectionsFinished && productsFinished) {
                        resolve(exclude);
                      }
                    });
                  })
              )
            );
          }

          if (state.id) {
            return resolve(
              json({
                success: true,
                message: 'Campaign updated successfully',
              })
            );
          }

          return resolve(
            json({
              success: true,
              message: 'Campaign created successfully',
              navigation: {
                to: '/sales-campaign',
                options: {
                  replace: true,
                },
              },
            })
          );
        }),
      {
        maxWait: 30000,
        timeout: 30000,
      }
    )
    .catch((e) => {
      console.error(e);

      return json(
        {
          success: false,
          message: 'Something went wrong. Please try again.',
        },
        {
          status: 500,
        }
      );
    });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const ctx = await shopifyRemix.authenticate.admin(request);

  const store = await queryProxy.store.findFirst(
    {
      select: {
        Timezone: true,
      },
    },
    ctx.session
  );

  const defaultTimezone = store?.Timezone;

  if (!defaultTimezone) {
    throw new Response(null, {
      status: 500,
      statusText: `Couldn't find the store's timezone`,
    });
  }

  if (params['*'] === 'create') {
    return json({
      campaign: null,
      defaultTimezone,
    });
  }

  const isDuplicate = params['*']?.startsWith('duplicate/');
  let campaignId: number;

  if (isDuplicate) {
    const id = params['*']!.split('/')[1];

    if (!id) {
      throw new Response(null, {
        status: 404,
        statusText: `Couldn't find what you are looking`,
      });
    }

    campaignId = parseInt(id, 10);
  } else {
    campaignId = Number(params['*']);
  }

  if (isNaN(campaignId)) {
    throw new Response(null, {
      status: 404,
      statusText: `Couldn't find what you are looking`,
    });
  }

  const campaign = await queryProxy.salesCampaign.findFirst(
    {
      where: {
        id: campaignId,
      },
      include: {
        StartDateTimeZone: true,
        EndDateTimeZone: true,
        Excludes: {
          include: {
            Collections: {
              select: {
                id: true,
              },
            },
            Products: {
              select: {
                id: true,
              },
            },
            Variants: {
              select: {
                id: true,
              },
            },
          },
        },
        Includes: {
          include: {
            Collections: {
              select: {
                id: true,
              },
            },
            Products: {
              select: {
                id: true,
              },
            },
            Excludes: {
              include: {
                Collections: {
                  select: {
                    id: true,
                  },
                },
                Products: {
                  select: {
                    id: true,
                  },
                },
                Variants: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    },
    ctx.session
  );

  if (!campaign) {
    throw new Response(null, {
      status: 404,
      statusText: `Couldn't find the campaign you're looking for.`,
    });
  }

  if (isDuplicate) {
    campaign.name = `${campaign.name} (Copy)`;
    campaign.startDate = new Date();
    campaign.status = 'PUBLISHED';
    (campaign as any).id = null;
    campaign.endDate = null;
  }

  return json({
    defaultTimezone,
    campaign,
  });
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];

export default function Route() {
  const { campaign, defaultTimezone } = useLoaderData<typeof loader>();
  const fetcher = useBetterFetcher();
  const navigate = useBetterNavigate();

  const status = useMemo(
    () => (campaign?.id ? getCampaignStatus(campaign) : null),
    [campaign]
  );

  const badgeProps = useMemo(() => {
    if (!status) {
      return null;
    }

    return getCampaignStatusBadgeProps(status);
  }, [status]);

  const readOnly = useMemo(() => status === 'Ended', [status]);

  const saleTypes = useMemo(
    () => [
      {
        id: 'ALL_PRODUCTS_SAME_DISCOUNT' as SalesCampaignRangeType,
        value: 'ALL_PRODUCTS_SAME_DISCOUNT' as SalesCampaignRangeType,
        label: 'Same discount for all products',
        helpText: 'All products will have the same discount',
      },
      {
        id: 'DIFFERENT_DISCOUNTS_PER_GROUP' as SalesCampaignRangeType,
        value: 'DIFFERENT_DISCOUNTS_PER_GROUP' as SalesCampaignRangeType,
        label: 'Different discount for each group of products',
        helpText: 'Each group of products will have a different discount',
      },
    ],
    []
  );

  const discountTypes = useMemo(
    () => [
      {
        label: 'Percentage',
        value: 'PERCENTAGE',
      },
      {
        label: 'Amount off',
        value: 'AMOUNT_OFF',
      },
    ],
    []
  );

  const generateExclude = useCallback(
    () =>
      ({
        id: null,
        productVendors: [],
        productTypes: [],
        productTitle: [],
        productTags: [],
        collections: [],
        products: [],
        productVariants: [],
      } as ExcludeSimplified),
    []
  );

  const generateInclude = useCallback(
    (
      serial = 1,
      products: string[] = [],
      collections: string[] = [],
      all = false
    ) =>
      ({
        id: null,
        name: `Group ${serial}`,
        discountType: 'PERCENTAGE',
        discountValue: '',
        collections,
        products,
        all,
        productTypes: [],
        productTags: [],
        productVendors: [],
        productTitle: [],
        excludes: [generateExclude()],
      } as IncludeSimplified),
    [generateExclude]
  );

  const initialState = useMemo<SalesCampaignState>(() => {
    type ExcludeType = Unpacked<
      Unpacked<Exclude<typeof campaign, null>['Includes']>['Excludes']
    >;
    type IncludeType = Unpacked<Exclude<typeof campaign, null>['Includes']>;

    const mapExcludes = (e: ExcludeType) =>
      ({
        id: e.id as number | null,
        productVendors: e.productVendors,
        productTypes: e.productTypes,
        productTags: e.productTags,
        collections: e.Collections.map((c) => c.id),
        products: e.Products.map((p) => p.id),
        productVariants: e.Variants.map((p) => p.id),
      } as ExcludeSimplified);

    const mapIncludes = (i: IncludeType) =>
      ({
        id: i.id as number | null,
        name: i.name ?? '',
        discountType:
          i.discountType ?? ('PERCENTAGE' as SalesCampaignDiscountType),
        discountValue: i.discountValue ?? '',
        all: i.allProducts,
        productVendors: i.productVendors,
        productTypes: i.productTypes,
        productTags: i.productTags,
        collections: i.Collections.map((c) => c.id),
        products: i.Products.map((p) => p.id),
        excludes: i.Excludes.map(mapExcludes),
      } as IncludeSimplified);

    const includes: IncludeSimplified[] =
      campaign?.Includes.map(mapIncludes) ?? [];

    if (includes.length === 0) {
      includes.push(generateInclude(1, [], [], true));
    }

    const excludes: ExcludeSimplified[] =
      campaign?.Excludes.map(mapExcludes) ?? [];

    if (excludes.length === 0) {
      excludes.push(generateExclude());
    }

    return {
      id: (campaign?.id ?? null) as number | null,
      title: campaign?.name ?? '',
      createCollection: campaign?.createCollection ?? false,
      currentIncludeIndex: 0,
      currentExcludeIndex: 0,
      status: campaign?.status ?? 'PUBLISHED',
      startDate: campaign?.startDate
        ? getDateTimeLocalValue(new Date(campaign.startDate))
        : undefined,
      endDate: campaign?.endDate
        ? getDateTimeLocalValue(new Date(campaign.endDate))
        : undefined,
      startTimeZone: timezoneRowToResourceItem(
        campaign?.StartDateTimeZone ?? defaultTimezone
      ),
      endTimeZone: timezoneRowToResourceItem(
        campaign?.EndDateTimeZone ?? defaultTimezone
      ),
      rangeType:
        campaign?.rangeType ??
        ('ALL_PRODUCTS_SAME_DISCOUNT' as SalesCampaignRangeType),
      includes,
      excludes,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign, defaultTimezone, generateInclude]);

  const formState = useFormState<SalesCampaignState>(initialState, readOnly, {
    title: {
      target: 'staged',
      validate: (value: string) => {
        if (value === '') {
          return {
            type: 'error',
            message: 'Title is required',
          };
        }
      },
    },
    startDate: {
      target: 'state',
      validate: (value: string, state) => {
        if (value === initialState.startDate) {
          return;
        }

        const startDate = new DateWithTimezone(state.startTimeZone.id, value);

        if (Date.now() > startDate.getTime()) {
          return {
            type: 'error',
            message: 'Start time must be in the future or present',
          };
        }

        if (!state.endDate) {
          return;
        }

        const endDate = new DateWithTimezone(
          state.endTimeZone.id,
          state.endDate
        );

        if (endDate.getTime() < startDate.getTime()) {
          return {
            type: 'error',
            message: 'Start time must be before end time',
          };
        }
      },
    },
    endDate: {
      target: 'state',
      validate: (value: string, state) => {
        if (value === initialState.endDate) {
          return;
        }

        const endDate = new DateWithTimezone(state.endTimeZone.id, value);

        if (Date.now() >= endDate.getTime()) {
          return {
            type: 'error',
            message: 'End time must be in the future',
          };
        }

        if (!state.startDate) {
          return;
        }

        const startDate = new DateWithTimezone(
          state.startTimeZone.id,
          state.startDate
        );

        if (endDate.getTime() < startDate.getTime()) {
          return {
            type: 'error',
            message: 'End time must be after start time',
          };
        }
      },
    },
    'includes.*.discountValue': {
      target: 'staged',
      validate: (value: string) => {
        if (value === '' || value === '0') {
          return {
            type: 'error',
            message: 'Discount value is required',
          };
        }
      },
    },
  });
  const { state, staged } = formState;

  const include = useMemo(
    () => state.includes[state.currentIncludeIndex],
    [state.currentIncludeIndex, state.includes]
  );

  const includeStaged = useMemo(
    () => staged.includes[state.currentIncludeIndex],
    [state.currentIncludeIndex, staged.includes]
  );

  const setRangeType = useCallback(
    (choice: string[]) => {
      const rangeType = choice[0] as SalesCampaignRangeType;

      formState.addChange({
        rangeType,
        currentIncludeIndex: 0,
        includes: [
          {
            ...generateInclude(),
            discountType: 'PERCENTAGE',
            discountValue: '0',
            all: rangeType === 'ALL_PRODUCTS_SAME_DISCOUNT',
          },
        ],
      });

      formState.clearMessages('includes');
    },
    [formState, generateInclude]
  );

  const setDiscountType = useCallback(
    (discountType: SalesCampaignDiscountType) => {
      const includes = _.clone(state.includes);

      includes[state.currentIncludeIndex] = {
        ...includes[state.currentIncludeIndex],
        discountType,
      };

      formState.addChange({
        includes,
      });
    },
    [state.currentIncludeIndex, formState, state.includes]
  );

  const setDiscountValue = useCallback(
    (value: string) => {
      const includes = _.clone(state.includes);

      includes[state.currentIncludeIndex] = {
        ...includes[state.currentIncludeIndex],
        discountValue: value,
      };

      formState.addToStaged({
        includes,
      });
    },
    [state.currentIncludeIndex, formState, state.includes]
  );

  const setStartDate = useCallback(
    (value: DateTimePickerValue) => {
      formState.addChange(
        {
          startDate: value.date,
          startTimeZone: value.timezone,
        },
        'startDate',
        'endDate'
      );
    },
    [formState]
  );

  const setEndDate = useCallback(
    (value: DateTimePickerValue) => {
      formState.addChange(
        {
          endDate: value.date,
          endTimeZone: value.timezone,
        },
        'endDate',
        'startDate'
      );
    },
    [formState]
  );

  const toggleAllProducts = useCallback(
    (all: boolean) => {
      const includes = _.clone(state.includes);
      includes[state.currentIncludeIndex] = {
        ...includes[state.currentIncludeIndex],
        all,
      };

      if (all) {
        includes[state.currentIncludeIndex].collections = [];
        includes[state.currentIncludeIndex].products = [];
      }

      formState.addChange({
        includes: includes,
      });
    },
    [state.currentIncludeIndex, formState, state.includes]
  );

  const save = useCallback(async () => {
    const formData = new FormData();

    formData.append('state', JSON.stringify(state));

    try {
      await fetcher.submit(undefined, formData, {
        method: 'POST',
        navigate: true,
      });
    } catch (e) {
      console.error(e);
    }
  }, [fetcher, state]);

  return (
    <>
      <MainNav />

      <SaveBar formState={formState} onSave={save} />

      <Page
        subtitle="Create sales campaigns and manage discounts by collections, products, or your entire store."
        backAction={{ onAction: () => navigate('/sales-campaign', -1) }}
        titleMetadata={badgeProps ? <Badge {...badgeProps} /> : undefined}
        title="Sales Campaign & Discount"
      >
        {status === 'Ended' ? (
          <div className="mb-4">
            <Banner
              title="Sales Campaign ended"
              tone="warning"
              secondaryAction={{
                content: 'Duplicate this campaign',
              }}
            >
              <Text as="p">
                This sales campaign has ended. You can no longer make changes to
                it. Duplicate this campaign to create a similar one.
              </Text>
            </Banner>
          </div>
        ) : null}

        <Layout>
          <Layout.Section variant="oneHalf">
            <Form method="post">
              <ShadowBevelBox
                icon={<Icon source={Icons.InfoIcon} />}
                title="Basic Information"
              >
                <FormLayout>
                  <TextField
                    onChange={(title) => formState.addToStaged({ title })}
                    onBlur={() => formState.commitStaged('title')}
                    helpText="We'll use this title to create a collection."
                    error={formState.messages.title?.message}
                    value={staged.title}
                    autoComplete="yes"
                    label="Title"
                  />

                  <Checkbox
                    checked={state.createCollection}
                    label="Create Collection"
                    onChange={(createCollection) =>
                      formState.addChange({ createCollection })
                    }
                  />
                </FormLayout>
              </ShadowBevelBox>

              <ShadowBevelBox
                icon={<Icon source={Icons.CategoriesIcon} />}
                title="Sale Type"
                className="mt-4"
              >
                <ChoiceList
                  selected={[state.rangeType]}
                  onChange={setRangeType}
                  choices={saleTypes}
                  title="Sale Type"
                  titleHidden
                />
              </ShadowBevelBox>

              {state.rangeType === 'ALL_PRODUCTS_SAME_DISCOUNT' ? (
                <ShadowBevelBox
                  icon={<Icon source={Icons.DiscountIcon} />}
                  title="Discount"
                  className="mt-4"
                >
                  <FormLayout>
                    <FormLayout.Group>
                      <Select
                        value={include.discountType}
                        onChange={setDiscountType}
                        options={discountTypes}
                        label="Discount Type"
                      />

                      <ScrollIntoView
                        value={
                          !!formState.messages['includes.0.discountValue']
                            ?.message
                        }
                      >
                        <TextField
                          onBlur={() =>
                            formState.commitStaged({
                              path: 'includes.*.discountValue',
                              indexes: [0],
                            })
                          }
                          prefix={
                            include.discountType === 'PERCENTAGE' ? '%' : 'USD'
                          }
                          error={
                            formState.messages['includes.0.discountValue']
                              ?.message
                          }
                          value={includeStaged.discountValue}
                          onChange={setDiscountValue}
                          label="Discount Value"
                          autoComplete="no"
                          type="number"
                          min={0}
                        />
                      </ScrollIntoView>
                    </FormLayout.Group>
                  </FormLayout>
                </ShadowBevelBox>
              ) : null}

              <Include
                onDiscountTypeChange={(_, type) => setDiscountType(type)}
                onDiscountValueChange={(_, value) => setDiscountValue(value)}
                includeIndex={state.currentIncludeIndex}
                onRangeTypeChange={toggleAllProducts}
                generateInclude={generateInclude}
                formState={formState}
              />

              {state.rangeType === 'ALL_PRODUCTS_SAME_DISCOUNT' ||
              !state.includes.some((i) => i.products.length > 0) ? (
                <ExcludeUniversal formState={formState} />
              ) : null}

              <ShadowBevelBox
                icon={<Icon source={Icons.CalendarIcon} />}
                title="Schedule"
                className="mt-4"
              >
                <FormLayout>
                  <ScrollIntoView
                    value={!!formState.messages.startDate?.message}
                  >
                    <DateTimePicker
                      disabled={status === 'Running' || status === 'Processing'}
                      error={formState.messages.startDate?.message}
                      onChange={setStartDate}
                      label="Starts At"
                      value={{
                        timezone: state.startTimeZone,
                        date: state.startDate,
                      }}
                    />
                  </ScrollIntoView>

                  <ScrollIntoView value={!!formState.messages.endDate?.message}>
                    <DateTimePicker
                      error={formState.messages.endDate?.message}
                      onChange={setEndDate}
                      label="Ends At"
                      value={{
                        timezone: state.endTimeZone,
                        date: state.endDate,
                      }}
                    />
                  </ScrollIntoView>
                </FormLayout>
              </ShadowBevelBox>
            </Form>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            {campaign?.status === 'DRAFT' || state.id === null ? (
              <ShadowBevelBox
                icon={<Icon source={Icons.NoteIcon} />}
                className="mb-4"
                title="Status"
              >
                <Select
                  onChange={(status: ContentStatus) =>
                    formState.addChange({ status })
                  }
                  value={state.status}
                  label="Status"
                  labelHidden
                  options={[
                    {
                      key: 'published',
                      value: 'PUBLISHED',
                      label: 'Published',
                      title: 'Published',
                    },
                    {
                      key: 'draft',
                      value: 'DRAFT',
                      label: 'Draft',
                      title: 'Draft',
                    },
                  ]}
                />
              </ShadowBevelBox>
            ) : null}

            <Summary state={state} />

            <CollectionsSummary
              generateInclude={generateInclude}
              formState={formState}
            />

            <ProductsSummary
              generateInclude={generateInclude}
              formState={formState}
            />
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
