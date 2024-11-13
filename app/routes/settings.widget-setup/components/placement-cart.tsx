import { ElementPlacementPosition } from 'prisma/client/default';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { InfoIcon, ReplaceIcon } from '@shopify/polaris-icons';
import Radio from '~/components/radio';
import { useMemo } from 'react';
import {
  FormLayout,
  TextField,
  Tooltip,
  Select,
  Text,
  Icon,
  Box,
} from '@shopify/polaris';

const PlacementCard = ({ formState }) => {
  const { state } = formState;

  const labels = useMemo(
    () => [
      { label: 'Before the selected element', value: 'BEFORE' },
      { label: 'After the selected element', value: 'AFTER' },
    ],
    []
  );
  return (
    <ShadowBevelBox
      icon={<Icon source={ReplaceIcon} />}
      title="Placement"
      className="my-4"
    >
      <FormLayout>
        {' '}
        <FormLayout.Group>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <b>Package protection placement</b>
            <div className="flex items-center">
              {' '}
              <Radio
                onChange={() => formState.addChange({ defaultSetting: true })}
                checked={formState.staged.defaultSetting}
                label="Automatic "
                id="defaultSetting on"
                type="radio"
              />{' '}
              <span className="font-bold mt-2 ms-1 text-blue-600">
                (Recommended)
              </span>{' '}
            </div>
            <Radio
              onChange={() => formState.addChange({ defaultSetting: false })}
              checked={!formState.staged.defaultSetting}
              label="Custom settings"
              id="defaultSetting off"
              type="radio"
            />
          </Box>
          {/* <Divider /> */}
          {formState.staged.defaultSetting ? (
            <Box paddingBlockEnd="100">
              <Text as="p">
                The app will attempt to{' '}
                <Text variant="headingSm" as="span">
                  automatically
                </Text>{' '}
                position the widget, but if automatic placement doesn’t work,
                you can use custom settings to configure the widget's placement
                on your store's theme.
              </Text>
            </Box>
          ) : (
            <>
              <Box paddingBlockStart="100" paddingBlockEnd="100">
                <TextField
                  label={
                    <>
                      <Tooltip
                        content="You can use a CSS selector pointing to the element. Note that if the current element is not found in the page, the widget will be positioned automatically."
                        width="wide"
                        padding="400"
                      >
                        <Text as="p">
                          <div className="flex">
                            Package protection location selector
                            <Icon source={InfoIcon} tone="info" />
                          </div>
                        </Text>
                      </Tooltip>
                    </>
                  }
                  autoComplete="yes"
                  placeholder="Example: #elementId"
                  onChange={(cssSelector) =>
                    formState.addToStaged({ cssSelector })
                  }
                  onBlur={(event) => {
                    const target = event?.target as HTMLInputElement;
                    if (target.value !== '') {
                      formState.commitStaged();
                    } else {
                      formState.addToStaged({
                        cssSelector: state.cssSelector,
                      });
                    }
                  }}
                  value={formState.staged.cssSelector}
                  showCharacterCount
                  maxLength={100}
                />
              </Box>
              <Box paddingBlockStart="400" paddingBlockEnd="100">
                <Select
                  onChange={(position: ElementPlacementPosition) =>
                    formState.addToStaged({ position })
                  }
                  onBlur={() => formState.commitStaged()}
                  value={formState.staged.position}
                  options={labels}
                  label={'Package protection placement'}
                />
              </Box>
            </>
          )}{' '}
          {/* <Divider />
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <b>Placement</b>
            <Box paddingBlockStart="100">
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
          </Box> */}
        </FormLayout.Group>
      </FormLayout>
    </ShadowBevelBox>
  );
};

export default PlacementCard;
