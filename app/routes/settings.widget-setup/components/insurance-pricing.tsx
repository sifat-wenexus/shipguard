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
  Modal,
  Banner,
} from '@shopify/polaris';
import {
  DiscountFilledIcon,
  CashDollarIcon,
  PriceListIcon,
  InfoIcon,
  DeleteIcon,
} from '@shopify/polaris-icons';
import { useEffect, useState } from 'react';
import { queryProxy } from '~/modules/query/query-proxy';
import Radio from '~/components/radio';
import { useI18n } from '@shopify/react-i18n';
import { findEmptyValues } from '../util/findEmptyValues';

const InsurancePricing = ({ formState, insurancePriceError }) => {
  const [i18n] = useI18n();
  const currencySymbol = i18n.formatCurrency(0).toString().slice(0, 1)[0];
  // const currencyCode = queryProxy.store.findFirst({ where: {} });
  const { state } = formState;
  const [emptyIndex, setEmptyIndex] = useState(-1);
  const [warning, setWarning] = useState(false);
  const [active, setActive] = useState(false);
  console.log({ state });
  const initialData = {
    protectionFees: '',
    cartMinPrice: '',
    cartMaxPrice: '',
  };
  const [planByValues, setPlanByValues] = useState<Record<string, any>[]>(
    JSON.parse(state.fixedMultiplePlan)
  );
  console.log({ planByValues });
  const handleAddItem = () => {
    setPlanByValues((prev) => [...prev, initialData]);
  };
  const handleRemoveItem = (index: number) => {
    if (planByValues.length === 1) {
      return;
    }
    setPlanByValues((prev) => prev.filter((_, i) => i !== index));
  };
  const handleChange = (index: number, value: string, name: string) => {
    setPlanByValues((prev) =>
      prev.map((e, i) => {
        if (i === index) {
          const obj = {
            protectionFees: name === 'protection' ? value : e.protectionFees,
            cartMinPrice: name === 'min-price' ? value : e.cartMinPrice,
            cartMaxPrice: name === 'max-price' ? value : e.cartMaxPrice,
          };
          return obj;
        } else {
          return {
            ...e,
          };
        }
      })
    );
  };
  const handleAddPlan = () => {
    const emptyIndex = findEmptyValues(planByValues);
    if (!state.isSingle && (emptyIndex === 0 || emptyIndex >= 0)) {
      setEmptyIndex(emptyIndex);
      setWarning(true);
      return;
    }
    formState.addChange({
      fixedMultiplePlan: JSON.stringify(planByValues),
    });
    setActive(false);
  };

  const activator2 = (
    <Box paddingBlockStart="100" paddingBlockEnd="100" minHeight="100%">
      <div
        onClick={() => {
          setActive(true);
          formState.addChange({
            insurancePriceType: state.isSingle
              ? 'FIXED_PRICE'
              : 'FIXED_MULTIPLE',
          });
        }}
        className={`fixed-cart-height p-3 h-full text-center shadow-md border rounded-md wenexus-icon-size cursor-pointer ${
          (state.insurancePriceType === 'FIXED_PRICE' ||
            state.insurancePriceType === 'FIXED_MULTIPLE') &&
          'ring-2 ring-green-500 ring-offset-0 bg-[#6BCE6A] text-white'
        }`}
      >
        <Icon
          tone={state.insurancePriceType === 'PERCENTAGE' ? 'subdued' : 'base'}
          source={CashDollarIcon}
        />

        <Text variant="headingXl" as="h2">
          Fixed
        </Text>
        <Text
          tone={
            state.insurancePriceType === 'FIXED_PRICE' ||
            state.insurancePriceType === 'FIXED_MULTIPLE'
              ? 'base'
              : 'disabled'
          }
          as="p"
        >
          Select to add fixed-price protection fees
        </Text>
      </div>
    </Box>
  );
  const modal = (
    <Modal
      size="large"
      activator={activator2}
      open={active}
      onClose={() => setActive(false)}
      title="Create Fixed Type Protection Plan"
      primaryAction={{
        content: 'Save',

        onAction: handleAddPlan,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => setActive(false),
        },
      ]}
    >
      <Modal.Section>
        <div className="flex justify-center">
          <div className="flex gap-4 m-auto mb-8">
            <Radio
              checked={state.isSingle}
              id="single"
              label="Create Single Plan"
              onChange={() => {
                formState.addChange({
                  insurancePriceType: 'FIXED_PRICE',
                  isSingle: true,
                });
              }}
            ></Radio>
            <Radio
              checked={!state.isSingle}
              id="multiple"
              label="Create Plan by Cart Value"
              onChange={() => {
                formState.addChange({
                  insurancePriceType: 'FIXED_MULTIPLE',
                  isSingle: false,
                });
              }}
            ></Radio>
          </div>
        </div>

        {state.isSingle ? (
          <div className="sm:w-2/4 md:w-2/5 m-auto mb-4 flex items-center gap-4 ">
            <p className="font-bold">Fixed price </p>
            <TextField
              onChange={(price) => formState.addToStaged({ price })}
              onBlur={() => formState.commitStaged()}
              label=""
              placeholder=""
              value={formState.staged.price}
              inputMode="decimal"
              autoComplete="yes"
              prefix={currencySymbol}
            />
          </div>
        ) : (
          <div>
            {warning && (
              <Banner
                onDismiss={() => setWarning(false)}
                title="Fill empty value or delete the row."
                tone="critical"
              ></Banner>
            )}
            {planByValues.map((item, index) => (
              <div
                key={index}
                className={`sm:flex gap-2 justify-center items-center my-2 ${
                  emptyIndex === index
                    ? 'ring-2 ring-red-300 rounded-md p-2'
                    : ''
                } `}
              >
                <TextField
                  label="Protection Fees"
                  placeholder="Enter Protection Fees"
                  autoComplete="off"
                  type="number"
                  onChange={(value) => handleChange(index, value, 'protection')}
                  value={item.protectionFees}
                  prefix={currencySymbol}
                />
                <TextField
                  label="Cart Min Price"
                  placeholder="Enter Cart Min Price"
                  autoComplete="off"
                  type="number"
                  prefix={currencySymbol}
                  value={item.cartMinPrice}
                  onChange={(value) => handleChange(index, value, 'min-price')}
                />
                <TextField
                  label="Cart Max Price"
                  placeholder="Enter Cart Max Price"
                  autoComplete="off"
                  type="number"
                  prefix={currencySymbol}
                  value={item.cartMaxPrice}
                  onChange={(value) => handleChange(index, value, 'max-price')}
                />
                <div className="mt-4">
                  <Button
                    onClick={() => handleRemoveItem(index)}
                    size="large"
                    icon={
                      <Icon
                        accessibilityLabel="delete-plan-item"
                        source={DeleteIcon}
                      />
                    }
                  ></Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center my-4">
              <Button variant="primary" onClick={handleAddItem}>
                Add New Plan
              </Button>
            </div>
          </div>
        )}
      </Modal.Section>
    </Modal>
  );

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
                    state.insurancePriceType === 'FIXED_PRICE' ||
                    state.insurancePriceType === 'FIXED_MULTIPLE'
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
            {modal}
            {/* <Box paddingBlockStart="100" paddingBlockEnd="100">
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
            </Box> */}
          </div>
          {state.insurancePriceType === 'FIXED_PRICE' && (
            <Box paddingBlockStart="100" paddingBlockEnd="100">
              {/* <div className="flex items-center mb-2">
                <Text variant="headingMd" as="strong">
                  {2} Plan added
                </Text>
                <div className="ms-5"></div>

                {modal}
              </div> */}
              {/* TODO: implement for version 2 */}
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
                  prefix={currencySymbol}
                  // readOnly
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
