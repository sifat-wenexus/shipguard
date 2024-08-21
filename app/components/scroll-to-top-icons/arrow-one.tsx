import type { ScrollToTopIcon } from './scroll-to-top-icon';

export const ArrowOne: ScrollToTopIcon = ({
  color,
  bgColor,
  heightWidth = '52',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 44 44"
    fill="none"
    height={heightWidth}
    width={heightWidth}
    style={{ backgroundColor: bgColor }}
  >
    <path
      d="M32.5157 27.5411C32.2056 27.8349 31.785 28 31.3464 28C30.9078 28 30.4872 27.8349 30.1771 27.5411L21.99 19.7831L13.803 27.5411C13.491 27.8266 13.0732 27.9846 12.6396 27.981C12.2059 27.9774 11.7911 27.8126 11.4844 27.522C11.1778 27.2314 11.0038 26.8383 11.0001 26.4274C10.9963 26.0165 11.163 25.6206 11.4643 25.325L20.8207 16.4589C21.1308 16.1651 21.5514 16 21.99 16C22.4286 16 22.8492 16.1651 23.1594 16.4589L32.5157 25.325C32.8258 25.6189 33 26.0175 33 26.4331C33 26.8486 32.8258 27.2472 32.5157 27.5411Z"
      fill={color}
    />
    <rect x="1" y="1" width="42" height="42" stroke={''} strokeWidth="2" />
  </svg>
);
