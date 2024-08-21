import { FC, InputHTMLAttributes } from 'react';

interface IRadio extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: any) => void;
  onBlur?: () => void;
  checked: boolean;
  label: string;
  id: string;
  type?: string;
}

const Radio: FC<IRadio> = ({
  onChange,
  onBlur = () => {},
  checked,
  label,
  id,
  type = 'radio',
  ...props
}) => {
  return (
    <div className="flex items-center mt-2" key={id}>
      <input
        className="w-4 h-4  cursor-pointer"
        type={type}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        checked={checked}
        {...props}
      />
      <label htmlFor={id} className="ml-2 wenexus-radio-label  cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Radio;
