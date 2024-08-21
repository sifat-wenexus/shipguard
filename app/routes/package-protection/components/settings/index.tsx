import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  EmptyState,
  FormLayout,
  Icon,
  InlineStack,
  Layout,
  Link,
  Modal,
  Select,
  Text,
  TextField,
  Tooltip,
} from '@shopify/polaris';
import {
  ArrowLeftIcon,
  CashDollarIcon,
  CheckIcon,
  CodeIcon,
  ContentIcon,
  CreditCardPercentIcon,
  DiscountFilledIcon,
  IconsIcon,
  InfoIcon,
  PriceListIcon,
  ReplaceIcon,
  SettingsIcon,
  ViewIcon,
} from '@shopify/polaris-icons';

import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import ProductCard from '~/routes/terms-setting/components/product-card';
import ProductSKUSelect from '../product-sku-select';
import Radio from '~/components/radio';
import { ColorPicker2 } from '~/components/color-picker-2';
import { useCallback, useMemo, useState } from 'react';
import { packageIcons } from '../package-icons';
import { hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import Editor from '@monaco-editor/react';
import { ElementPlacementPosition } from 'prisma/client/default';
import PlacementCard from './placement-cart';
import InsurancePricing from './insurance-pricing';
import CustomizedInsuranceStyle from './customized-insurance-style';
import Content from './content';
import SpecialSettings from './special-settings';
import Css from './css';
import PublishButton from './publish-button';

import widgetIcon from '~/assets/icons/widget-setup.svg';
import pageIcon from '~/assets/icons/customer-claim-page.svg';
import checkoutIcon from '~/assets/icons/checkout-extension.svg';
import CodeSetup from '../page-setup';

const Settings = ({ formState, enabled }) => {
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [claimPageOpen, setClaimPageOpen] = useState(false);

  const selectedIcon = packageIcons.find((i) => i.id === formState.state.icon);

  return (
    <>
      {!widgetOpen && !claimPageOpen && (
        <Layout.Section variant="fullWidth">
          <div className="flex items-center justify-center ">
            <div>
              <div
                className=" border bg-white p-3 rounded-lg  hover:bg-gray-100 cursor-pointer "
                onClick={() => setWidgetOpen(true)}
              >
                <div className="flex min-w-96 ">
                  <img src={widgetIcon} alt="widget setup" />
                  <div className="ml-4">
                    <p className="font-bold text-xl"> Cart Widget Setup</p>
                    <p>Steps to enable widget in your theme</p>
                  </div>
                </div>
              </div>
              <div
                className=" border bg-white p-3 rounded-lg  hover:bg-gray-100 cursor-pointer my-8"
                onClick={() => setClaimPageOpen(true)}
              >
                <div className="flex min-w-96 ">
                  <img src={pageIcon} alt="widget setup" />
                  <div className="ml-4">
                    <p className="font-bold text-xl">
                      Customer Claim Page Setup
                    </p>
                    <p>Steps to enable customer claim page in your theme</p>
                  </div>
                </div>
              </div>
              <div className=" border bg-white p-3 rounded-lg  hover:bg-gray-100 cursor-pointer">
                <div className="flex min-w-96 ">
                  <img src={checkoutIcon} alt="widget setup" />
                  <div className="ml-4">
                    <p className="font-bold text-xl">
                      {' '}
                      Checkout Extension Setup
                    </p>
                    <p>Steps to enable checkout extension in your theme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Box paddingBlockEnd={'1200'}></Box>
        </Layout.Section>
      )}{' '}
      {claimPageOpen && (
        <Layout.Section variant="fullWidth">
          <div className="mb-4">
            <Button
              icon={ArrowLeftIcon}
              onClick={() => setClaimPageOpen(false)}
            >
              Back
            </Button>
          </div>
          <CodeSetup />
        </Layout.Section>
      )}
      {widgetOpen && (
        <>
          <Layout.Section variant="oneHalf">
            <Box paddingBlockEnd={'500'}>
              <Button icon={ArrowLeftIcon} onClick={() => setWidgetOpen(false)}>
                Back
              </Button>
            </Box>
            <PublishButton formState={formState} enabled={enabled} />
            <PlacementCard formState={formState} />
            <InsurancePricing formState={formState} />
            <CustomizedInsuranceStyle formState={formState} />
            <Content formState={formState} />
            <SpecialSettings formState={formState} />
            <Css formState={formState} />
            <Box paddingBlockEnd={'1200'}></Box>
          </Layout.Section>
          {/* preview card */}
          <Layout.Section variant="oneHalf">
            <Box paddingBlockEnd={'1200'}></Box>
            <ShadowBevelBox icon={<Icon source={ViewIcon} />} title="Preview">
              <ProductCard card={1} />
              <div className="mt-4"></div>
              <ProductCard card={2} />
              <Box paddingBlockStart={'200'} paddingBlockEnd={'200'}>
                <Divider />
              </Box>
              <Box paddingBlockStart={'200'} paddingBlockEnd={'200'}>
                <div className="grid grid-cols-12">
                  <div className="col-span-2 m-auto">
                    {selectedIcon && <selectedIcon.icon />}
                  </div>
                  <div className="col-span-8 ms-2">
                    <Text variant="headingXl" as="h3">
                      {formState.state.title}{' '}
                      <Text variant="headingLg" as="span" fontWeight="regular">
                        $ (
                        {formState.state.insurancePriceType === 'PERCENTAGE'
                          ? 800 +
                            (800 / 100) * Number(formState.state.percentage)
                          : 800 + Number(formState.state.price)}
                        )
                      </Text>
                    </Text>
                    {formState.state.insuranceDisplayButton ? (
                      <Text variant="bodyLg" as="strong">
                        {formState.state.enabledDescription}
                      </Text>
                    ) : (
                      <Text variant="bodyLg" as="strong">
                        {formState.state.disabledDescription}
                      </Text>
                    )}
                    {/* <Text variant="bodyMd" tone="disabled" as="h3">
                  Powered by nexusapp
                </Text> */}
                  </div>
                  <div className="col-span-2">
                    <div
                      className="flex items-center"
                      onClick={() =>
                        formState.addChange({
                          insuranceDisplayButton:
                            !formState.state.insuranceDisplayButton,
                        })
                      }
                    >
                      {formState.state.insuranceDisplayButton ? (
                        <div
                          className="flex w-16 h-7 bg-green-500 relative drop-shadow-2xl rounded-full cursor-pointer"
                          style={{
                            backgroundColor: hsbaToHexWithAlpha(
                              formState.state.switchColor
                            ),
                          }}
                        >
                          <span className="h-5 w-5 absolute top-1 left-1 bg-white rounded-full active:border-4 active:border-solid border-zinc-800 ml-8 transition-all duration-500 ease-out shadow-2xl  flex items-center justify-center"></span>
                        </div>
                      ) : (
                        <div className="flex w-16 h-7 bg-gray-500 duration-500 relative drop-shadow-2xl rounded-full cursor-pointer">
                          <span className="h-5 w-5 absolute top-1 left-1 bg-white rounded-full active:border-4 active:border-solid border-zinc-800 false transition-all duration-500 ease-out shadow-2xl  flex items-center justify-center"></span>
                        </div>
                      )}
                    </div>
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
            <Box paddingBlockEnd={'1200'}></Box>
          </Layout.Section>
        </>
      )}
    </>
  );
};

export default Settings;
