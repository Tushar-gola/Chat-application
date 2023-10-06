import { cva, VariantProps } from "class-variance-authority";
import { memo, ReactNode } from "react";

const boxStyle = cva("flex", {
  variants: {
    stack: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
  },
  defaultVariants: {
    stack: "horizontal",
  },
});

type BoxBaseProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof boxStyle>;

type BoxProps<E extends React.ElementType> = BoxBaseProps<E> & Omit<React.ComponentProps<E>, keyof BoxBaseProps>;

const BoxBase = <E extends React.ElementType>({ children, as, className, stack, ...props }: BoxProps<E>): JSX.Element => {
  const Component = as || "div";

  return (
    <Component className={boxStyle({ stack, className })} {...props}>
      {children}
    </Component>
  );
};

export const Box = memo(BoxBase) as typeof BoxBase;
