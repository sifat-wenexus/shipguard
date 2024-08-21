import { ArrowSeven } from './arrow-seven';
import { ArrowEight } from './arrow-eight';
import { ArrowThree } from './arrow-three';
import { ArrowFour } from './arrow-four';
import { ArrowNine } from './arrow-nine';
import { ArrowFive } from './arrow-five';
import { ArrowSix } from './arrow-six';
import { ArrowTwo } from './arrow-two';
import { ArrowTen } from './arrow-ten';
import { ArrowOne } from './arrow-one';
import type { FC } from 'react';

export type ScrollToTopIcon = FC<{
  color: string;
  bgColor: string;
  heightWidth?: string;
}>;

export const scrollToTopIcons = [
  {
    id: 'one',
    icon: ArrowOne,
  },
  {
    id: 'two',
    icon: ArrowTwo,
  },
  {
    id: 'three',
    icon: ArrowThree,
  },
  {
    id: 'four',
    icon: ArrowFour,
  },
  {
    id: 'five',
    icon: ArrowFive,
  },
  {
    id: 'six',
    icon: ArrowSix,
  },
  {
    id: 'seven',
    icon: ArrowSeven,
  },
  {
    id: 'eight',
    icon: ArrowEight,
  },
  {
    id: 'nine',
    icon: ArrowNine,
  },
  {
    id: 'ten',
    icon: ArrowTen,
  },
];
