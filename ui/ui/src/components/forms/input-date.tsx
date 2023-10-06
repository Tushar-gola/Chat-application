import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, ReactNode, useState } from "react";
import { FieldError } from "react-hook-form";
import { Box } from "../layouts/box";
import { InputIcon } from "./_input-parts/input-icon";
import { InputLayout } from "./_input-parts/input-layout";

export const inputDateStyle = cva(
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
  error?: FieldError;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  required?: boolean;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
} & VariantProps<typeof inputDateStyle> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputDate = forwardRef<HTMLInputElement, InputTextProps>(
  ({ name, label, type, placeholder, leftIcon, rightIcon, info, error, className, required, onPaste, ...props }, ref) => {
    const [inputType, setInputType] = useState(type);
    const [formationError, setFormationError] = useState<FieldError | undefined>(error);

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (onPaste) {
        onPaste(event);
      }
      const pastedData = event.clipboardData.getData("text/plain");
      const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
      if (!regex.test(pastedData)) {
        setFormationError({ message: "Wrong format. Please paste value as YYYY-MM-DD" } as FieldError);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      console.log("InputDate onBlur event");
      setInputType(type);
      setFormationError(undefined);
    };

    return (
      <InputLayout name={name} label={label} error={formationError} info={info} className={className} required={required}>
        <Box className="w-full max-h-8 relative">
          {leftIcon && <InputIcon position="left" />}
          <input
            ref={ref}
            placeholder={placeholder}
            className={inputDateStyle({
              leftIcon: !!leftIcon,
              state: formationError ? "negative" : "default",
              class: className,
            })}
            type={inputType}
            name={name}
            onBlur={handleBlur}
            onPaste={handlePaste}
            {...props}
          />
          {rightIcon && <InputIcon position="right" />}
        </Box>
      </InputLayout>
    );
  }
);

InputDate.displayName = "InputDate";
