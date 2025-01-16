import type { FC } from 'react';

import { PackageYellow } from '../icons/package-yellow';
import { PackageGreen } from '../icons/package-green';
import { PackageBlack } from '../icons/package-black';
import { PackageOne } from '../icons/package-one';
export type ScrollToTopIcon = FC<{
  color: string;
  bgColor: string;
  heightWidth?: string;
}>;

export const packageIcons = [
  {
    id: 'one',
    icon: PackageGreen,
  },
  {
    id: 'two',
    icon: PackageYellow,
  },
  {
    id: 'three',
    icon: PackageBlack,
  },
  // {
  //   id: 'four',
  //   icon: PackageOne,
  // },
];
