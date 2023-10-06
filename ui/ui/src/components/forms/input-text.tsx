import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { Box } from "../layouts/box";
import { InputIcon } from "./_input-parts/input-icon";
import { InputLayout } from "./_input-parts/input-layout";

export const inputTextStyle = cva(
  "bg-gray-50 w-full h-8 p-0 rounded-md border-2 font-lato font-normal text-base leading-5 transition-all duration-200 ease-custom-in-out",
  {
    variants: {
      state: {
        default: "  border-gray-100",
        negative: "border-red-500 bg-red-50",
        positive: "  border-green-500",
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
  error?: FieldError;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
} & VariantProps<typeof inputTextStyle> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ name, label, type, placeholder, leftIcon, rightIcon, info, error, className, required, ...props }, ref) => {
    return (
      <InputLayout name={name} label={label} error={error} info={info} className={className} required={required}>
        <Box className="w-full max-h-8 relative ">
          {leftIcon && <InputIcon position="left" />}
          <input
            ref={ref}
            placeholder={placeholder}
            className={inputTextStyle({
              leftIcon: !!leftIcon,
              state: error ? "negative" : props.disabled ? "disabled" : "default",
              class: className,
            })}
            type={type ?? "text"}
            name={name}
            {...props}
          />
          {rightIcon && <InputIcon position="right" />}
        </Box>
      </InputLayout>
    );
  }
);

InputText.displayName = "InputText";
