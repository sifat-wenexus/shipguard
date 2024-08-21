import type { ResourceListSelectedItems } from '@shopify/polaris/build/ts/src/utilities/resource-list/types';
import { FilterByOther } from '~/routes/sales-campaign_.legacy.$/components/filter-by-other';
import { IncludeProduct } from '~/routes/sales-campaign_.legacy.$/components/include-product';
import { PaginatedResourceList } from '~/components/paginated-resource-list';
import type { ResourceSelection } from '~/components/resource-select';
import { CollectionSelect } from '~/components/collection-select';
import { CollectionLoader } from '~/components/collection-loader';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { ProductLoader } from '~/components/product-loader';
import { ProductSelect } from '~/components/product-select';
import type { FormState } from '~/hooks/use-form-state';
import { useCallback, useMemo, useState } from 'react';
import * as Icons from '@shopify/polaris-icons';
import type { FC } from 'react';
import _ from 'lodash';

import {
  SkeletonBodyText,
  InlineStack,
  BlockStack,
  ChoiceList,
  Button,
  Icon,
  Text,
  Tag,
} from '@shopify/polaris';

import type {
  SalesCampaignState,
  IncludeSimplified,
} from '~/routes/sales-campaign_.legacy.$/types';
import { IncludeCollection } from '~/routes/sales-campaign_.legacy.$/components/include-collection';

export interface IncludeProps {
  formState: FormState<SalesCampaignState>;
  includeIndex: number;
  onRangeTypeChange: (all: boolean) => void;
  onDiscountValueChange?: (include: IncludeSimplified, value: string) => void;
  generateInclude: (
    serial?: number,
    products?: string[],
    collections?: string[]
  ) => IncludeSimplified;
  onDiscountTypeChange?: (
    include: IncludeSimplified,
    discountType: IncludeSimplified['discountType']
  ) => void;
}

export const Include: FC<IncludeProps> = ({
  formState,
  includeIndex,
  generateInclude,
  ...props
}) => {
  const { state } = formState;

  const [selectedIncludes, setSelectedIncludes] =
    useState<ResourceListSelectedItems>([]);

  const include = useMemo(
    () => state.includes[includeIndex],
    [includeIndex, state.includes]
  );

  const productIncludes = useMemo(
    () => state.includes.filter((i) => !i.all && i.products.length > 0),
    [state.includes]
  );

  const collectionIncludes = useMemo(
    () => state.includes.filter((i) => !i.all && i.collections.length > 0),
    [state.includes]
  );

  const includesProp = useMemo(
    () => (productIncludes.length > 0 ? 'products' : 'collections'),
    [productIncludes.length]
  );

  const productIdsIncluded = useMemo(
    () => new Set(productIncludes.map((include) => include.products).flat()),
    [productIncludes]
  );

  const includes = useMemo(
    () =>
      productIncludes
        .map((include) => ({
          type: 'product' as 'product' | 'collection',
          id: include.products[0],
          include,
        }))
        .concat(
          collectionIncludes.map((include) => ({
            type: 'collection' as 'product' | 'collection',
            id: include.collections[0],
            include,
          }))
        ),
    [collectionIncludes, productIncludes]
  );

  const includesReversed = useMemo(
    () => Array.from(includes).reverse(),
    [includes]
  );

  const includeCollections = useCallback(
    (selection: ResourceSelection) => {
      const includes = Array.from(state.includes);
      includes[includeIndex] = {
        ...include,
        collections: selection.selected as string[],
      };

      formState.addChange({
        includes,
      });
    },
    [state.includes, includeIndex, include, formState]
  );

  const includeProducts = useCallback(
    (selection: ResourceSelection) => {
      const includes = Array.from(state.includes);

      includes[includeIndex] = {
        ...include,
        products: selection.selected as string[],
      };

      formState.addChange({
        includes,
      });
    },
    [state.includes, includeIndex, include, formState]
  );

  const includeTags = useCallback(
    (tags: string[]) => {
      const includes = Array.from(state.includes);

      includes[includeIndex] = {
        ...include,
        productTags: tags,
      };

      formState.addChange({
        includes,
      });
    },
    [state.includes, includeIndex, include, formState]
  );

  const includeProductTypes = useCallback(
    (productTypes: string[]) => {
      const includes = Array.from(state.includes);

      includes[includeIndex] = {
        ...include,
        productTypes,
      };

      formState.addChange({
        includes,
      });
    },
    [state.includes, includeIndex, include, formState]
  );

  const includeVendors = useCallback(
    (productVendors: string[]) => {
      const includes = Array.from(state.includes);

      includes[includeIndex] = {
        ...include,
        productVendors,
      };

      formState.addChange({
        includes,
      });
    },
    [state.includes, includeIndex, include, formState]
  );

  const addProductCollectionInclude = useCallback(
    (ids: string[]) => {
      let includes = _.clone(state.includes);

      for (const id of ids) {
        const products = id.includes('gid://shopify/Product/') ? [id] : [];
        const collections = id.includes('gid://shopify/Collection/')
          ? [id]
          : [];

        includes.push(
          generateInclude(includes.length + 1, products, collections)
        );
      }

      includes = includes.filter(
        (i) => i.products.length > 0 || i.collections.length > 0
      );

      formState.addChange({
        currentIncludeIndex: includes.length - 1,
        includes,
      });

      return includes[includes.length - 1];
    },
    [formState, generateInclude, state.includes]
  );
  console.log('formState.state', formState.state);
  const deleteInclude = useCallback(
    (include: IncludeSimplified) => {
      const includes = _.clone(state.includes);

      const deleteIndex = state.includes.indexOf(include);

      includes.splice(deleteIndex, 1);

      if (includes.length === 0) {
        includes.push(generateInclude());
      }

      formState.addChange({
        currentIncludeIndex: deleteIndex === 0 ? 0 : deleteIndex - 1,
        includes,
      });
    },
    [formState, generateInclude, state.includes]
  );

  const deleteSelectedInclude = useCallback(() => {
    let includes = _.clone(state.includes);

    if (selectedIncludes === 'All') {
      includes.splice(0, includes.length);
    } else {
      const ids = new Set(selectedIncludes);

      includes = includes.filter((include) => {
        if (include[includesProp].length === 0) {
          return true;
        }

        return !ids.has(include[includesProp][0]);
      });
    }

    if (includes.length === 0) {
      includes.push(generateInclude());
    }

    formState.addChange({
      currentIncludeIndex: includes.length - 1,
      includes,
    });

    setSelectedIncludes([]);
  }, [
    formState,
    generateInclude,
    includesProp,
    selectedIncludes,
    state.includes,
  ]);

  const pageSize = useMemo(() => ({ pageSize: 100000 }), []);

  const AddProduct =
    collectionIncludes.length === 0 && !formState.readOnly ? (
      <ProductSelect
        disabledIds={productIdsIncluded}
        className="flex justify-center"
        innerWrapperElement="div"
        selectAll={false}
        value={[]}
        verb="Add"
        onOpen={() =>
          formState.patch({
            currentIncludeIndex: state.includes.length - 1,
          })
        }
        onChange={(s) =>
          addProductCollectionInclude(
            Array.isArray(s.selected) ? s.selected : [s.selected]
          )
        }
      >
        <Button icon={Icons.ProductAddIcon} variant="primary">
          Add Product
        </Button>
      </ProductSelect>
    ) : null;

  const AddCollection =
    productIncludes.length === 0 && !formState.readOnly ? (
      <CollectionSelect
        className="flex justify-center"
        innerWrapperElement="div"
        selectAll={false}
        value={[]}
        verb="Add"
        onOpen={() =>
          formState.patch({
            currentIncludeIndex: state.includes.length - 1,
          })
        }
        onChange={(s) =>
          addProductCollectionInclude(
            Array.isArray(s.selected) ? s.selected : [s.selected]
          )
        }
      >
        <Button icon={Icons.CollectionListIcon} variant="primary">
          Add Collection
        </Button>
      </CollectionSelect>
    ) : null;

  return (
    <ShadowBevelBox
      icon={<Icon source={Icons.ProductAddIcon} />}
      className="mt-4"
      title="Include"
      dividerBoxProps={
        state.rangeType === 'ALL_PRODUCTS_SAME_DISCOUNT'
          ? { paddingBlockEnd: '200' }
          : {}
      }
      actions={
        includes.length > 0 ? (
          <>
            {AddProduct}
            {AddCollection}
          </>
        ) : null
      }
    >
      {state.rangeType === 'ALL_PRODUCTS_SAME_DISCOUNT' ? (
        <BlockStack gap="300">
          {state.rangeType === 'ALL_PRODUCTS_SAME_DISCOUNT' ? (
            <ChoiceList
              selected={[include.all ? 'ALL' : 'SOME']}
              onChange={(choice) => {
                props.onRangeTypeChange(choice[0] === 'ALL');
              }}
              choices={[
                {
                  value: 'ALL',
                  label: 'All products',
                  helpText:
                    'All products except for excluded ones will be included.',
                },
                {
                  value: 'SOME',
                  label: 'Specific products or collections',
                  helpText:
                    'Only specific products or collections will be included.',
                },
              ]}
              titleHidden
              title=""
            />
          ) : null}

          {!include.all ? (
            <>
              <ProductSelect
                className="include-exclude-button"
                onChange={includeProducts}
                innerWrapperElement="div"
                value={include.products}
                selectAll={false}
                verb="Include"
              >
                <Button size="large" variant="primary" tone="success">
                  Include by Products
                </Button>
              </ProductSelect>

              <CollectionSelect
                className="include-exclude-button"
                onChange={includeCollections}
                value={include.collections}
                innerWrapperElement="div"
                selectAll={false}
                verb="Include"
              >
                <Button size="large" variant="primary" tone="success">
                  Include by Collections
                </Button>
              </CollectionSelect>

              <FilterByOther
                buttonLabel="Include by Tags, Vendors, and Product Types"
                buttonTone="success"
                onChange={(type, value) => {
                  switch (type) {
                    case 'tag':
                      includeTags(
                        Array.from(new Set(include.productTags.concat(value)))
                      );
                      break;
                    case 'vendor':
                      includeVendors(
                        Array.from(
                          new Set(include.productVendors.concat(value))
                        )
                      );
                      break;
                    case 'type':
                      includeProductTypes(
                        Array.from(new Set(include.productTypes.concat(value)))
                      );
                      break;
                  }
                }}
              />

              <InlineStack gap="200" wrap>
                {include.productTags.map((tag) => (
                  <Tag
                    key={`tag-${tag}`}
                    onRemove={() => {
                      const tags = Array.from(include.productTags);
                      tags.splice(tags.indexOf(tag), 1);
                      includeTags(tags);
                    }}
                  >
                    Product Tag is{' '}
                    <Text as="span" fontWeight="bold">
                      {tag}
                    </Text>
                  </Tag>
                ))}

                {include.productVendors.map((vendor) => (
                  <Tag
                    onRemove={() => {
                      const vendors = Array.from(include.productVendors);
                      vendors.splice(vendors.indexOf(vendor), 1);
                      includeVendors(vendors);
                    }}
                    key={`vendor-${vendor}`}
                  >
                    Vendor is{' '}
                    <Text as="span" fontWeight="bold">
                      {vendor}
                    </Text>
                  </Tag>
                ))}

                {include.productTypes.map((type) => (
                  <Tag
                    onRemove={() => {
                      const types = Array.from(include.productTypes);
                      types.splice(types.indexOf(type), 1);
                      includeProductTypes(types);
                    }}
                    key={`vendor-${type}`}
                  >
                    Product Type is{' '}
                    <Text as="span" fontWeight="bold">
                      {type}
                    </Text>
                  </Tag>
                ))}

                {include.products.length > 0 ? (
                  <ProductLoader
                    ids={include.products}
                    args={pageSize}
                    renderItems={(data, loading) => {
                      if (loading || !data) {
                        return (
                          <SkeletonBodyText
                            lines={include.products.length / 3}
                          />
                        );
                      }

                      return data.map((item) => (
                        <Tag
                          key={`product-${item.id}`}
                          onRemove={() => {
                            const products = Array.from(include.products);
                            products.splice(products.indexOf(item.id), 1);
                            includeProducts({
                              selected: products,
                              total: products.length,
                            });
                          }}
                        >
                          Product:{' '}
                          <Text as="span" fontWeight="bold">
                            {item.title}
                          </Text>
                        </Tag>
                      ));
                    }}
                  />
                ) : null}

                {include.collections.length > 0 ? (
                  <CollectionLoader
                    ids={include.collections}
                    args={pageSize}
                    renderItems={(data) => {
                      if (!data) {
                        return (
                          <SkeletonBodyText
                            lines={include.collections.length / 3}
                          />
                        );
                      }

                      return data.map((item) => (
                        <Tag
                          key={`collection-${item.id}`}
                          onRemove={() => {
                            const collections = Array.from(include.collections);
                            collections.splice(collections.indexOf(item.id), 1);
                            includeCollections({
                              selected: collections,
                              total: collections.length,
                            });
                          }}
                        >
                          Collection:{' '}
                          <Text as="span" fontWeight="bold">
                            {item.title}
                          </Text>
                        </Tag>
                      ));
                    }}
                  />
                ) : null}
              </InlineStack>
            </>
          ) : null}
        </BlockStack>
      ) : (
        <PaginatedResourceList
          emptyStateText="Add Products or Collections to set discounts."
          onSelectionChange={setSelectedIncludes}
          selected={selectedIncludes}
          items={includesReversed}
          resourceName={includesProp}
          pageSize={5}
          promotedBulkActions={[
            {
              onAction: deleteSelectedInclude,
              icon: Icons.DeleteIcon,
              content: 'Delete',
              id: 'delete',
            },
          ]}
          renderItem={(item) => {
            const Component =
              item.type === 'product' ? IncludeProduct : IncludeCollection;

            return (
              <Component
                onDiscountValueChange={props.onDiscountValueChange}
                onDiscountTypeChange={props.onDiscountTypeChange}
                onDelete={deleteInclude}
                formState={formState}
                {...item}
                onFocus={(include) =>
                  formState.patch({
                    currentIncludeIndex: state.includes.indexOf(include),
                  })
                }
              />
            );
          }}
          empty={
            !formState.readOnly ? (
              <BlockStack gap="200" align="start" inlineAlign="center">
                {AddProduct}

                <Text as="p">Or</Text>

                {AddCollection}
              </BlockStack>
            ) : null
          }
        />
      )}
    </ShadowBevelBox>
  );
};
