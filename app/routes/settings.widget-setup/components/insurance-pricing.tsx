import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import {
  FormLayout,
  TextField,
  Tooltip,
  Text,
  Icon,
  Box,
  InlineStack,
  Button,
} from '@shopify/polaris';
import {
  DiscountFilledIcon,
  CashDollarIcon,
  PriceListIcon,
  InfoIcon,
} from '@shopify/polaris-icons';

const InsurancePricing = ({ formState, insurancePriceError }) => {
  const { state } = formState;
  return (
    <ShadowBevelBox
      icon={<Icon source={PriceListIcon} />}
      title={
        insurancePriceError
          ? 'Insurance pricing (Required)'
          : 'Insurance pricing'
      }
      className={`my-4 ${insurancePriceError ? 'border-red-400 border-2' : ''}`}
    >
      <FormLayout>
        <FormLayout.Group>
          <div className="grid grid-cols-2 gap-2">
            <Box paddingBlockStart="100" paddingBlockEnd="100">
              <div
                onClick={() => {
                  formState.addChange({
                    insurancePriceType: 'PERCENTAGE',
                  });
                }}
                className={`p-3 h-full text-center shadow-md border rounded-md wenexus-icon-size cursor-pointer ${
                  state.insurancePriceType === 'PERCENTAGE' &&
                  'ring-2 ring-green-500 ring-offset-0 bg-[#6BCE6A] text-white'
                }`}
              >
                <Icon
                  tone={
                    state.insurancePriceType === 'FIXED_PRICE'
                      ? 'subdued'
                      : 'base'
                  }
                  source={DiscountFilledIcon}
                />

                <Text variant="headingXl" as="h2">
                  Percentage
                </Text>
                <Text
                  tone={
                    state.insurancePriceType === 'PERCENTAGE'
                      ? 'base'
                      : 'disabled'
                  }
                  as="p"
                >
                  Select to add percentage-based protection fees
                </Text>
              </div>
            </Box>
            <Box paddingBlockStart="100" paddingBlockEnd="100">
              <div
                onClick={() =>
                  formState.addChange({
                    insurancePriceType: 'FIXED_PRICE',
                  })
                }
                className={`p-3 h-full text-center shadow-md border rounded-md wenexus-icon-size cursor-pointer ${
                  state.insurancePriceType === 'FIXED_PRICE' &&
                  'ring-2 ring-green-500 ring-offset-0 bg-[#6BCE6A] text-white'
                }`}
              >
                <Icon
                  tone={
                    state.insurancePriceType === 'PERCENTAGE'
                      ? 'subdued'
                      : 'base'
                  }
                  source={CashDollarIcon}
                />

                <Text variant="headingXl" as="h2">
                  Fixed
                </Text>
                <Text
                  tone={
                    state.insurancePriceType === 'FIXED_PRICE'
                      ? 'base'
                      : 'disabled'
                  }
                  as="p"
                >
                  Select to add fixed-price protection fees
                </Text>
              </div>
            </Box>
          </div>
          {state.insurancePriceType === 'FIXED_PRICE' && (
            <Box paddingBlockStart="100" paddingBlockEnd="100">
              <div className="flex items-center mb-2">
                <Text variant="headingMd" as="strong">
                  {2} Plan added
                </Text>
                <div className="ms-5"></div>
                <Button onClick={() => {}} variant="primary">
                  Add Plan
                </Button>
              </div>
              {/* <TextField
                onChange={(price) => formState.addToStaged({ price })}
                onBlur={() => formState.commitStaged()}
                label="Fixed price"
                placeholder=""
                value={formState.staged.price}
                inputMode="decimal"
                autoComplete="yes"
                suffix={'$'}
              /> */}
            </Box>
          )}
          {state.insurancePriceType === 'PERCENTAGE' && (
            <div className="grid grid-cols-2 gap-2">
              <Box paddingBlockStart="100" paddingBlockEnd="100">
                <TextField
                  onChange={(defaultPercentage) =>
                    formState.addToStaged({ defaultPercentage })
                  }
                  onBlur={() => formState.commitStaged()}
                  label={
                    <>
                      <Tooltip
                        content="Set your default shipping protection fees and percentage fees."
                        width="wide"
                        padding="400"
                      >
                        <Text as="p">
                          <div className="flex">
                            Default Fee
                            <Icon source={InfoIcon} tone="info" />
                          </div>
                        </Text>
                      </Tooltip>
                    </>
                  }
                  placeholder=""
                  value={formState.staged.defaultPercentage}
                  inputMode="decimal"
                  autoComplete="yes"
                  suffix={'$'}
                />
              </Box>
              <Box paddingBlockStart="100" paddingBlockEnd="100">
                <TextField
                  label={
                    <>
                      <Tooltip
                        content="Shipping protection fee's increment by 0.50 starting at Default Fee to maximum of Default Fee + (99 * 0.50)"
                        width="wide"
                        padding="400"
                      >
                        <Text as="p">
                          <div className="flex">
                            Percentage Fee
                            <Icon source={InfoIcon} tone="info" />
                          </div>
                        </Text>
                      </Tooltip>
                    </>
                  }
                  autoComplete="yes"
                  onChange={(percentage) =>
                    formState.addToStaged({ percentage })
                  }
                  onBlur={() => formState.commitStaged()}
                  value={formState.staged.percentage}
                  inputMode="decimal"
                  suffix={'%'}
                />
              </Box>
            </div>
          )}
        </FormLayout.Group>
      </FormLayout>
    </ShadowBevelBox>
  );
};

export default InsurancePricing;
