import { ResourceSelectMini } from '~/components/resource-select-mini';
import { Box, Popover, TextField } from '@shopify/polaris';
import { useCallback, useState } from 'react';
import type { FC } from 'react';

import type {
  FilterValues,
  ResourceArgs,
  ResourceItem,
} from '~/components/resource-select';

export interface ProductTypeSelectProps {
  onChange: (value: string[]) => void;
  labelHidden?: boolean;
  multiple?: boolean;
  value?: string[];
  label: string;
}

export const ProductTypeSelectMini: FC<ProductTypeSelectProps> = (props) => {
  const [active, setActive] = useState(false);

  const onChange = useCallback(
    (value: ResourceItem<'productType', ResourceArgs<'productType'>>[]) => {
      props.onChange(value.map((v) => v.productType));
    },
    [props]
  );

  const getSearchConditions = useCallback((search: string) => {
    return {
      productType: {
        contains: search,
        mode: 'insensitive',
      },
    } satisfies FilterValues<'productType'>;
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
            getTitle={(item) => item.productType}
            getId={(item) => item.productType}
            getSearchConditions={getSearchConditions}
            value={props.value ?? []}
            multiple={props.multiple}
            resource="productType"
            onChange={onChange}
            autoSelect
            resourceName={{
              singular: 'ProductType',
              plural: 'ProductTypes',
            }}
          />
        </Box>
      </div>
    </Popover>
  );
};
