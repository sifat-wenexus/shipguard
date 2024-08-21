import type {
  FilterValues,
  ResourceArgs,
  ResourceItem,
} from '~/components/resource-select';
import { ResourceSelectMini } from '~/components/resource-select-mini';
import { Box, Popover, TextField } from '@shopify/polaris';
import { useCallback, useState } from 'react';
import type { Prisma } from '#prisma-client';
import type { FC } from 'react';

export interface TagSelectProps {
  onChange: (value: string[]) => void;
  multiple?: boolean;
  labelHidden?: boolean;
  value?: string[];
  label: string;
}

export const TagSelectMini: FC<TagSelectProps> = (props) => {
  const [active, setActive] = useState(false);

  const onChange = useCallback(
    (value: ResourceItem<'productTag', ResourceArgs<'productTag'>>[]) => {
      props.onChange(value.map((v) => v.tag));
    },
    [props]
  );

  const getSearchConditions = useCallback((search: string) => {
    const stringFilter: Prisma.StringFilter = {
      contains: search,
      mode: 'insensitive',
    };

    return {
      tag: stringFilter,
    } satisfies FilterValues<'productTag'>;
  }, []);

  return (
    <Popover
      onClose={() => setActive(false)}
      preferInputActivator
      active={active}
      activator={
        <TextField
          value={props.value?.join(', ') ?? ''}
          onFocus={() => setActive(true)}
          labelHidden={props.labelHidden}
          label={props.label}
          autoComplete="off"
          type="text"
        />
      }
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Box padding="300">
          <ResourceSelectMini
            getTitle={(item) => item.tag}
            getId={(item) => item.tag}
            getSearchConditions={getSearchConditions}
            value={props.value ?? []}
            multiple={props.multiple}
            resource="productTag"
            onChange={onChange}
            autoSelect
            resourceName={{
              plural: 'Tags',
              singular: 'Tag',
            }}
          />
        </Box>
      </div>
    </Popover>
  );
};
