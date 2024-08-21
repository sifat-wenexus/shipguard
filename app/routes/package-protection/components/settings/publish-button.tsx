import { Icon, Text } from '@shopify/polaris';
import { SettingsIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { Switch } from '~/components/switch';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';

const PublishButton = ({ formState, enabled: isEnabled }) => {
  console.log({ formState });
  const fetcher = useBetterFetcher();
  const [enabled, setEnabled] = useState(isEnabled);
  const toggleEnabled = useCallback(
    (enabled: boolean) => {
      setEnabled(enabled);

      return fetcher.submit(
        {
          loading: true,
          toast: true,
        },
        {
          action: 'toggle',
          enabled,
        },
        {
          method: 'post',
        }
      );
    },
    [fetcher]
  );
  return (
    <ShadowBevelBox
      icon={<Icon source={SettingsIcon} />}
      title="Publish widget at cart page"
      actions={
        <div className="flex items-center">
          <Switch isOn={enabled} onToggle={toggleEnabled} />
        </div>
      }
    >
      <Text as="p">Please follow the 👉 help docs to complete setup.</Text>
      <br />
      <Text as="p" tone="subdued">
        If after publishing the widget, you find that the widget does not show
        up or work properly in store cart, please turn off this switch only.
        This way the widget will not have any effect in the cart, and then
        please contact us for a free expert adaptation
      </Text>
    </ShadowBevelBox>
  );
};

export default PublishButton;
