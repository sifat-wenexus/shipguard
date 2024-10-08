import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  useApi,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
  useTotalAmount,
  useCartLineTarget,
  useApplyCartLinesChange,
  useCartLines,
  ToggleButton,
  ToggleButtonGroup,
  InlineStack,
  Button,
  Image,
  Switch,
  InlineLayout,
  View,
  ProductThumbnail,
  useAppMetafields,
  useMetafields,
  useShop,
} from '@shopify/ui-extensions-react/checkout';
import { useState } from 'react';

// 1. Choose an extension target
export default reactExtension('purchase.checkout.block.render', () => (
  <Extension />
));

const variantId = 'gid://shopify/ProductVariant/42769606967389';
const Extension = () => {
  const applyCartLineChange = useApplyCartLinesChange();
  const cartLine = useCartLines();
  const shop = useShop();
  const totalAmount = cartLine
    .filter((item) => item.merchandise.sku !== 'wenexus-shipping-protection')
    .reduce((sum, item) => sum + item.cost.totalAmount.amount, 0);
  console.log('first', totalAmount, shop);
  fetch(
    `https://existed-ext-magnet-tahoe.trycloudflare.com/test?total=${totalAmount}&shopUrl=${shop.myshopifyDomain}`
  )
    .then((response) => response.json())
    .then((res) => console.log({ res }))
    .catch((err) => console.log({ err }));

  const onCheckboxChange = (isChecked) => {
    if (isChecked) {
      applyCartLineChange({
        type: 'addCartLine',
        quantity: 1,
        merchandiseId: variantId,
      });
    } else {
      const cartLineId = cartLine.find(
        (e) => e.merchandise.id === variantId
      ).id;
      if (cartLineId) {
        applyCartLineChange({
          type: 'removeCartLine',
          id: cartLineId,
          quantity: 1,
        });
      }
    }
  };

  return (
    <InlineLayout columns={['fill', '20%']}>
      <InlineStack blockAlignment={'center'}>
        <ProductThumbnail source="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Inhouse_Shipping_Protection.png?v=1728361462" />
        <BlockStack>
          <Text size="large">Package Protection</Text>
          <Text size="small">Description</Text>
        </BlockStack>
      </InlineStack>
      <View padding={'loose'}>
        <Switch
          onChange={onCheckboxChange}
          accessibilityLabel="package-protection-switch"
        />
      </View>
    </InlineLayout>
  );
};
