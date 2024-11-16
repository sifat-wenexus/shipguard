import { hexToHsba, hsbaToHexWithAlpha, parseRgba, rgbaToHsba } from '~/modules/utils/color-utils';
import type { ColorPickerProps as BaseProps } from '@shopify/polaris';
import { useCallback, useMemo, useState } from 'react';
import * as Icons from '@shopify/polaris-icons';
import type { FC } from 'react';

import {
  ColorPicker as Base,
  TextField,
  hsbToRgb,
  Popover,
  Divider,
  Icon,
  Box
} from '@shopify/polaris';

interface ColorPicker extends Omit<BaseProps, 'id' | 'fullWidth'> {
  className?: string;
  label: string;
}

export const ColorPicker: FC<ColorPicker> = ({
  label,
  className,
  ...props
}) => {
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const [active, setActive] = useState(false);
  const hex = useMemo(() => hsbaToHexWithAlpha(props.color), [props.color]);
  const rgba = useMemo(() => {
    const rgb = hsbToRgb(props.color);

    return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${props.color.alpha?.toPrecision(2)})`;
  }, [props.color]);

  const onRGBAChange = useCallback((rgbaString: string) => props.onChange(rgbaToHsba(parseRgba(rgbaString))), [props.onChange]);

  const onHexChange = useCallback((hex: string) => props.onChange(hexToHsba(hex)), [props.onChange]);

  return (
    <Popover
      onClose={toggleActive}
      ariaHaspopup={false}
      active={active}
      sectioned
      activator={
        <div
          className={`!overflow-clip Polaris-Button Polaris-Button--pressable Polaris-Button--variantSecondary Polaris-Button--sizeMedium Polaris-Button--textAlignCenter Polaris-Button--disclosure !p-0 !leading-loose  ${className}`}
          onClick={toggleActive}
          tabIndex={0}
        >
          <div className="h-full w-full Polaris-Button__Content flex justify-around items-center">
            <p className="Polaris-Button__Text text-nowrap pl-2">{label}</p>
            <div className="Polaris-Button__Icon">
              <Icon source={Icons.SelectIcon} />
            </div>
          </div>
          <div
            className="h-full w-full min-w-8"
            style={{
              backgroundImage:
                'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            }}
          >
            <div
              className="h-full w-full"
              style={{
                backgroundColor: rgba,
              }}
            >
              &nbsp;
            </div>
          </div>
        </div>
      }
    >
      <Base {...props} fullWidth />

      <div className="mt-4 mb-1">
        <Divider />
      </div>

      <Box paddingBlockEnd="200">
        <TextField label="Hex" autoComplete={'off'} value={hex} onChange={onHexChange} />
        <TextField label="RGBA" autoComplete={'off'} value={rgba} onChange={onRGBAChange} />
      </Box>
    </Popover>
  );
};
