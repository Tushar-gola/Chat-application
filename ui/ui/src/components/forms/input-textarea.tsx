import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { InputLayout } from "./_input-parts/input-layout";

type InputTextProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  info?: string;
  error?: FieldError;
  preElement?: ReactNode;
} & VariantProps<typeof textStyle> &
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const textStyle = cva(
  "pl-4 bg-gray-50 w-full rounded-md border-2 font-lato font-normal text-base leading-5 transition-all duration-200 ease-custom-in-out",
  {
    variants: {
      state: {
        default: "border-gray-100",
        negative: "border-red-500 bg-red-50",
        positive: "border-green-500",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextProps>(
  ({ name, label, placeholder, info, error, className, required, preElement, ...props }, ref) => {
    return (
      <InputLayout name={name} label={label} error={error} info={info} className={className} required={required}>
        <div className="grid w-full gap-2">
          {preElement}
          <textarea
            ref={ref}
            placeholder={placeholder}
            className={textStyle({
              state: error ? "negative" : "default",
              class: className,
            })}
            name={name}
            rows={4}
            {...props}
          />
        </div>
      </InputLayout>
    );
  }
);

InputTextArea.displayName = "InputTextArea";
