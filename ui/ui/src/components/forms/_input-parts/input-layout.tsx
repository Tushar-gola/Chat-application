import { memo, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { Box } from "../../layouts/box";
import { InputInfo } from "./input-info";
import { InputLabel } from "./input-label";

type InputTextProps = {
  label?: string;
  name?: string;
  children: ReactNode;
  extra?: ReactNode;
  info?: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
};

export const InputLayout = memo(({ name, label, children, info, error, className, extra, required, ...props }: InputTextProps) => {
  return (
    <Box className={`grid grid-cols-3 gap-2 relative items-start ${className}`}>
      {label && (
        <InputLabel name={name} required={required}>
          {label}
        </InputLabel>
      )}
      <div className={`${label ? "col-span-2" : "col-span-3"}  grid`}>
        <div className="flex gap-2">
          {children}
          {extra}
        </div>
        {info && <InputInfo className="text-gray-700 mt-2">{info}</InputInfo>}
        {error && <InputInfo className="text-red-500 mt-2">{error.message}</InputInfo>}
      </div>
    </Box>
  );
});
