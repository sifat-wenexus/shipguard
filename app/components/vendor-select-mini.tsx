import { ResourceSelectMini } from '~/components/resource-select-mini';
import { Box, Popover, TextField } from '@shopify/polaris';
import { useCallback, useState } from 'react';
import type { Prisma } from '#prisma-client';
import type { FC } from 'react';

import type {
  FilterValues,
  ResourceArgs,
  ResourceItem,
} from '~/components/resource-select';

export interface VendorSelectProps {
  onChange: (value: string[]) => void;
  labelHidden?: boolean;
  multiple?: boolean;
  value?: string[];
  label: string;
}

export const VendorSelectMini: FC<VendorSelectProps> = (props) => {
  const [active, setActive] = useState(false);

  const onChange = useCallback(
    (value: ResourceItem<'productVendor', ResourceArgs<'productVendor'>>[]) => {
      props.onChange(value.map((v) => v.vendor));
    },
    [props]
  );

  const getSearchConditions = useCallback((search: string) => {
    const stringFilter: Prisma.StringFilter = {
      contains: search,
      mode: 'insensitive',
    };

    return {
      vendor: stringFilter,
    } satisfies FilterValues<'productVendor'>;
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
            getTitle={(item) => item.vendor}
            getId={(item) => item.vendor}
            getSearchConditions={getSearchConditions}
            value={props.value ?? []}
            multiple={props.multiple}
            resource="productVendor"
            onChange={onChange}
            autoSelect
            resourceName={{
              plural: 'Vendors',
              singular: 'Vendor',
            }}
          />
        </Box>
      </div>
    </Popover>
  );
};
