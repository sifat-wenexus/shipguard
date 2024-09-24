import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { SettingsIcon } from '@shopify/polaris-icons';
import { Icon, Link, Text } from '@shopify/polaris';
import { useCallback, useState } from 'react';
import { Switch } from '~/components/switch';

const PublishButton = ({
  enabled: isEnabled,
  formState,
  setInsurancePriceError,
}) => {
  const fetcher = useBetterFetcher();
  const { state } = formState;

  const [enabled, setEnabled] = useState(isEnabled);

  const toggleEnabled = useCallback(
    (enabled: boolean) => {
      // if (!state.insurancePriceType) {
      //   setInsurancePriceError(true);
      //   return;
      // } else {
      setInsurancePriceError(false);
      setEnabled(enabled);

      return fetcher.submit(
        {
          loading: true,
          toast: true,
        },
        {
          action: 'toggle',
          enabled,
          state: JSON.stringify(state),
        },
        {
          method: 'post',
        }
      );
      // }
    },
    [fetcher]
  );
  return (
    <ShadowBevelBox
      icon={<Icon source={SettingsIcon} />}
      title="Publish Widget"
      actions={
        <div className="flex items-center">
          <Switch isOn={enabled} onToggle={toggleEnabled} />
        </div>
      }
    >
      <Text as="p">
        Watch the 👉 <Link>tutorial</Link> to complete the setup.
      </Text>
      <br />
      <Text as="p" tone="subdued">
        If the widget doesn’t show or work in the cart after publishing, turn
        off this switch to disable it. <Link>Contact us </Link> for a free
        expert fix.
      </Text>
    </ShadowBevelBox>
  );
};

export default PublishButton;
