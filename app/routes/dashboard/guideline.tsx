import packageProtectionImg from '~/assets/images/guideline/embed-image.png';
import checkoutImg from '~/assets/images/guideline/9685914.webp';
import claimPageImg from '~/assets/images/guideline/claim-page-image.png';
import widgetImg from '~/assets/images/guideline/widget-image.png';

import { useCallback, useEffect,  useState } from 'react';
import InstructionModal from './instruction-modal';
import {
  ActionList,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Collapsible,
  Icon,
  InlineGrid,
  Popover,
} from '@shopify/polaris';
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MenuHorizontalIcon,
} from '@shopify/polaris-icons';

const GuideLine = ({ storeInfo, guidelineVisibility }) => {
  const [actionActive, toggleAction] = useState(false);
  const [dismiss, setDismiss] = useState(guidelineVisibility ? true : false);
  const [open, setOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const value = JSON.parse(
        window.localStorage.getItem(
          'shipping-insurance-guide-line-collops'
        ) as string
      );
      return value ?? true;
    }
    return true;
  });
  const [active, setActive] = useState(false);

  const [toggleLine, setToggleLine] = useState({
    install: false,
    setUp: false,
    enable: false,
    claim: false,
    smtp: false,
  });
  // useEffect(() => {
  //   if (storeInfo?.claimPage && storeInfo?.ebbedBlock && storeInfo?.install) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // }, [storeInfo]);

  const handleClick = (name: string) => {
    setToggleLine((prevState) => ({
      install: name === 'install',
      setUp: name === 'setUp',
      enable: name === 'enable',
      claim: name === 'claim',
      smtp: name === 'smtp',
    }));
  };

  const form = new FormData();
  const setCookie = async () => {
    form.append('name', 'shipping-insurance-guideline');
    form.append('value', 'true');
    const res = await fetch('/cookie', {
      method: 'POST',
      body: form,
    })
      .then((response) => {
        setDismiss(true);
        return response;
      })
      .catch((err) => {
        setDismiss(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (guidelineVisibility) {
      setDismiss(true);
    } else {
      setDismiss(false);
    }
  }, [guidelineVisibility]);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };
  const handleToggle = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'shipping-insurance-guide-line-collops',
        JSON.stringify(!open)
      );
    }
    setOpen((open) => !open);
  }, []);

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={
        <Button
          icon={<Icon source={MenuHorizontalIcon} tone="base" />}
          variant="plain"
          size="large"
          onClick={handleToggleAction}
        ></Button>
      }
      onClose={handleToggleAction}
    >
      <ActionList
        items={[
          {
            content: 'Dismiss',
            onAction: async () => {
              await setCookie();
            },
          },
        ]}
      />
    </Popover>
  );
  return (
    <>
      {!dismiss && (
        <div className="rounded-2xl bg-white shadow-md ">
          <BlockStack>
            <div className="p-4">
              <InlineGrid columns="1fr auto">
                <h1
                  onClick={handleToggle}
                  className="font-bold p-2 cursor-pointer text-base"
                >
                  {' '}
                  Getting Started with the App
                </h1>
                <ButtonGroup>
                  {disclosureButton}

                  <Button
                    onClick={handleToggle}
                    ariaExpanded={open}
                    ariaControls="basic-collapsible"
                    variant="plain"
                    icon={
                      open ? (
                        <Icon source={ChevronUpIcon} />
                      ) : (
                        <Icon source={ChevronDownIcon} />
                      )
                    }
                  ></Button>
                </ButtonGroup>
              </InlineGrid>
              <BlockStack>
                <Box paddingInlineStart={'200'}>
                  <span
                    onClick={handleToggle}
                    className="cursor-pointer text-xs font-light"
                  >
                    Follow these steps to set up the app on your store.
                  </span>
                </Box>
              </BlockStack>
            </div>
            <Collapsible
              open={open}
              id="basic-collapsible"
              transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
              //expandOnPrint
            >
              <hr />
              <div className="m-4">
                <div className="flex gap-3">
                  <span className="guideline-icon mt-1">
                    <Icon source={CheckCircleIcon} tone="success" />
                  </span>
                  <div>
                    <span className="font-light text-xs">
                      You have successfully installed the 'Early Bird' version!
                      Enjoy exploring the features at no cost during this
                      period.
                    </span>
                    <h2 className="font-semibold text-base">
                      Installed Package Protection
                    </h2>
                  </div>
                </div>
              </div>
              <hr />
              <div className="m-4">
                <div className="flex gap-3">
                  <span className="guideline-icon mt-1">
                    {storeInfo?.install ? (
                      <Icon source={CheckCircleIcon} tone="success" />
                    ) : (
                      <Icon source={MenuHorizontalIcon} tone="info" />
                    )}
                  </span>
                  <div className="flex justify-between w-full">
                    <div>
                      <span
                        className="cursor-pointer "
                        onClick={() => handleClick('setUp')}
                      >
                        <span className="font-light text-xs">
                          Customize the price and appearance of the shipping
                          protection. You have full control over both settings.
                        </span>
                        <h2 className="font-semibold text-base">
                          Setup Insurance Widget
                        </h2>
                      </span>

                      {toggleLine.setUp && (
                        <>
                          <br />
                          <br />
                          <Button
                            variant="secondary"
                            url="/settings/widget-setup"
                          >
                           Edit Widget Setting
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="text-right hidden sm:block">
                      {toggleLine.setUp && <img src={widgetImg} alt="i" width={'270px'} />}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="m-4">
                <div className="flex gap-3">
                  <span className="guideline-icon mt-1">
                    {storeInfo?.ebbedBlock ? (
                      <Icon source={CheckCircleIcon} tone="success" />
                    ) : (
                      <Icon source={MenuHorizontalIcon} tone="info" />
                    )}
                  </span>
                  <div className="flex justify-between w-full">
                    <div>
                      <span
                        className="cursor-pointer "
                        onClick={() => handleClick('enable')}
                      >
                        <span className="font-light text-xs">
                          Enable the Insurance widget in the theme settings to
                          display the insurance box on the cart page.
                        </span>
                        <h2 className="font-semibold text-base">
                          Enable Shipping Protection
                        </h2>
                      </span>

                      {toggleLine.enable && (
                        <>
                          <br />
                          <br />

                          <div className="flex gap-4 items-center">
                            <Button
                              variant="primary"
                              tone="success"
                              url={
                                storeInfo.shopName
                                  ? `https://admin.shopify.com/store/${storeInfo?.shopName}/themes/${storeInfo?.ThemeId}/editor?context=apps&template=index&activateAppId=${storeInfo.appExtensionId}/shipping-protection`
                                  : ''
                              }
                              target="_blank"
                            >
                              Enable App Embed
                            </Button>

                            <InstructionModal
                              storeInfo={storeInfo}
                              activator={
                                <Button
                                  variant="plain"
                                  onClick={() => {
                                    setActive(true);
                                  }}
                                >
                                  View Instruction
                                </Button>
                              }
                              active={active}
                              setActive={setActive}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-right hidden sm:block shadow-md">
                      {toggleLine.enable && (
                        <img src={packageProtectionImg} alt="i" width={'250px'} className='rounded-md'/>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="m-4">
                <div className="flex gap-3">
                  <span className="guideline-icon mt-1">
                    {storeInfo?.claimPage ? (
                      <Icon source={CheckCircleIcon} tone="success" />
                    ) : (
                      <Icon source={MenuHorizontalIcon} tone="info" />
                    )}
                  </span>
                  <div className="flex justify-between w-full">
                    <div>
                      <span
                        className="cursor-pointer "
                        onClick={() => handleClick('claim')}
                      >
                        <span className="font-light text-xs">
                          Set up a claim page on your frontend to allow
                          customers to submit claims, and you will receive
                          notifications.
                        </span>
                        <h2 className="font-semibold text-base">
                          Setup Claim Page
                        </h2>
                      </span>

                      {toggleLine?.claim && (
                        <>
                          <br />
                          <br />

                          <div className="flex gap-4 items-center">
                            <Button
                              variant="secondary"
                              url="/settings/claim-page"
                            >
                              Setup Claim Page
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-right hidden sm:block">
                      {toggleLine.claim && <img src={claimPageImg} alt="i" width={"250px"} className='rounded-md' />}
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div className="m-4">
                <div className="flex gap-3">
                  <span className="guideline-icon mt-1">
                    {storeInfo?.smtp ? (
                      <Icon source={CheckCircleIcon} tone="success" />
                    ) : (
                      <Icon source={MenuHorizontalIcon} tone="info" />
                    )}
                  </span>
                  <div className="flex justify-between w-full">
                    <div>
                      <span
                        className="cursor-pointer "
                        onClick={() => handleClick('smtp')}
                      >
                        <span className="font-light text-xs">
                           Ensure your SMTP settings are configured. Without setup, customers won’t receive email notifications for claims and updates.
                        </span>
                        <h2 className="font-semibold text-base">
                           Setup SMTP Settings

                        </h2>
                      </span>

                      {toggleLine?.smtp && (
                        <>
                          <br />
                          <br />

                          <div className="flex gap-4 items-center">
                            <Button
                              variant="secondary"
                              url="/settings/smtp-setup"
                            >
                              Set Up SMTP Now
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-right hidden sm:block">
                      {toggleLine.smtp && (
                        <img width={'160px'} src={checkoutImg} alt="i" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Collapsible>
          </BlockStack>
        </div>
      )}
    </>
  );
};

export default GuideLine;
