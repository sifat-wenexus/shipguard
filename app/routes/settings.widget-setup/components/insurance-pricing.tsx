import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { findEmptyValues } from '../util/findEmptyValues';
import { useI18n } from '@shopify/react-i18n';
import Radio from '~/components/radio';
import {  useState } from 'react';
import {
  FormLayout,
  TextField,
  Tooltip,
  Text,
  Icon,
  Box,
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

const InsurancePricing = ({ formState, insurancePriceError }) => {
  const [i18n] = useI18n();
  const currencySymbol = i18n.formatCurrency(0).toString().slice(0, 1)[0];
  // const currencyCode = queryProxy.store.findFirst({ where: {} });
  const { state } = formState;
  const [emptyIndex, setEmptyIndex] = useState(-1);
  const [warning, setWarning] = useState(false);
  const [active, setActive] = useState(false);
  const [singleErrorMessage, setSingleErrorMessage] = useState('');
  const initialData = {
    protectionFees: '',
    cartMinPrice: '',
    cartMaxPrice: '',
  };
  const [planByValues, setPlanByValues] = useState<Record<string, any>[]>(
    state.fixedMultiplePlan
  );
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
    if (state.isSingle && state.price === '') {
      setSingleErrorMessage('Fixed price is required.');
      return;
    }

    const emptyIndex = findEmptyValues(planByValues);
    if (!state.isSingle && (emptyIndex === 0 || emptyIndex >= 0)) {
      setEmptyIndex(emptyIndex);
      setWarning(true);
      return;
    }
    formState.addChange({
      fixedMultiplePlan: planByValues,
    });
    setActive(false);
  };
  const activator = (
    <Button
      onClick={() => {
        setActive(true);
      }}
      tone="success"
      variant="primary"
    >
      Add Plan
    </Button>
  );
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
          Select to add fixed-price or cart base protection fees
        </Text>
      </div>
    </Box>
  );
  const modal = (
    <Modal
      size="large"
      activator={activator}
      open={active}
      onClose={() => setActive(false)}
      title="Create Fixed Type Protection Plan"
      titleHidden
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
        <div className="flex justify-center mt-4">
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
              onChange={(price) => {
                if (Number(price) < 0) return;
                setSingleErrorMessage('');
                formState.addToStaged({ price });
              }}
              onBlur={(price: any) => {
                if (Number(price?.target.value) === 0) {
                  formState.addChange({ price: '' });
                  setSingleErrorMessage('Fixed price cannot be Zero.');
                  return;
                }
                formState.commitStaged();
              }}
              label=""
              type="number"
              placeholder=""
              value={formState.staged.price}
              error={singleErrorMessage}
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
                className={`sm:flex gap-2 justify-center items-center my-4 border-b-2 pb-4  ${
                  emptyIndex === index
                    ? 'ring-2 ring-red-300 rounded-md p-2'
                    : ''
                } `}
              >
                <TextField
                  label="Protection Fees"
                  autoComplete="off"
                  type="number"
                  onChange={(value) => {
                    if (Number(value) < 0) return;
                    handleChange(index, value, 'protection');
                  }}
                  value={item.protectionFees}
                  prefix={currencySymbol}
                />
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <TextField
                    label="Cart Min Price"
                    autoComplete="off"
                    type="number"
                    prefix={currencySymbol}
                    value={item.cartMinPrice}
                    onChange={(value) => {
                      if (Number(value) < 0) return;
                      handleChange(index, value, 'min-price');
                    }}
                  />
                  <TextField
                    label="Cart Max Price"
                    autoComplete="off"
                    type="number"
                    prefix={currencySymbol}
                    value={item.cartMaxPrice}
                    onChange={(value) => {
                      if (Number(value) < 0) return;
                      handleChange(index, value, 'max-price');
                    }}
                  />
                </div>

                {planByValues.length>1&&
                  <div className="mt-4 text-center">
                    <Button
                      onClick={() => handleRemoveItem(index)}
                      size="large"
                      tone="critical"
                      variant="primary"
                      icon={
                        <Icon
                          accessibilityLabel="delete-plan-item"
                          source={DeleteIcon}
                        />
                      }
                    >
                      Remove
                    </Button>
                  </div>
                }
              </div>
            ))}
            <div className="flex justify-center my-4">
              <Button variant="primary" tone="success" onClick={handleAddItem}>
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
          <div className="grid grid-cols-2 gap-4">
            <Box paddingBlockStart="100" paddingBlockEnd="100">
              <div
                onClick={() => {
                  formState.addChange({
                    insurancePriceType: 'PERCENTAGE',
                  });
                }}
                className={`p-3 h-full text-center shadow-sm border rounded-md wenexus-icon-size cursor-pointer ${
                  state.insurancePriceType === 'PERCENTAGE'
                    ? 'ring-2 ring-green-500 ring-offset-0 bg-[#6BCE6A] text-white'
                    : 'bg-[#F1F1F1] ring-2 ring-gray-300 ring-offset-0'
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
                      : 'subdued'
                  }
                  as="p"
                >
                  Select to add percentage-based protection fees
                </Text>
              </div>
            </Box>
            {/* {modal} */}
            <Box paddingBlockStart="100" paddingBlockEnd="100" minHeight="100%">
              <div
                onClick={() => {
                  // setActive(true);
                  formState.addChange({
                    insurancePriceType: state.isSingle
                      ? 'FIXED_PRICE'
                      : 'FIXED_MULTIPLE',
                  });
                }}
                className={`fixed-cart-height p-3 h-full text-center shadow-sm border rounded-md wenexus-icon-size cursor-pointer ${
                  state.insurancePriceType === 'FIXED_PRICE' ||
                  state.insurancePriceType === 'FIXED_MULTIPLE'
                    ? 'ring-2 ring-green-500 ring-offset-0 bg-[#6BCE6A] text-white'
                    : 'bg-[#F1F1F1] ring-2 ring-gray-300 ring-offset-0'
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
                    state.insurancePriceType === 'FIXED_PRICE' ||
                    state.insurancePriceType === 'FIXED_MULTIPLE'
                      ? 'base'
                      : 'subdued'
                  }
                  as="p"
                >
                  Select to add fixed-price or cart value base protection fees
                </Text>
              </div>
            </Box>
          </div>
          {(state.insurancePriceType === 'FIXED_PRICE' ||
            state.insurancePriceType === 'FIXED_MULTIPLE') && (
            <Box paddingBlockStart="100" paddingBlockEnd="100">
              <div className="flex items-center mb-2 py-4">
                <Text variant="headingMd" as="strong">
                  {state.insurancePriceType === 'FIXED_PRICE'
                    ? state.price === '0' ||
                      state.price === '' ||
                      state.price === 0
                      ? `No Plan Added`
                      : `${1} Single Plan Added`
                    : state.fixedMultiplePlan[0].cartMaxPrice === '' ||
                      state.fixedMultiplePlan[0].cartMinPrice === '' ||
                      state.fixedMultiplePlan[0].protectionFees === ''
                    ? `No Plan Added`
                    : `${state.fixedMultiplePlan.length} Multiple Plan Added`}
                </Text>
                <div className="ms-5"></div>

                {modal}
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
              <div className="col-span-2">
                <Box paddingBlockStart="100" paddingBlockEnd="100">
                  <TextField
                    label={
                      <>
                        {/* <Tooltip
                          content="Shipping protection fee's increment by 0.50 starting at Default Fee to maximum of Default Fee + (99 * 0.50)"
                          width="wide"
                          padding="400"
                        > */}
                        <Text as="p">
                          <div className="flex">
                            Percentage
                            {/*<Icon source={InfoIcon} tone="info" />*/}
                          </div>
                        </Text>
                        {/* </Tooltip> */}
                      </>
                    }
                    autoComplete="yes"
                    onChange={(percentage) => {
                      if (Number(percentage) < 0) return;
                      formState.addToStaged({ percentage });
                    }}
                    type="number"
                    error={formState?.messages?.percentage?.message}
                    onBlur={() => formState.commitStaged()}
                    value={formState.staged.percentage}
                    inputMode="decimal"
                    suffix={'%'}
                  />
                </Box>
              </div>
              <Box paddingBlockStart="100" paddingBlockEnd="100">
                <TextField
                  onChange={(minimumFee) => {
                    if (Number(minimumFee) < 0) return;
                    formState.addToStaged({ minimumFee });
                  }}
                  onBlur={() => formState.commitStaged()}
                  label={
                    <>
                      <Tooltip
                        content="The Initial Cost of Protection."
                        width="wide"
                        padding="400"
                      >
                        <Text as="p">
                          <div className="flex">
                            Minimum Fee
                            <Icon source={InfoIcon} tone="info" />
                          </div>
                        </Text>
                      </Tooltip>
                    </>
                  }
                  placeholder=""
                  type="number"
                  value={formState.staged.minimumFee}
                  error={formState?.messages?.minimumFee?.message}
                  inputMode="decimal"
                  autoComplete="yes"
                  prefix={currencySymbol}
                  // readOnly
                />
              </Box>
              <Box paddingBlockStart="100" paddingBlockEnd="100">
                <TextField
                  onChange={(maximumFee) => {
                    if (Number(maximumFee) < 0) return;
                    formState.addToStaged({ maximumFee });
                  }}
                  onBlur={() => formState.commitStaged()}
                  label={
                    <>
                      <Tooltip
                        content="The Maximum Cost of Protection."
                        width="wide"
                        padding="400"
                      >
                        <Text as="p">
                          <div className="flex">
                            Maximum Fee
                            <Icon source={InfoIcon} tone="info" />
                          </div>
                        </Text>
                      </Tooltip>
                    </>
                  }
                  placeholder=""
                  type="number"
                  min={1}
                  value={formState.staged.maximumFee}
                  error={formState?.messages?.maximumFee?.message}
                  inputMode="decimal"
                  autoComplete="yes"
                  prefix={currencySymbol}
                  // readOnly
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
