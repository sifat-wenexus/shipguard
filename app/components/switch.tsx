import type { FC } from 'react';

export const Switch: FC<SwitchProps> = ({ isOn, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(!isOn)}
      className={`flex w-12 h-6 ${
        isOn ? 'bg-[#29845A]' : 'bg-gray-500 duration-500'
      } relative drop-shadow-2xl rounded-full cursor-pointer`}
    >
      <span
        className={`h-4 w-4 absolute top-1 left-1 bg-white rounded-full active:border-4 active:border-solid border-zinc-800 ${
          isOn && 'ml-6'
        } transition-all duration-500 ease-out shadow-2xl  flex items-center justify-center`}
      ></span>
    </div>
  );
};

export interface SwitchProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
}
