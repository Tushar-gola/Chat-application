import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

export const checkboxStyle = cva("w-6 h-6 border-2 rounded-lg text-red-blue-500 transition-all duration-200 ease-custom-in-out cursor-pointer", {
  variants: {
    state: {
      default: "border-gray-100 bg-slate-50",
      error: "border-red-500 bg-red-50",
    },
  },
});

export type CheckProps = VariantProps<typeof checkboxStyle> & {
  error?: FieldError;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Check = forwardRef<HTMLInputElement, CheckProps>(({ className, name, error, ...props }, ref) => {
  return <input type="checkbox" className={checkboxStyle({ class: className, state: error ? "error" : "default" })} name={name} {...props} ref={ref} />;
});

Check.displayName = "Check";
