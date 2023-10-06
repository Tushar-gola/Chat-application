import { ReactNode, Ref } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { InputLayout } from "./_input-parts/input-layout";
import { Box } from "../layouts/box";
import { cva } from "class-variance-authority";

export type { MultiValue, SingleValue } from "react-select";

const inputDateStyle = cva(
  "bg-gray-50 w-full h-8 p-0 text-black rounded-md border-2 fill-black stroke-black font-lato font-normal text-base leading-5 transition-all duration-200 ease-custom-in-out",
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

type InputDatepickerProps = {
  startFromToday?: boolean;
  ref?: Ref<DatePicker>;
  label?: string;
  name?: string;
  placeholder?: string;
  info?: string;
  className?: string;
  value?: Date;
  onChange: (value: Date) => void;
  extra?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: Merge<
    FieldError,
    FieldErrorsImpl<{
      value: string;
      label: string;
      disabled: NonNullable<boolean | undefined>;
      isSelected: NonNullable<boolean | undefined>;
    }>
  >;
};
export const InputDatePicker = (props: InputDatepickerProps): JSX.Element => {
  const {
    name,
    label,
    placeholder,
    info,
    className,
    error,
    extra,
    required,
    onChange,
    value,
    disabled = false,
    ref,
    startFromToday = false,
    ...rest
  } = props;
  return (
    <InputLayout name={name} label={label} error={error as FieldError} info={info} className={className} required={required}>
      <Box className="w-full max-h-8 relative ">
        <DatePicker
          ref={ref}
          required={required}
          disabled={disabled}
          placeholderText="Click to select a date"
          className={inputDateStyle({
            state: error ? "negative" : "default",
            class: className,
          })}
          selected={value}
          minDate={startFromToday ? new Date() : null}
          wrapperClassName="w-full"
          onSelect={onChange} //when day is clicked
          onChange={onChange} //only when value has changed
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15}
          showMonthDropdown
          isClearable={!disabled}
          todayButton="Today"
        />
      </Box>
    </InputLayout>
  );
};
