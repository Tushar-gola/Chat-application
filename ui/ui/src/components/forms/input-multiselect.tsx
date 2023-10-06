import { ReactNode, forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import Select, { GroupBase, Props } from "react-select";
import type SelectGeneric from "react-select/dist/declarations/src/Select";
import { InputLayout } from "./_input-parts/input-layout";

export type { MultiValue, SingleValue } from "react-select";

type MultiSelectProps<Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> = {
  label?: string;
  name?: string;
  placeholder?: string;
  info?: string;
  className?: string;
  extra?: ReactNode;
  error?: Merge<
    FieldError,
    FieldErrorsImpl<{
      value: string;
      label: string;
      disabled: NonNullable<boolean | undefined>;
      isSelected: NonNullable<boolean | undefined>;
    }>
  >;
} & Props<Option, IsMulti, Group>;

export function InputMultiselectBase<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: MultiSelectProps<Option, IsMulti, Group>, ref?: React.Ref<SelectGeneric<Option, IsMulti, Group>>): JSX.Element {
  const { name, label, placeholder, info, className, error, extra, required } = props;
  return (
    <InputLayout
      name={name}
      label={label}
      info={info}
      className={className}
      error={error as FieldError}
      extra={extra}
      required={required}
    >
      <Select
        ref={ref}
        menuPlacement="auto"
        classNames={{
          control: () => "font-lato font-normal border-gray-100 border-2",
          valueContainer: () => "font-lato font-normal text-base leading-5 gap-1 ",
          indicatorsContainer: () => "h-8 ",
          menuList: () => "z-50",
          container: () => "w-full",
        }}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: error?.message ? "rgb(254 242 242)" : "rgb(249, 250, 251)",
            borderColor: error?.message ? "rgb(239 68 68)" : "rgb(243, 244, 246)",
            borderWidth: "2px",
            borderRadius: "6px",
            height: "100%",
            minHeight: "32px",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menuList: (base) => ({ ...base, zIndex: 9999 }),
          menu: (base) => ({ ...base, zIndex: 9999 }),
          multiValue: (base) => ({ ...base, borderRadius: "4px", paddingLeft: "4px" }),
        }}
        isClearable={true}
        {...props}
      />
    </InputLayout>
  );
}

export const InputMultiselect = forwardRef(InputMultiselectBase) as <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: MultiSelectProps<Option, IsMulti, Group> & { ref?: React.ForwardedRef<SelectGeneric<Option, IsMulti, Group>> }
) => ReturnType<typeof InputMultiselectBase>;
