import { FilterByOther } from '~/routes/sales-campaign_.legacy.$/components/filter-by-other';
import type { ResourceSelection } from '~/components/resource-select';
import { CollectionSelect } from '~/components/collection-select';
import { CollectionLoader } from '~/components/collection-loader';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { ProductSelect } from '~/components/product-select';
import { ProductLoader } from '~/components/product-loader';
import type { FormState } from '~/hooks/use-form-state';
import type { SalesCampaignState } from '../types';
import * as Icons from '@shopify/polaris-icons';
import { useCallback, useMemo } from 'react';
import type { FC } from 'react';

import {
  SkeletonBodyText,
  InlineStack,
  BlockStack,
  Button,
  Text,
  Icon,
  Tag,
} from '@shopify/polaris';

export interface ExcludeUniversalProps {
  formState: FormState<SalesCampaignState>;
}

export const ExcludeUniversal: FC<ExcludeUniversalProps> = ({ formState }) => {
  const { state } = formState;
  const [exclude] = state.excludes;

  const excludeProducts = useCallback(
    (selection: ResourceSelection) => {
      formState.addChange({
        excludes: [
          {
            ...exclude,
            products: selection.selected as string[],
          },
        ],
      });
    },
    [formState, exclude]
  );

  const excludeCollections = useCallback(
    (selection: ResourceSelection) => {
      formState.addChange({
        excludes: [
          {
            ...exclude,
            collections: Array.isArray(selection.selected)
              ? selection.selected
              : [selection.selected],
          },
        ],
      });
    },
    [exclude, formState]
  );

  const excludeTags = useCallback(
    (tags: string[]) => {
      formState.addChange({
        excludes: [
          {
            ...state.excludes[0],
            productTags: tags,
          },
        ],
      });
    },
    [state.excludes, formState]
  );

  const excludeProductTypes = useCallback(
    (productTypes: string[]) => {
      formState.addChange({
        excludes: [
          {
            ...state.excludes[0],
            productTypes,
          },
        ],
      });
    },
    [state.excludes, formState]
  );

  const excludeVendors = useCallback(
    (productVendors: string[]) => {
      formState.addChange({
        excludes: [
          {
            ...state.excludes[0],
            productVendors,
          },
        ],
      });
    },
    [state.excludes, formState]
  );

  const pageSize = useMemo(() => ({ pageSize: 100000 }), []);

  return (
    <ShadowBevelBox
      icon={<Icon source={Icons.ProductRemoveIcon} />}
      dividerBoxProps={{ paddingBlockEnd: '200' }}
      className="mt-4"
      title="Exclude"
    >
      <BlockStack gap="300">
        {!formState.readOnly ? (
          <>
            <ProductSelect
              className="include-exclude-button"
              onChange={excludeProducts}
              value={exclude.products}
              verb="Exclude"
            >
              <Button size="large" variant="primary" tone="critical">
                Exclude by Products
              </Button>
            </ProductSelect>

            <CollectionSelect
              className="include-exclude-button"
              onChange={excludeCollections}
              value={exclude.collections}
              innerWrapperElement="div"
              verb="Exclude"
            >
              <Button size="large" variant="primary" tone="critical">
                Exclude by Collections
              </Button>
            </CollectionSelect>

            <FilterByOther
              onChange={(type, value) => {
                const exclude = state.excludes[0];

                switch (type) {
                  case 'tag':
                    excludeTags(
                      Array.from(new Set(exclude.productTags.concat(value)))
                    );
                    break;
                  case 'vendor':
                    excludeVendors(
                      Array.from(new Set(exclude.productVendors.concat(value)))
                    );
                    break;
                  case 'type':
                    excludeProductTypes(
                      Array.from(new Set(exclude.productTypes.concat(value)))
                    );
                    break;
                }
              }}
              buttonLabel="Exclude by Tags, Vendors, and Product Types"
              buttonTone="critical"
            />
          </>
        ) : null}

        <InlineStack gap="200" wrap>
          {exclude.productTags.map((tag) => (
            <Tag
              key={`tag-${tag}`}
              onRemove={() => {
                const tags = Array.from(exclude.productTags);
                tags.splice(tags.indexOf(tag), 1);
                excludeTags(tags);
              }}
            >
              Product Tag is{' '}
              <Text as="span" fontWeight="bold">
                {tag}
              </Text>
            </Tag>
          ))}

          {exclude.productVendors.map((vendor) => (
            <Tag
              onRemove={() => {
                const vendors = Array.from(exclude.productVendors);
                vendors.splice(vendors.indexOf(vendor), 1);
                excludeVendors(vendors);
              }}
              key={`vendor-${vendor}`}
            >
              Product Vendor is{' '}
              <Text as="span" fontWeight="bold">
                {vendor}
              </Text>
            </Tag>
          ))}

          {exclude.productTypes.map((type) => (
            <Tag
              onRemove={() => {
                const types = Array.from(exclude.productTypes);
                types.splice(types.indexOf(type), 1);
                excludeProductTypes(types);
              }}
              key={`vendor-${type}`}
            >
              Product Type is{' '}
              <Text as="span" fontWeight="bold">
                {type}
              </Text>
            </Tag>
          ))}

          {exclude.products.length > 0 ? (
            <ProductLoader
              ids={exclude.products}
              args={pageSize}
              renderItems={(data, loading) => {
                if (loading || !data) {
                  return (
                    <SkeletonBodyText lines={exclude.products.length / 3} />
                  );
                }

                return data.map((item) => (
                  <Tag
                    key={`product-${item.id}`}
                    onRemove={() => {
                      const products = Array.from(exclude.products);
                      products.splice(products.indexOf(item.id), 1);
                      excludeProducts({
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

          {exclude.collections.length > 0 ? (
            <CollectionLoader
              ids={exclude.collections}
              args={pageSize}
              renderItems={(data) => {
                if (!data) {
                  return (
                    <SkeletonBodyText lines={exclude.collections.length / 3} />
                  );
                }

                return data.map((item) => (
                  <Tag
                    key={`collection-${item.id}`}
                    onRemove={() => {
                      const collections = Array.from(exclude.collections);
                      collections.splice(collections.indexOf(item.id), 1);
                      excludeCollections({
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
      </BlockStack>
    </ShadowBevelBox>
  );
};
