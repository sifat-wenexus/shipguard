import packageProtectionImg from '~/assets/images/guideline/embed-image.webp';
import claimPageImg from '~/assets/images/guideline/claim-page-image.png';
import type { IGuideLineResponse } from '~/routes/get-guide-line-data';
import widgetImg from '~/assets/images/guideline/widget-image.webp';
import { useCallback, useEffect, useMemo, useState } from 'react';
import checkoutImg from '~/assets/images/guideline/9685914.webp';
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
  InlineStack,
  List,
  Popover,
  ProgressBar,
} from '@shopify/polaris';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuHorizontalIcon,
} from '@shopify/polaris-icons';

const GuideLine = ({
  storeInfo,
  guidelineVisibility,
}: {
  storeInfo: IGuideLineResponse | null;
  guidelineVisibility: string | null;
}) => {
  const [actionActive, toggleAction] = useState(false);
  const [dismiss, setDismiss] = useState(!!guidelineVisibility);
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
    setUp: true,
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

  const {
    install,
    themeId,
    smtp,
    embedBlock,
    appExtensionId,
    claimPage,
    shopName,
  } = storeInfo || {};

  const progressGuideLine = {
    install,
    embedBlock,
    claimPage,
    smtp,
  };

  const totalCheck = useMemo(() => {
    return Object.values(progressGuideLine).filter((item) => item).length;
  }, [progressGuideLine]);

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
    form.append('name', `shipping-insurance-guideline-${shopName}`);
    form.append('value', 'true');
    await fetch('/cookie', {
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
              <div className={'pt-2'}>
                <Box paddingInlineStart={'200'}>
                  <InlineStack wrap={false} gap={'100'} blockAlign={'center'}>
                    <span className={'w-[200px]'}>
                      {' '}
                      {totalCheck} of 4 tasks completed
                    </span>

                    <ProgressBar
                      tone={'success'}
                      progress={totalCheck * 25}
                      size="small"
                    />
                  </InlineStack>
                </Box>
              </div>
            </div>
            <Collapsible
              open={open}
              id="basic-collapsible"
              transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
              //expandOnPrint
            >
              {/*<hr />*/}
              {/*<div className="m-4">*/}
              {/*  <div className="flex gap-3">*/}
              {/*    <span className="guideline-icon mt-1">*/}
              {/*      <Icon source={CheckCircleIcon} tone="success" />*/}
              {/*    </span>*/}
              {/*    <div>*/}
              {/*      <span className="font-light text-xs">*/}
              {/*        You have successfully installed the 'Early Bird' version!*/}
              {/*        Enjoy exploring the features at no cost during this*/}
              {/*        period.*/}
              {/*      </span>*/}
              {/*      <h2 className="font-semibold text-base">*/}
              {/*        Installed Package Protection*/}
              {/*      </h2>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <hr />
              <div
                className={`m-4 ${
                  toggleLine.setUp ? 'bg-gray-200' : undefined
                } rounded-lg`}
              >
                <div className="flex p-2 gap-3">
                  <span className="guideline-icon mt-1">
                    {install ? TickMark() : RoundDoted()}
                  </span>
                  <div
                    className="flex justify-between w-full cursor-pointer"
                    onClick={() => handleClick('setUp')}
                  >
                    <div>
                      <span>
                        <h2 className="font-semibold text-[14px]">
                          Setup Insurance Widget
                        </h2>
                        <span className="font-light text-xs">
                          Customize the price and appearance of the shipping
                          protection. You have full control over both settings.
                        </span>
                      </span>

                      {toggleLine.setUp && (
                        <div>
                          <br />
                          <br />
                          <Button
                            variant="primary"
                            url="/settings/widget-setup"
                          >
                            Insurance Widget Setup
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="text-right hidden sm:block">
                      {toggleLine.setUp && (
                        <img src={widgetImg} alt="i" width={'220px'} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div
                className={`m-4 ${
                  toggleLine.enable ? 'bg-gray-200' : undefined
                } rounded-lg`}
              >
                <div className="flex p-2 gap-3">
                  <span className="guideline-icon mt-1">
                    {embedBlock ? TickMark() : RoundDoted()}
                  </span>
                  <div
                    className="flex justify-between w-full cursor-pointer"
                    onClick={() => handleClick('enable')}
                  >
                    <div>
                      <span>
                        <h2 className="font-semibold text-[14px]">
                          Enable Shipping Protection
                        </h2>
                        <span className="font-light text-xs">
                          Enable the Insurance widget in the theme settings to
                          display the insurance box on the cart page.
                        </span>
                      </span>

                      {toggleLine.enable && (
                        <>
                          <br />
                          <br />
                          <List type="number">
                            <List.Item>
                              Go to <b>"App embeds"</b> section of your theme
                              settings
                            </List.Item>
                            <List.Item>
                              Enable the ShipGuard: Shipping Protection's app
                              embed
                            </List.Item>
                            <List.Item>Save your changes</List.Item>
                          </List>
                          <br />
                          <div className="flex gap-4 items-center">
                            <Button
                              variant="primary"
                              tone="success"
                              url={
                                shopName
                                  ? `https://admin.shopify.com/store/${shopName}/themes/${themeId}/editor?context=apps&template=index&activateAppId=${appExtensionId}/shipping-protection`
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
                        <img
                          src={packageProtectionImg}
                          alt="i"
                          width={'220px'}
                          className="rounded-md"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div
                className={`m-4 ${
                  toggleLine.claim ? 'bg-gray-200' : undefined
                } rounded-lg`}
              >
                <div className="flex p-2 gap-3">
                  <span className="guideline-icon mt-1">
                    {claimPage ? TickMark() : RoundDoted()}
                  </span>
                  <div
                    className="flex justify-between w-full cursor-pointer"
                    onClick={() => handleClick('claim')}
                  >
                    <div>
                      <span>
                        <h2 className="font-semibold text-[14px]">
                          Setup Claim Page
                        </h2>
                        <span className="font-light text-xs">
                          Set up a claim page on your frontend to allow
                          customers to submit claims, and you will receive
                          notifications.
                        </span>
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
                      {toggleLine.claim && (
                        <img
                          src={claimPageImg}
                          alt="i"
                          width={'250px'}
                          className="rounded-md"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div
                className={` m-4 ${
                  toggleLine.smtp ? 'bg-gray-200' : undefined
                } rounded-lg `}
                // style={{ height: isVisible ? 'auto' : '0', overflow: 'hidden' }}
              >
                <div className="flex p-2 gap-3 ">
                  <span className="guideline-icon mt-1">
                    {smtp ? TickMark() : RoundDoted()}
                  </span>
                  <div
                    className="flex justify-between w-full cursor-pointer"
                    onClick={() => handleClick('smtp')}
                  >
                    <div>
                      <span>
                        <h2 className="font-semibold text-[14px]">
                          Setup SMTP Settings
                        </h2>
                        <span className="font-light text-xs">
                          Ensure your SMTP settings are configured. Without
                          setup, customers won’t receive email notifications for
                          claims and updates.
                        </span>
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

const RoundDoted = () => {
  return (
    <span
      className={`w-[20px] h-[20px] border-gray-400  rounded-full border-2 block border-dotted text-transparent`}
    >
      .
    </span>
  );
};

const TickMark = () => {
  return (
    <img
      src={
        'https://app-discounty.hengam.io/static/media/circular-check.82cdb759c36608903138c7e32dc3bb8a.svg'
      }
      alt={'icon'}
    />
  );
};
