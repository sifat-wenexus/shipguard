import { PaginatedResourceList } from '~/components/paginated-resource-list';
import type { IncludeSimplified, SalesCampaignState } from '../types';
import { CollectionLoader } from '~/components/collection-loader';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
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

interface CollectionsSummaryProps {
  formState: FormState<SalesCampaignState>;
  generateInclude: (
    serial?: number,
    products?: string[],
    collections?: string[]
  ) => IncludeSimplified;
}

export const CollectionsSummary: FC<CollectionsSummaryProps> = ({
  formState,
  generateInclude,
}) => {
  const state = formState.state;
  const [include] = state.includes;

  const includedCollections = useMemo(
    () => state.includes.map((i) => i.collections).flat(1),
    [state.includes]
  );

  const excludedCollections = useMemo(
    () => state.excludes.map((i) => i.collections).flat(1),
    [state.excludes]
  );

  const toggleCollection = useCallback(
    (id: string) => {
      const changes: Partial<SalesCampaignState> = {};

      if (state.rangeType === 'ALL_PRODUCTS_SAME_DISCOUNT') {
        const includes = Array.from(state.includes);
        const collections = Array.from(includedCollections);
        const index = collections.indexOf(id);

        if (index > -1) {
          collections.splice(index, 1);
        } else {
          collections.push(id);
        }

        includes[0] = {
          ...include,
          collections,
        };

        changes.includes = includes;
      } else {
        const includes = Array.from(state.includes);
        const index = includes.findIndex((i) => i.collections.includes(id));

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

      formState.addChange(changes);
    },
    [
      state.rangeType,
      state.includes,
      formState,
      include,
      includedCollections,
      generateInclude,
    ]
  );

  if (includedCollections.length === 0 || include.all) {
    return null;
  }

  return (
    <ShadowBevelBox
      icon={<Icon source={Icons.CollectionListIcon} />}
      title="Collections"
      className="mt-4"
    >
      <CollectionLoader
        ids={includedCollections}
        args={{pageSize: 200}}
        renderItems={(data, loading) => {
          return (
            <PaginatedResourceList
              loading={!data || loading}
              resourceName="collections"
              items={data ?? []}
              empty={null}
              pageSize={6}
              renderItem={(item) => {
                const excluded = excludedCollections.includes(item.id);

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
                            : Icons.CollectionListIcon
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
                            toggleCollection(item.id);
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
          );
        }}
      />
    </ShadowBevelBox>
  );
};
