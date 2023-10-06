import { Row, RowData, Table } from "@tanstack/table-core";
import { VariantProps, cva } from "class-variance-authority";
import { FieldError } from "react-hook-form";
import { InputLayout } from "./_input-parts/input-layout";
import { DebouncedInput } from "./debounced-input";

export const inputWithoptionsStyle = cva(
  "bg-gray-50 w-full h-8 p-4 rounded-md border-2 font-lato font-normal text-base leading-5 transition-all duration-200 ease-custom-in-out",
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

type InputTextProps<T extends RowData> = {
  table: Table<T>;
  setFilter?: React.Dispatch<React.SetStateAction<string>>;
  filter?: string;
  render?: (data: Row<T>[]) => React.ReactNode;
  label?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  info?: string;
  error?: FieldError;
} & VariantProps<typeof inputWithoptionsStyle> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputWithOptions = <T extends RowData>({
  name,
  label,
  type,
  placeholder,
  info,
  error,
  className,
  render,
  table,
  setFilter,
  filter,
  ...props
}: InputTextProps<T>) => {
  return (
    <InputLayout name={name} label={label} error={error} info={info} className={className}>
      <div className="grid gap-2 w-full">
        {setFilter && (
          <DebouncedInput value={filter ?? ""} onChange={(value) => setFilter(String(value))} className="max-w-full" placeholder="Search..." type="text" />
        )}
        <div className="bg-white w-full min-h-[300px] max-h-[480px] rounded-md border-2 border-gray-100 font-lato font-normal text-base leading-5 transition-all duration-200 ease-custom-in-out overflow-hidden overflow-y-auto">
          {render && render(table.getRowModel().rows)}
        </div>
      </div>
    </InputLayout>
  );
};

InputWithOptions.displayName = "InputWithOptions";
