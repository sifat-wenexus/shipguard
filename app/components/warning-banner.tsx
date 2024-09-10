import { Banner, Button, Modal, Text } from '@shopify/polaris';
import guidelineImage from '~/assets/images/guideline.png';
import { AlertDiamondIcon } from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';

const WarningBanner = ({ storeInfo }) => {
  const [active, setActive] = useState(false);

  const handlePopUp = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handlePopUp}>Check instructions</Button>;
  return (
    <>
      {storeInfo?.ebbedBlock ? null : (
        <div className="w-full mb-4">
          <Banner
            title="Package protection isn't showing up on your store yet"
            onDismiss={() => {}}
            icon={AlertDiamondIcon}
            tone="warning"
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
                url={`https://admin.shopify.com/store/${storeInfo?.store?.name}/themes/${storeInfo?.theme?.id}/editor?context=apps`}
                target="_blank"
              >
                Enable Package protection
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
                      `https://admin.shopify.com/store/${storeInfo?.store?.name}/themes/${storeInfo?.theme?.id}/editor?context=apps`,
                      '_blank'
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
