import { hexToHsba, hsbaToHexWithAlpha } from '~/modules/utils/color-utils';
import type { ColorPickerProps as BaseProps } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';

import {
  ColorPicker as Base,
  TextField,
  Popover,
  Divider,
  Box,
} from '@shopify/polaris';
import useDebounce from '~/hooks/use-debounce';

interface ColorPicker extends Omit<BaseProps, 'id' | 'fullWidth'> {
  placeholder: string;
  className?: string;
  label: string;
}

export const ColorPicker2: FC<ColorPicker> = ({
  label,
  className,
  placeholder,
  ...props
}) => {
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const [active, setActive] = useState(false);
  const [hex, setHex] = useState(hsbaToHexWithAlpha(props.color));

  const code = useDebounce(hex, 200);
  useEffect(() => {
    if (code.length === 6) {
      props.onChange(hexToHsba(code));
    } else {
      return;
    }
  }, [code]);

  useEffect(() => {
    setHex(hsbaToHexWithAlpha(props.color));
  }, [props.color]);

  const onHexChange = useCallback(
    (hex: string) => {
      function isHex(char: string): boolean {
        return /[0-9A-Fa-f]/.test(char);
      }
      const valid = isHex(hex[hex.length - 1]);
      if (valid) {
        setHex(hex);
      }
    }, //props.onChange(hexToHsba(hex)),
    [props.onChange]
  );

  const onBlurEvent = useCallback(() => {
    if (hex.length < 7) {
      setHex('#' + placeholder);
    }
  }, [hex]);

  return (
    <div className="wenexus-color-picker">
      <Popover
        onClose={toggleActive}
        ariaHaspopup={false}
        active={active}
        sectioned
        activator={
          <TextField
            label={label}
            autoComplete={'off'}
            value={hex?.replace('#', '')}
            onChange={onHexChange}
            onBlur={onBlurEvent}
            maxLength={6}
            prefix="#"
            placeholder={placeholder}
            connectedLeft={
              <p
                onClick={toggleActive}
                className={`h-[30px] w-[30px] rounded-md border border-[#898f94] cursor-pointer custom-size`}
                style={{ backgroundColor: '#' + placeholder }}
              ></p>
            }
          />
        }
      >
        <Base {...props} fullWidth />

        <div className="mt-4 mb-1">
          <Divider />
        </div>

        <Box paddingBlockEnd="200">
          <TextField
            label=""
            autoComplete={'off'}
            value={hex?.replace('#', '')}
            onChange={onHexChange}
            onBlur={onBlurEvent}
            maxLength={6}
            prefix="#"
            placeholder={placeholder}
          />
        </Box>
      </Popover>
    </div>
  );
};
