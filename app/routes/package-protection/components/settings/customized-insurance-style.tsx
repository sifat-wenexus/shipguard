import { hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import { ShadowBevelBox } from '~/components/shadow-bevel-box';
import { ColorPicker2 } from '~/components/color-picker-2';
import { IconsIcon } from '@shopify/polaris-icons';
import { packageIcons } from '../package-icons';
import {
  InlineStack,
  EmptyState,
  FormLayout,
  Icon,
  Box,
} from '@shopify/polaris';

const CustomizedInsuranceStyle = ({ formState }) => {
  const { state } = formState;
  return (
    <ShadowBevelBox
      icon={<Icon source={IconsIcon} />}
      title="Customized insurance style"
      className="my-4"
    >
      <FormLayout>
        <FormLayout.Group>
          <Box>Insurance icon</Box>

          <Box paddingBlockStart="100" paddingBlockEnd="100">
            {packageIcons.length === 0 ? (
              <div style={{ '--p-space-1600': '0' } as any}>
                <EmptyState
                  heading="No icons available, please contact support"
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png?width=140&height=140"
                />
              </div>
            ) : (
              <InlineStack gap="200" wrap>
                {packageIcons.map((icon) => (
                  <div
                    key={icon.id}
                    className={`p-4 m-2 mt-0 ml-0 hover:scale-105 cursor-pointer hover:drop-shadow-xl ${
                      icon.id === state.icon
                        ? 'ring-2 ring-green-500 ring-offset-0 rounded-md'
                        : 'outline-dashed outline-1 outline-offset-0 rounded-md'
                    }`}
                    onClick={() => formState.addChange({ icon: icon.id })}
                  >
                    <icon.icon />
                  </div>
                ))}
              </InlineStack>
            )}
          </Box>
          <Box paddingBlockStart="100" paddingBlockEnd="100">
            <ColorPicker2
              onChange={(switchColor) =>
                formState.addChange({
                  switchColor,
                })
              }
              placeholder={hsbaToHexWithAlpha(
                formState.staged.switchColor
              ).replace('#', '')}
              color={formState.staged.switchColor}
              label={'Insurance switch color'}
              className="!w-full"
              allowAlpha={false}
            />
          </Box>
        </FormLayout.Group>
      </FormLayout>
    </ShadowBevelBox>
  );
};

export default CustomizedInsuranceStyle;
