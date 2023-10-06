import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

type HelperTextProps = VariantProps<typeof helperStyle> & {
  children: ReactNode;
  className?: string;
};

const helperStyle = cva(
  "hidden group-hover:block transition-opacity bg-teal-800 px-3 py-2 text-sm text-gray-100 rounded-md absolute mx-auto z-50 whitespace-nowrap",
  {
    variants: {
      placement: {
        left: "translate-y-0 -top-2 -bottom-2 right-0 -translate-x-6",
        right: "translate-y-0 -top-2 -bottom-2 left-0 translate-x-6",
        bottom: "translate-y-full -bottom-2 left-0 translate-x-0",
        top: "-translate-y-full -top-2 left-0 translate-x-0",
      },
    },
    defaultVariants: {
      placement: "left",
    },
  }
);

export const HelperText = ({ children, placement, className }: HelperTextProps) => {
  return (
    <>
      <span className={helperStyle({ placement, class: className })}>{children}</span>
    </>
  );
};
