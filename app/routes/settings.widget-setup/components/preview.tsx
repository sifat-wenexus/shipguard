import { hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { InfoIcon, ViewIcon } from '@shopify/polaris-icons';
import { Box, Divider, Icon, Link } from '@shopify/polaris';
import { packageIcons } from './package-icons';
import ProductCard from './product-preview';

const Preview = ({ formState }) => {
  const selectedIcon = packageIcons.find(
    (i) => i.id === formState?.state?.icon
  );
  return (
    <div className="sm:ml-4">
      <div className="sm:mt-12"></div>
      <ShadowBevelBox icon={<Icon source={ViewIcon} />} title="Preview">
        <ProductCard card={1} />
        <div className="mt-4"></div>
        <ProductCard card={2} />
        <Box paddingBlockStart={'200'} paddingBlockEnd={'200'}>
          <Divider />
        </Box>
        <Box paddingBlockStart={'200'} paddingBlockEnd={'200'}>
          <div className="flex items-center justify-around gap-2">
            <div className="">{selectedIcon && <selectedIcon.icon />}</div>
            <div className="w-full">
              <span className="flex items-center break-words">
                <h5 className="text-[1.1rem] sm:text-lg font-bold">
                  {formState.state.title}
                </h5>
                <Link url={formState.state.policyUrl ?? ''} target="_blank">
                  <Icon
                    source={InfoIcon}
                    tone="info"
                    accessibilityLabel="info"
                  />
                </Link>
              </span>

              {formState.state.insuranceDisplayButton ? (
                <span>{formState.state.enabledDescription}</span>
              ) : (
                <span>{formState.state.disabledDescription}</span>
              )}
            </div>
            <div className="ml-3">
              <div
                className="flex items-center justify-center mb-1"
                onClick={() =>
                  formState.addChange({
                    insuranceDisplayButton:
                      !formState.state.insuranceDisplayButton,
                  })
                }
              >
                {formState.state.insuranceDisplayButton ? (
                  <div
                    className="flex w-12 h-6 bg-green-500 relative drop-shadow-2xl rounded-full cursor-pointer"
                    style={{
                      backgroundColor: hsbaToHexWithAlpha(
                        formState.state.switchColor
                      ),
                    }}
                  >
                    <span className="h-4 w-4 absolute top-1 left-1 bg-white rounded-full active:border-4 active:border-solid border-zinc-800 ml-6 transition-all duration-500 ease-out shadow-2xl  flex items-center justify-center"></span>
                  </div>
                ) : (
                  <div className="flex w-12 h-6 bg-gray-500 duration-500 relative drop-shadow-2xl rounded-full cursor-pointer">
                    <span className="h-4 w-4 absolute top-1 left-1 bg-white rounded-full active:border-4 active:border-solid border-zinc-800 false transition-all duration-500 ease-out shadow-2xl  flex items-center justify-center"></span>
                  </div>
                )}
              </div>
              <span className="font-bold">$149.99</span>
            </div>
          </div>
        </Box>

        <button
          className="bg-gray-950 text-gray-300 font-semibold text-base p-3 my-3 rounded w-full hover:bg-black hover:text-gray-100 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-gray-300"
          // disabled={!formState.staged.checked}
        >
          Checkout $
          {formState.state.insurancePriceType === 'PERCENTAGE'
            ? 800 + (800 / 100) * Number(formState.state.percentage)
            : 800 + Number(formState.state.price)}
        </button>
      </ShadowBevelBox>
      <Box paddingBlockEnd={'200'}></Box>
    </div>
  );
};

export default Preview;
