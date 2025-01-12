import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { useBetterFetcher } from '~/hooks/use-better-fetcher';
import { SettingsIcon } from '@shopify/polaris-icons';
import { Icon, Link, Text } from '@shopify/polaris';
import { Switch } from '~/components/switch';
import { useCallback } from 'react';

const PublishButton = ({
  enabled,
  setEnabled,
  formState,
  setInsurancePriceError,
}) => {
  const fetcher = useBetterFetcher();
  const { state } = formState;

  const openChat = () => {
    const chat = document.getElementById('zsiq_float');
    chat && chat?.click();
  };

  const toggleEnabled = useCallback(
    (enabled: boolean) => {
      if (enabled && state.insurancePriceType === 'NOT_SELECTED') {
        setInsurancePriceError(true);
        return;
      }

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
      {/*<Text as="p">*/}
      {/*  Watch the 👉 <Link>tutorial</Link> to complete the setup.*/}
      {/*</Text>*/}
      {/*<br />*/}
      <Text as="p" tone="subdued">
        If the widget doesn’t show or work in the cart after publishing, turn
        off this switch to disable it.{' '}
        <Link onClick={openChat}>Contact us </Link> for a free expert fix.
      </Text>
    </ShadowBevelBox>
  );
};

export default PublishButton;
