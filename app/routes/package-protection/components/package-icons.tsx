import type { FC } from 'react';
import { ArrowFive } from '~/components/scroll-to-top-icons/arrow-five';
import { ArrowOne } from '~/components/scroll-to-top-icons/arrow-one';
import { ArrowSix } from '~/components/scroll-to-top-icons/arrow-six';
import { ArrowTen } from '~/components/scroll-to-top-icons/arrow-ten';
import { PackageOne } from './icons/package-one';
import { PackageTwo } from './icons/package-two';
import { PackageThree } from './icons/package-three';
import { PackageGreen } from './icons/package-green';
import { PackageYellow } from './icons/package-yellow';
import { PackageBlack } from './icons/package-black';
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
  {
    id: 'four',
    icon: PackageOne,
  },
];
