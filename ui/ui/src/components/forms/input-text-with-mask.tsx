import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, ReactNode, useState } from "react";
import { FieldError } from "react-hook-form";
import { IMaskMixin } from "react-imask";
import { Box } from "../layouts/box";
import { InputIcon } from "./_input-parts/input-icon";
import { InputLayout } from "./_input-parts/input-layout";

const inputTextStyle = cva(
  "bg-gray-50 w-full h-8 p-0 rounded-md border-2 font-lato font-normal text-base leading-5 transition-all duration-200 ease-custom-in-out",
  {
    variants: {
      state: {
        default: "border-gray-100",
        negative: "border-red-500 bg-red-50",
        positive: "border-green-500",
      },
      leftIcon: {
        true: "pl-11",
        false: "pl-2",
      },
    },
    defaultVariants: {
      leftIcon: false,
      state: "default",
    },
  }
);

type InputTextProps = {
  label?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  info?: string;
  defaultValue?: string | number;
  error?: FieldError;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & VariantProps<typeof inputTextStyle> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const IMaskInput = IMaskMixin<any, any, any, HTMLInputElement, InputTextProps>(({ inputRef, ...props }) => (
  <input ref={inputRef} {...props} />
));

const PLACEHOLDER = "0 %";
const MASK = [
  {
    mask: "num %",
    lazy: false,

    blocks: {
      num: {
        mask: Number,
        signed: false,
        scale: 2,
        lazy: false,
        min: 0,
        max: 100,
        radix: ".",
      },
    },
  },
];

export const InputTextWithMask = forwardRef<HTMLInputElement, InputTextProps>(
  (
    { name, label, type, placeholder, leftIcon, rightIcon, info, defaultValue, error, className, required, onChange, ...props },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue?.toString() || "");
    const handleAccept = (v: any) => {
      setValue(v);
      onChange && onChange(v);
    };

    return (
      <InputLayout name={name} label={label} error={error} info={info} className={className} required={required}>
        <Box className="w-full max-h-8 relative">
          {leftIcon && <InputIcon position="left" />}
          {/* @ts-ignore */}
          <IMaskInput
            onAccept={handleAccept}
            mask={MASK}
            placeholder={PLACEHOLDER}
            className={inputTextStyle({
              leftIcon: !!leftIcon,
              state: error ? "negative" : "default",
              class: className,
            })}
            type={type}
            name={name}
            value={value}
            {...props}
          />
          {rightIcon && <InputIcon position="right" />}
        </Box>
      </InputLayout>
    );
  }
);

InputTextWithMask.displayName = "InputTextWithMask";
