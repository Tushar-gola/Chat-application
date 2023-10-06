import * as Select from "@radix-ui/react-select";
import { Control, FieldError, useController } from "react-hook-form";
import { Icons } from "../../svgs/icons";
import { checkboxStyle } from "./_input-parts/check";
import { InputLayout } from "./_input-parts/input-layout";

type OptionType = {
  label: string;
  value: string;
};

type InputSelectProps = {
  label: string;
  name: string;
  placeholder?: string;
  info?: string;
  error?: FieldError;
  options: OptionType[];
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  control: Control<any>;
  className?: string;
  required?: boolean;
};

export const InputSelect = ({ label, options, error, info, name, placeholder, control, className, required }: InputSelectProps) => {
  const { field } = useController({
    control,
    name,
  });

  return (
    <InputLayout name={name} label={label} error={error} info={info} className={className} required={required}>
      <Select.Root onValueChange={(event) => field.onChange(event)} value={field.value}>
        <Select.Trigger
          className="w-full bg-gray-50 border-gray-100 justify-between border-2 rounded-md flex h-8 px-4 py-1 font-lato font-normal text-base leading-5 transition-all duration-200 ease-custom-in-out "
          aria-label="Food"
          style={{
            height: "2rem",
          }}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="SelectIcon">
            <Icons.ChevronDown />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal className="transition-all duration-200 ease-custom-in-out z-50">
          <Select.Content
            className="overflow-hidden bg-white border-2 border-gray-100 w-full rounded-lg py-2 cursor-pointer"
            position="item-aligned"
            sideOffset={8}
          >
            <Select.Viewport className="bg-white z-50">
              {options?.map((item) => {
                return (
                  <Select.Item
                    key={item.value}
                    value={item.value}
                    className="flex justify-between p-4 hover:bg-blue-50 font-lato font-normal text-base leading-5 transition-all duration-200 ease-custom-in-out"
                  >
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator className="w-6 h-6 bg-blue-500 rounded-full flex justify-center items-center">
                      <input type="checkbox" defaultChecked className={checkboxStyle({ className: "cursor-default" })} />
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </InputLayout>
  );
};
