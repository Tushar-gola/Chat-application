import { ReactNode } from "react";
import { Text } from "../../typography/text";

type InputLabelProps = {
  children: ReactNode;
  name?: string;
  required?: boolean;
};

export const InputLabel = ({ children, name, required }: InputLabelProps) => {
  return (
    <Text as="label" variant="label" htmlFor={name} className="h-8 items-center flex">
      {children as string} {required && <span className="text-red-500">*</span>} :
    </Text>
  );
};
