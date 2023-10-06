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
        disabled: " border-none bg-inherit",
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

const PLACEHOLDER = "$0.00";
const MASK = [
  {
    mask: "$num",
    lazy: true,
    blocks: {
      num: {
        mask: Number,
        signed: true,
        lazy: true,
        scale: 2,
        radix: ".",
        mapToRadix: [",", "."],
        thousandsSeparator: ",",
        padFractionalZeros: false,
        normalizeZeros: false,
      },
    },
  },
];

export const InputCurrency = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      name,
      label,
      type,
      placeholder,
      leftIcon,
      rightIcon,
      info,
      defaultValue,
      error,
      value,
      className,
      required,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleAccept = (value: any) => {
      const unmaskedVal = value.replace(/[^0-9.]/g, "");
      onChange?.(unmaskedVal);
    };

    return (
      <InputLayout name={name} label={label} error={error} info={info} className={className} required={required}>
        <Box className="w-full max-h-8 relative">
          {leftIcon && <InputIcon position="left" />}
          {/* @ts-ignore */}
          <IMaskInput
            onAccept={handleAccept}
            onChange={handleAccept}
            mask={MASK}
            placeholder={PLACEHOLDER}
            className={inputTextStyle({
              leftIcon: !!leftIcon,
              state: error ? "negative" : props.disabled ? "disabled" : "default",
              class: className,
            })}
            type={"text"}
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

InputCurrency.displayName = "InputTextWithMask";
