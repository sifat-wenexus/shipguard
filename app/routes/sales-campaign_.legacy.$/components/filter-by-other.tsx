import type { FC, PropsWithChildren } from 'react';
import type { ButtonProps } from '@shopify/polaris';
import { useState } from 'react';

import {
  BlockStack,
  Popover,
  Button,
  Select,
  Box,
  Text,
} from '@shopify/polaris';
import { TagSelectMini } from '~/components/tag-select-mini';
import { VendorSelectMini } from '~/components/vendor-select-mini';
import { ProductTypeSelectMini } from '~/components/product-type-select-mini';

type FilterByOtherType = 'vendor' | 'tag' | 'type';

interface FilterByOtherProps extends PropsWithChildren {
  onChange(type: FilterByOtherType, value: string): void;

  disabled?: boolean;
  buttonLabel: string;
  buttonTone: ButtonProps['tone'];
}

export const FilterByOther: FC<FilterByOtherProps> = ({
  onChange,
  buttonLabel,
  buttonTone,
  disabled,
}) => {
  const [type, setType] = useState<FilterByOtherType>();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover
      onClose={() => setVisible(false)}
      activator={
        <div className="include-exclude-button">
          <Button
            onClick={() => setVisible(true)}
            disabled={disabled}
            variant="primary"
            tone={buttonTone}
            size="large"
          >
            {buttonLabel}
          </Button>
        </div>
      }
      preferInputActivator
      preventFocusOnClose
      active={visible}
    >
      <Box padding="400">
        <BlockStack gap="300" inlineAlign="stretch">
          <Select
            value={type as string | undefined}
            label="Select all products where"
            placeholder="Select a filter"
            onChange={(value) => {
              setType(value as FilterByOtherType);
              setValue('');
            }}
            options={[
              {
                label: 'Product Vendor',
                value: 'vendor',
              },
              {
                label: 'Product Type',
                value: 'type',
              },
              {
                label: 'Product Tag',
                value: 'tag',
              },
            ]}
          />

          {type === null ? null : (
            <>
              <Text as="span">is</Text>

              {type === 'tag' ? (
                <TagSelectMini
                  onChange={([value]) => setValue(value)}
                  multiple={false}
                  value={[value]}
                  label="Tags"
                  labelHidden
                />
              ) : type === 'vendor' ? (
                <VendorSelectMini
                  onChange={([value]) => setValue(value)}
                  multiple={false}
                  value={[value]}
                  label="Vendors"
                  labelHidden
                />
              ) : (
                <ProductTypeSelectMini
                  onChange={([value]) => setValue(value)}
                  label="Product Types"
                  multiple={false}
                  value={[value]}
                  labelHidden
                />
              )}

              <Button
                onClick={() => onChange(type!, value)}
                disabled={value === ''}
              >
                Add filter
              </Button>
            </>
          )}
        </BlockStack>
      </Box>
    </Popover>
  );
};
