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
import { useCallback, useEffect, useRef, useState } from 'react';
import InstructionModal from './instruction-modal';

const GuideLine = ({ storeInfo }) => {
  const [actionActive, toggleAction] = useState(false);
  const [dismiss, setDismiss] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const [toggleLine, setToggleLine] = useState({
    install: false,
    setUp: false,
    enable: false,
    claim: false,
  });
  useEffect(() => {
    if (storeInfo?.claimPage && storeInfo?.ebbedBlock && storeInfo?.install) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [storeInfo]);

  const handleClick = (name: string) => {
    setToggleLine((prevState) => ({
      install: name === 'install',
      setUp: name === 'setUp',
      enable: name === 'enable',
      claim: name === 'claim',
    }));
  };

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

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
            onAction: () => {
              setDismiss(true);
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
                      INITIAL 30 DAYS OF TRIAL
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
                            Open
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="text-right hidden sm:block">
                      {toggleLine.setUp && (
                        <img
                          src="https://d3acrzpqhtrug6.cloudfront.net/asset/apps/vitals/img/extended-trial/wishlist.svg"
                          alt="i"
                        />
                      )}
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
                          Enable Package Protection
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
                              url={`https://admin.shopify.com/store/${storeInfo?.store?.name}/themes/${storeInfo?.theme?.id}/editor?context=apps`}
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
                    <div className="text-right hidden sm:block">
                      {toggleLine.enable && (
                        <img
                          src="https://d3acrzpqhtrug6.cloudfront.net/asset/apps/vitals/img/extended-trial/visitor-replays.svg"
                          alt="i"
                        />
                      )}
                    </div>
                    {/* https://admin.shopify.com/store/nexusapp/themes/current/editor?context=apps&template=index&activateAppId=2e94b962-8172-4839-8ad9-7837eb8b017a/app-embed
                    https://admin.shopify.com/store/nexusapp/themes/136195440687/editor?context=apps&appEmbed=2e94b962-8172-4839-8ad9-7837eb8b017a%2Fapp-embed */}
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
                      {toggleLine.claim && (
                        <img
                          src="https://d3acrzpqhtrug6.cloudfront.net/asset/apps/vitals/img/extended-trial/wishlist.svg"
                          alt="i"
                        />
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
