"use client";

import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { Icons } from "../../svgs/icons";
import { Box } from "../layouts/box";
import { InputIcon } from "./_input-parts/input-icon";
import { InputLayout } from "./_input-parts/input-layout";

export const inputPasswordStyle = cva(
  "bg-gray-50 w-full h-8 px-4 py-2 rounded-md border-2 font-lato font-normal text-base leading-5 transition-all duration-200 ease-custom-in-out",
  {
    variants: {
      state: {
        default: "border-gray-100",
        negative: "border-red-500 bg-red-50",
        positive: "border-green-500",
      },
      leftIcon: {
        true: "pl-11",
        false: "pl-4",
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
} & VariantProps<typeof inputPasswordStyle> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputPassword = forwardRef<HTMLInputElement, InputTextProps>(
  ({ name, label, type, placeholder, leftIcon, info, error, className, required, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <InputLayout name={name} label={label} error={error} info={info} className={className} required={required}>
        <Box className="w-full h-8 relative">
          <input
            ref={ref}
            placeholder={placeholder}
            className={inputPasswordStyle({ leftIcon: !!leftIcon, state: error ? "negative" : "default" })}
            type={show ? "text" : type}
            name={name}
            {...props}
          />
          {!show ? (
            <InputIcon position="right" onClick={() => setShow(true)}>
              <Icons.PasswordEyeOff />
            </InputIcon>
          ) : (
            <InputIcon position="right" onClick={() => setShow(false)}>
              <Icons.PasswordEye />
            </InputIcon>
          )}
        </Box>
      </InputLayout>
    );
  }
);

InputPassword.displayName = "InputPassword";
