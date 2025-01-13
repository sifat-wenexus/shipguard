import guidelineImage from '~/assets/images/guideline.png';
import { Button, Modal, Text } from '@shopify/polaris';
import React, { useCallback } from 'react';
import { IResponse } from '~/routes/get-guide-line-data';

interface  IParams{
  storeInfo:IResponse|null;
  active: boolean;
  setActive: (active: boolean) => void;
  activator: any
}


const InstructionModal = ({
  storeInfo,
  active = false,
  setActive = (t: boolean) => {},
  activator = <Button>Check instructions</Button>,
}:IParams) => {
  const handlePopUp = useCallback(() => setActive(!active), [active]);

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handlePopUp}
      title="Action required: Enable Package Protection on your store"
      primaryAction={{
        content: 'Goto Theme Editor',
        onAction: () => {
          window.open(
            `https://admin.shopify.com/store/${storeInfo?.shopName}/themes/${storeInfo?.themeId}/editor?context=apps&template=index&activateAppId=${storeInfo?.appExtensionId}/shipping-protection`,
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
          <div className="flex items-center">
            <div className="w-3/5 p-2">
              <Text as="h1" variant="headingLg">
                Package Protection isn't showing up on your store yet
              </Text>
              <br />
              <p>
                Complete the installation by enabling Package Protection in your
                Shopify theme editor.
              </p>
            </div>
            <div className="border">
              <img src={guidelineImage} alt="guidelineImage" />
            </div>
          </div>
        </div>
      </Modal.Section>
    </Modal>
  );
};

export default InstructionModal;
