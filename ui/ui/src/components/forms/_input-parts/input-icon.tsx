import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const inputIconStyle = cva("absolute inset-y-0 h-8 w-10 flex justify-center items-center cursor-pointer z-20", {
  variants: {
    position: {
      left: "left-0 pl-4 ",
      right: "right-0 ",
    },
  },
  defaultVariants: {
    position: "left",
  },
});

type InputIconProps = {
  children?: ReactNode;
  onClick?: () => void;
} & VariantProps<typeof inputIconStyle>;

export const InputIcon = ({ position, children, onClick }: InputIconProps) => {
  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div className={inputIconStyle({ position })} onClick={onClick}>
      {children}
    </div>
  );
};
