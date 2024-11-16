import { ResourceSelect } from '~/components/resource-select';
import { ResourceList, Thumbnail } from '@shopify/polaris';
import type { FC, PropsWithChildren } from 'react';
import * as Icons from '@shopify/polaris-icons';
import type { Prisma } from '#prisma-client';
import { useCallback } from 'react';

import type {
  ResourceSelectProps,
  FilterValues,
} from '~/components/resource-select';

export interface CollectionSelectProps extends PropsWithChildren {
  innerWrapperElement?: ResourceSelectProps<'collection'>['innerWrapperElement'];
  disabledIds?: ResourceSelectProps<'collection'>['disabledIds'];
  className?: ResourceSelectProps<'collection'>['className'];
  onChange: ResourceSelectProps<'collection'>['onChange'];
  onOpen?: ResourceSelectProps<'collection'>['onOpen'];
  value: ResourceSelectProps<'collection'>['value'];
  where?: FilterValues<'collection'>;
  hideFilters?: string[];
  selectAll?: boolean;
  multiple?: boolean;
  verb?: string;
}

export const CollectionSelect: FC<CollectionSelectProps> = ({
  children,
  ...props
}) => {
  const getSearchConditions = useCallback((search: string) => {
    const stringFilter: Prisma.StringFilter = {
      contains: search,
      mode: 'insensitive',
    };

    return {
      OR: [
        { title: stringFilter },
        { Products: { some: { title: stringFilter } } },
      ],
    } satisfies FilterValues<'collection'>;
  }, []);

  return (
    <ResourceSelect
      getId={(item) => item.id}
      innerWrapperElement={props.innerWrapperElement}
      getSearchConditions={getSearchConditions}
      disabledIds={props.disabledIds}
      verb={props.verb ?? 'Select'}
      className={props.className}
      selectAll={props.selectAll}
      multiple={props.multiple}
      onChange={props.onChange}
      resource="collection"
      onOpen={props.onOpen}
      value={props.value}
      resourceName={{
        plural: 'Collections',
        singular: 'Collection',
      }}
      renderItem={(item, onItemClick) => (
        <ResourceList.Item
          verticalAlignment="center"
          onClick={onItemClick}
          name={item.title}
          id={item.id}
          media={
            <Thumbnail
              alt={item.title}
              size="small"
              source={
                item.featuredImage ? item.featuredImage : Icons.CollectionIcon
              }
            />
          }
        >
          {item.title}
        </ResourceList.Item>
      )}
    >
      {children}
    </ResourceSelect>
  );
};
