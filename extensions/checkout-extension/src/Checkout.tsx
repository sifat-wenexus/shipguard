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
} from '@shopify/ui-extensions-react/checkout';

// 1. Choose an extension target
export default reactExtension(
  'purchase.checkout.reductions.render-after',
  () => <Extension />
);

const variantId = 'gid://shopify/ProductVariant/43099286011951';
const Extension = () => {
  const applyCartLineChange = useApplyCartLinesChange();
  const cartLine = useCartLines();
  const onCheckboxChange = (isChecked) => {
    console.log('onCheckboxChange', isChecked);
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
  // return (
  //   <>
  //     hello
  //     <ToggleButtonGroup

  //       value="one"
  //       onChange={(value) => {
  //         console.log(`onChange event with value: ${value}`);
  //       }}
  //     >
  //       <ToggleButton id="none">None</ToggleButton>
  //     </ToggleButtonGroup>
  //   </>
  // );
  // return <p>hello </p>;
  return <Checkbox onChange={onCheckboxChange}>Package Protection</Checkbox>;
};
