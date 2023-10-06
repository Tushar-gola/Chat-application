import { VariantProps } from "class-variance-authority";
import { memo, useEffect, useState } from "react";
import { inputTextStyle } from "./input-text";
import { IconX } from "../../../../../apps/web/src/svg/icons";

type DebouncedInputProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> &
  VariantProps<typeof inputTextStyle>;

export const DebouncedInput = memo(
  ({ value: initialValue, onChange, debounce = 500, state, className, ...props }: DebouncedInputProps) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);

    const clearInput = () => {
      setValue("");
      onChange("");
    };

    return (
      <div className="relative max-w-[360px] w-full">
        <input
          {...props}
          className={inputTextStyle({ state, class: `max-w-[360px] ${className}` })}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
            <IconX onClick={clearInput} />
          </div>
        )}
      </div>
    );
  }
);

DebouncedInput.displayName = "DebouncedInput";
