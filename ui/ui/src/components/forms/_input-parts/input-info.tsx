import { ReactNode } from "react";

import { Text } from "../../typography/text";

type InputInfoProps = {
  children?: ReactNode;
  className?: string;
};

export const InputInfo = ({ children, className }: InputInfoProps) => {
  return (
    <Text variant="info" className={className}>
      {children as string}
    </Text>
  );
};
