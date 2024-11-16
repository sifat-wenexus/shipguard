import type { HSBAColor, RGBAColor } from '@shopify/polaris';
import { hsbToHex, rgbToHsb } from '@shopify/polaris';
import { Optional } from '~/types/type-utils';

export function parseRgba(rgbaString: string): RGBAColor {
  const rgba = rgbaString
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .split(',')
    .map((value) => Number(value.trim()));

  return {
    red: rgba[0],
    green: rgba[1],
    blue: rgba[2],
    alpha: rgba[3],
  };
}

export function rgbaToHsba(rgba: RGBAColor): HSBAColor {
  const hsb = rgbToHsb(rgba);

  return {
    ...hsb,
    alpha: rgba.alpha,
  };
}

export function hexToRgba(hex: string): RGBAColor {
  const hexValue = hex.replace('#', '');

  const alpha = hexValue.length === 8 ? hexValue.slice(6, 8) : 'FF';

  const red = hexValue.slice(0, 2);
  const green = hexValue.slice(2, 4);
  const blue = hexValue.slice(4, 6);

  return {
    red: parseInt(red, 16),
    green: parseInt(green, 16),
    blue: parseInt(blue, 16),
    alpha: parseInt(alpha, 16) / 255,
  };
}

export function hexToHsba(hex: string): HSBAColor {
  return rgbaToHsba(hexToRgba(hex));
}

export function hsbaToHexWithAlpha(hsba: Optional<HSBAColor, 'alpha'>) {
  const hexWithoutAlpha = hsbToHex(hsba);

  if (hsba.alpha === undefined || hsba.alpha === 1) {
    return hexWithoutAlpha;
  }

  const alpha = Math.round(hsba.alpha * 255)
    .toString(16)
    .padStart(2, '0');

  return `${hexWithoutAlpha}${alpha}`;
}
