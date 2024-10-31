import {
  reactExtension,
  Text,
  useApi,
  useApplyCartLinesChange,
  useCartLines,
  InlineStack,
  Switch,
  InlineLayout,
  View,
  ProductThumbnail,
  useShop,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';

export default reactExtension('purchase.checkout.block.render', () => (
  <Extension />
));

const Extension = () => {
  const applyCartLineChange = useApplyCartLinesChange();
  const cartLine = useCartLines();
  const shop = useShop();
  const { i18n } = useApi();

  const [variantId, setVariantId] = useState('');
  const [variantPrice, setVariantPrice] = useState();
  const [data, setData] = useState<any>({});
  const [hide, setHide] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(hide);
  const baseUrl = 'https://shipping-protection.wenexus.io';
  // const baseUrl = 'https://levitra-iowa-specialist-acer.trycloudflare.com';

  const totalAmount = cartLine
    .filter((item) => item.merchandise.sku !== 'wenexus-shipping-protection')
    .reduce((sum, item) => sum + item.cost.totalAmount.amount, 0);

  useEffect(() => {
    fetch(
      `${baseUrl}/checkout-extension?total=${totalAmount}&shopUrl=${
        shop?.myshopifyDomain
      }&cartLine=${JSON.stringify(cartLine)}`
    )
      .then((response) => response.json())
      .then((res) => {
        setVariantId(res.variantId);
        setVariantPrice(res.variantPrice);
        setData(res.data);
        setHide(res.hide);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const onCheckboxChange = async (isChecked) => {
    setLoading(true);
    if (isChecked) {
      setEnabled(true);
      await applyCartLineChange({
        type: 'addCartLine',
        quantity: 1,
        merchandiseId: variantId,
      });
      setLoading(false);
    } else {
      setEnabled(false);
      const cartLineId = cartLine.find(
        (e) => e.merchandise.id === variantId
      ).id;
      if (cartLineId) {
        await applyCartLineChange({
          type: 'removeCartLine',
          id: cartLineId,
          quantity: 10,
        });
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const lineItem = cartLine.find((line) => line.merchandise.id === variantId);
    if (lineItem) {
      setEnabled(true);
    }
  }, [cartLine, variantId]);

  if (hide) return null;

  return (
    <>
      <View border={'base'}>
        <InlineLayout columns={['20%', '65%', '15%']}>
          <View
            padding={'tight'}
            blockAlignment={'center'}
            inlineAlignment={'center'}
          >
            <ProductThumbnail source="https://cdn.shopify.com/s/files/1/0900/3221/0212/files/Inhouse_Shipping_Protection.png?v=1728361462" />
          </View>
          <View padding={'base'}>
            <InlineStack>
              <Text size="large">{data.title}</Text>
            </InlineStack>
            <Text size="small" appearance="subdued">
              {enabled ? data?.enabledDescription : data?.disabledDescription}
            </Text>
          </View>
          <View
            padding={'base'}
            blockAlignment={'center'}
            inlineAlignment={'center'}
          >
            <Switch
              disabled={loading}
              onChange={onCheckboxChange}
              value={enabled}
              accessibilityLabel="package-protection-switch"
            />
            <Text emphasis="bold">
              {i18n.formatCurrency(variantPrice ?? 0)}
            </Text>
          </View>
        </InlineLayout>
      </View>
    </>
  );
};
