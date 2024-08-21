import { PaginatedResourceList } from '~/components/paginated-resource-list';
import type { IncludeSimplified, SalesCampaignState } from '../types';
import type { ProductLoaderArgs } from '~/components/product-loader';
import type { ResourceArgs } from '~/components/resource-select';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { ProductLoader } from '~/components/product-loader';
import type { FormState } from '~/hooks/use-form-state';
import * as Icons from '@shopify/polaris-icons';
import { useCallback, useMemo } from 'react';
import type { FC } from 'react';

import {
  ResourceList,
  InlineStack,
  Thumbnail,
  Tooltip,
  Button,
  Text,
  Icon,
} from '@shopify/polaris';

interface ProductsSummaryProps {
  formState: FormState<SalesCampaignState>;
  generateInclude: (
    serial?: number,
    products?: string[],
    collections?: string[]
  ) => IncludeSimplified;
}

export const ProductsSummary: FC<ProductsSummaryProps> = ({
  formState,
  generateInclude,
}) => {
  const state = formState.state;
  const [include] = state.includes;
  const [exclude] = state.excludes;

  const includedProducts = useMemo(
    () => state.includes.map((i) => i.products).flat(1),
    [state.includes]
  );

  const excludedProducts = useMemo(
    () => state.excludes.map((i) => i.products).flat(1),
    [state.excludes]
  );

  const args = useMemo<ProductLoaderArgs>(() => {
    const where: ResourceArgs<'product'>['where'] = {
      OR: [
        {
          tags: {
            hasSome: include.productTags,
          },
        },
        {
          vendor: {
            in: include.productVendors,
          },
        },
        {
          productType: {
            in: include.productTypes,
          },
        },
        {
          Collections: {
            some: {
              id: {
                in: include.collections,
              },
            },
          },
        },
      ],
    };

    if (!include.all) {
      where.OR?.push({ id: { in: includedProducts } });
    }

    return {
      pageSize: 200,
      where,
    };
  }, [
    include.all,
    include.collections,
    include.productTags,
    include.productTypes,
    include.productVendors,
    includedProducts,
  ]);

  const toggleProduct = useCallback(
    (id: string) => {
      const changes: Partial<SalesCampaignState> = {};

      const includes = Array.from(state.includes);
      const includeProducts = Array.from(includedProducts);
      const includeIndex = includeProducts.indexOf(id);

      const excludes = Array.from(state.excludes);
      const excludeProducts = Array.from(excludedProducts);
      const excludeIndex = excludeProducts.indexOf(id);

      const included = includeIndex > -1;
      const excluded = excludeIndex > -1;

      if (state.rangeType === 'ALL_PRODUCTS_SAME_DISCOUNT') {
        if (!include.all) {
          if (included) {
            includeProducts.splice(includeIndex, 1);
          } else {
            if (excluded) {
              includeProducts.push(id);
              excludeProducts.splice(excludeIndex, 1);
            } else {
              excludeProducts.push(id);
            }
          }

          includes[0] = {
            ...include,
            products: includeProducts,
          };

          excludes[0] = {
            ...exclude,
            products: excludeProducts,
          };
        } else {
          if (excluded) {
            excludeProducts.splice(excludeIndex, 1);
          } else {
            excludeProducts.push(id);
          }

          excludes[0] = {
            ...exclude,
            products: excludeProducts,
          };
        }
      } else {
        const index = includes.findIndex((i) => i.products.includes(id));

        if (index === -1) {
          return;
        }

        includes.splice(index, 1);

        if (includes.length === 0) {
          includes.push(generateInclude());
        }

        changes.includes = includes;
        changes.currentIncludeIndex = includes.length === 1 ? 0 : index - 1;
      }

      changes.includes = includes;
      changes.excludes = excludes;

      formState.addChange(changes);
    },
    [
      includedProducts,
      generateInclude,
      excludedProducts,
      state.rangeType,
      state.includes,
      state.excludes,
      formState,
      include,
      exclude,
    ]
  );

  return (
    <ProductLoader
      args={args}
      renderItems={(data, loading) => {
        if (!data) {
          return null;
        }

        return (
          <ShadowBevelBox
            icon={<Icon source={Icons.ProductListIcon} />}
            title="Products"
            className="mt-4"
          >
            <PaginatedResourceList
              resourceName="products"
              items={data ?? []}
              loading={loading}
              pageSize={8}
              empty={null}
              renderItem={(item) => {
                const excluded = excludedProducts.includes(item.id);

                return (
                  <ResourceList.Item
                    verticalAlignment="center"
                    onClick={console.log}
                    name={item.title}
                    id={item.id}
                    media={
                      <Thumbnail
                        source={
                          item.featuredImage
                            ? item.featuredImage
                            : Icons.ProductListIcon
                        }
                        alt={item.title}
                        size="small"
                      />
                    }
                  >
                    <InlineStack blockAlign="center" align="space-between">
                      <Text
                        textDecorationLine={
                          excluded ? 'line-through' : undefined
                        }
                        as="span"
                      >
                        {item.title}
                      </Text>

                      <Tooltip content={excluded ? 'Include' : 'Exclude'}>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleProduct(item.id);
                          }}
                        >
                          <Button
                            tone={excluded ? 'success' : 'critical'}
                            icon={
                              <Icon
                                source={
                                  excluded ? Icons.PlusIcon : Icons.DeleteIcon
                                }
                              />
                            }
                          />
                        </div>
                      </Tooltip>
                    </InlineStack>
                  </ResourceList.Item>
                );
              }}
            />
          </ShadowBevelBox>
        );
      }}
    />
  );
};
