import { ElementPlacementPosition } from 'prisma/client/default';
import { Box, Checkbox, Select } from '@shopify/polaris';
import Radio from '~/components/radio';
import { useMemo } from 'react';

const Settings = ({ formState }) => {
  const labels = useMemo(
    () => [
      { label: 'Before Checkout Button', value: 'BEFORE' },
      { label: 'After Checkout Button', value: 'AFTER' },
    ],
    []
  );
  return (
    <>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <p className="mb-2">
          <b>Position</b>
        </p>
        <Select
          onChange={(position: ElementPlacementPosition) =>
            formState.addToStaged({ position })
          }
          onBlur={() => formState.commitStaged()}
          value={formState.staged.position}
          options={labels}
          label=""
        />
      </Box>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <b>Placement</b>
        <Box>
          <Checkbox
            label="Show On Cart Page"
            onChange={(showOnCartPage) =>
              formState.addToStaged({ showOnCartPage })
            }
            onBlur={() => formState.commitStaged()}
            checked={formState.staged.showOnCartPage}
          />{' '}
          <br />
          <Checkbox
            label="Show On Mini Cart"
            onChange={(showOnMiniCart) =>
              formState.addToStaged({ showOnMiniCart })
            }
            onBlur={() => formState.commitStaged()}
            checked={formState.staged.showOnMiniCart}
          />
        </Box>
      </Box>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <b>Checkbox Settings</b>
        <Radio
          onChange={() => formState.addToStaged({ checked: true })}
          onBlur={() => formState.commitStaged()}
          checked={formState.staged.checked}
          label="By Default Check Selected"
          id="Selected"
          type="radio"
        />
        <Radio
          onChange={() => formState.addToStaged({ checked: false })}
          onBlur={() => formState.commitStaged()}
          checked={!formState.staged.checked}
          label="By Default Check Unselected"
          id="Unselected"
          type="radio"
        />
      </Box>
    </>
  );
};

export default Settings;
