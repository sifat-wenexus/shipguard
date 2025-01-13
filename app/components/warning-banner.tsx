/* eslint-disable */
import { Banner, Button, Modal, Text } from '@shopify/polaris';
import guidelineImage from '~/assets/images/guideline.png';
import { AlertDiamondIcon } from '@shopify/polaris-icons';
import { useCallback, useEffect, useState } from 'react';
import { IGuideLineResponse } from '~/routes/get-guide-line-data';
// import { Link } from '@remix-run/react';

const WarningBanner = ({ storeInfo }: { storeInfo: IGuideLineResponse }) => {
  if (storeInfo?.embedBlock) return null;

  const [active, setActive] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const handlePopUp = useCallback(() => {
    setActive(!active);
  }, [active]);
  const activator = <Button onClick={handlePopUp}>Check instructions</Button>;

  const { themeId, appExtensionId, embedBlock, shopName } = storeInfo;

  useEffect(() => {
    if (embedBlock === undefined || embedBlock === null) return;
    setShowBanner(!embedBlock);
  }, [embedBlock]);
  return (
    <>
      {showBanner && (
        <div className="w-full mb-4">
          <Banner
            title="Package protection isn't showing up on your store yet"
            hideIcon
            icon={AlertDiamondIcon}
            tone="warning"
            onDismiss={() => setShowBanner(false)}
          >
            <p>
              You activated an app but still need to enable Package protection
              in the Shopify Theme Editor to complete the installation.
            </p>
            <br />
            <div className="flex gap-3">
              <Button
                tone="success"
                variant="primary"
                url={
                  shopName
                    ? `https://admin.shopify.com/store/${shopName}/themes/${themeId}/editor?context=apps&template=index&activateAppId=${appExtensionId}/shipping-protection`
                    : ''
                }
                target="_blank"
              >
                Enable Shipping protection
              </Button>{' '}
              <Modal
                activator={activator}
                open={active}
                onClose={handlePopUp}
                title="Action required: Enable Package Protection on your store"
                primaryAction={{
                  content: 'Goto Theme Editor',
                  onAction: () => {
                    window.open(
                      shopName
                        ? `https://admin.shopify.com/store/${shopName}/themes/${themeId}/editor?context=apps`
                        : ''
                    );
                  },
                }}
                secondaryActions={[
                  {
                    content: 'Enable later',
                    onAction: handlePopUp,
                  },
                ]}
                size="large"
              >
                <Modal.Section>
                  <div className="w-full">
                    <div className="md:flex items-center">
                      <div className="border md:hidden block">
                        <img src={guidelineImage} alt="guidelineImage" />
                      </div>
                      <div className="w-3/5 p-2 mt-4 md:mt-0">
                        <Text as="h1" variant="headingLg">
                          Package Protection isn't showing up on your store yet
                        </Text>
                        <br />
                        <p>
                          Complete the installation by enabling Package
                          Protection in your Shopify theme editor.
                        </p>
                      </div>
                      <div className="border hidden md:block">
                        <img src={guidelineImage} alt="guidelineImage" />
                      </div>
                    </div>
                  </div>
                </Modal.Section>
              </Modal>
            </div>
          </Banner>
        </div>
      )}
    </>
  );
};

export default WarningBanner;
