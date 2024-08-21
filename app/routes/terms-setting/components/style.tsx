import { Box, Checkbox, Divider, RangeSlider, Select } from '@shopify/polaris';
import { TextAlignment } from 'prisma/client/default';
import { useMemo } from 'react';
import { ColorPicker2 } from '~/components/color-picker-2';
import { hsbaToHexWithAlpha } from '~/modules/utils/color-utils';

const Style = ({ formState }) => {
  const alignBadges = useMemo(
    () => [
      { label: 'Left', value: 'LEFT' },
      { label: 'Center', value: 'CENTER' },
      { label: 'Right', value: 'RIGHT' },
    ],
    []
  );

  const { state } = formState;
  return (
    <>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <RangeSlider
          label="Text Font Size"
          onChange={(textFontSize: number) =>
            formState.addToStaged({ textFontSize })
          }
          onBlur={() => formState.commitStaged()}
          value={+formState.staged.textFontSize}
          output
          suffix={
            <p
              style={{
                minWidth: '24px',
                textAlign: 'right',
              }}
            >
              {formState.staged.textFontSize}px
            </p>
          }
          min={9}
          max={30}
        />
      </Box>

      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <ColorPicker2
          placeholder={hsbaToHexWithAlpha(state.textColor).replace('#', '')}
          onChange={(textColor) => formState.addChange({ textColor })}
          color={state.textColor}
          label={'Text Color'}
          className="!w-full"
          allowAlpha={false}
        />
      </Box>
      <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
        <Divider />
      </Box>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <RangeSlider
          label="Warning Text Font Size"
          onChange={(warningTextFontSize: number) =>
            formState.addToStaged({ warningTextFontSize })
          }
          onBlur={() => formState.commitStaged()}
          value={+formState.staged.warningTextFontSize}
          output
          suffix={
            <p
              style={{
                minWidth: '24px',
                textAlign: 'right',
              }}
            >
              {formState.staged.warningTextFontSize}px
            </p>
          }
          min={9}
          max={30}
        />
      </Box>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <ColorPicker2
          onChange={(warningTextColor) =>
            formState.addChange({
              warningTextColor,
            })
          }
          color={state.warningTextColor}
          label={'Warning Text Color'}
          className="!w-full"
          allowAlpha={false}
          placeholder={hsbaToHexWithAlpha(state.warningTextColor).replace(
            '#',
            ''
          )}
        />
      </Box>
      <Box paddingBlockStart={'400'} paddingBlockEnd={'400'}>
        <Divider />
      </Box>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <Select
          onChange={(textAlign: TextAlignment) =>
            formState.addToStaged({ textAlign })
          }
          onBlur={() => formState.commitStaged()}
          value={formState.staged.textAlign}
          options={alignBadges}
          label="Align badges"
        />
      </Box>

      <Box>
        <p className="my-1">
          <b>Text Decoration</b>
        </p>
        <Checkbox
          label="Link Text Underline"
          onChange={(textLinkUnderline) =>
            formState.addChange({ textLinkUnderline })
          }
          checked={formState.staged.textLinkUnderline}
        />
      </Box>
      <Box paddingBlockStart="100" paddingBlockEnd="100">
        <ColorPicker2
          onChange={(textLinkColor) =>
            formState.addChange({
              textLinkColor,
            })
          }
          placeholder={hsbaToHexWithAlpha(
            formState.staged.textLinkColor
          ).replace('#', '')}
          color={formState.staged.textLinkColor}
          label={'Link Text Color'}
          className="!w-full"
          allowAlpha={false}
        />
      </Box>
    </>
  );
};

export default Style;
