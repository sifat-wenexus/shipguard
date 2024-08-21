import { Box, Divider, FormLayout, Icon } from '@shopify/polaris';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { SettingsIcon } from '@shopify/polaris-icons';
import ProductSKUSelect from '../product-sku-select';
import { useMemo, useState } from 'react';
import Radio from '~/components/radio';
import ExclusionProductsAndVariants from './exclusion-products-and-variants';

const SpecialSettings = ({ formState }) => {
  let fulfillmentList = useMemo(
    () =>
      [
        {
          label: 'Mark as fulfilled when first item(s) are fulfilled',
          selected: true,
        },
        {
          label: 'Mark as fulfilled when other items fulfilled',
          selected: false,
        },
        {
          label: 'Mark as fulfilled immediately after purchase',
          selected: false,
        },
      ].map((item) =>
        item.label === formState.state.insuranceFulfillmentStatus
          ? { ...item, selected: true }
          : { ...item, selected: false }
      ),
    []
  );

  const [fulfillmentArray, setFulfillmentArray] = useState(fulfillmentList);

  const handleMarkSelect = (index: number) => {
    setFulfillmentArray((prev) =>
      prev.map((item, i) => {
        if (index === i) {
          formState.addChange({ insuranceFulfillmentStatus: item.label });
          return {
            ...item,
            selected: true,
          };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };
  return (
    <ShadowBevelBox
      icon={<Icon source={SettingsIcon} />}
      title="Special settings"
      className="my-4"
    >
      <FormLayout>
        <FormLayout.Group>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <b>Insurance default display status</b>
            <Radio
              onChange={() =>
                formState.addChange({ insuranceDisplayButton: true })
              }
              checked={formState.staged.insuranceDisplayButton}
              label="Default enabled"
              id="Selected"
              type="radio"
            />
            <Radio
              onChange={() =>
                formState.addChange({ insuranceDisplayButton: false })
              }
              checked={!formState.staged.insuranceDisplayButton}
              label="Default off"
              id="Unselected"
              type="radio"
            />
          </Box>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <b>Digital insurance product fulfillment status</b>
            {fulfillmentArray.map((item, index) => (
              <Radio
                onChange={() => handleMarkSelect(index)}
                // formState.addToStaged({ displayButton: true })
                onBlur={() => formState.commitStaged()}
                checked={item.selected}
                label={item.label}
                id={index + 'mark'}
                type="radio"
              />
            ))}
          </Box>
          <Divider />
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <p className="mb-2">
              <b>Exclusions</b>
            </p>
            <Box paddingBlockEnd="200">
              Set conditions to exclude application of insurance widget.
            </Box>

            {/* <ProductSKUSelect formState={formState} />
            <p>nested items</p> */}
            <ExclusionProductsAndVariants formState={formState} />
          </Box>{' '}
        </FormLayout.Group>
      </FormLayout>
    </ShadowBevelBox>
  );
};

export default SpecialSettings;
