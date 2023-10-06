import { cva, VariantProps } from "class-variance-authority";
import React from "react";

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

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is a new type utitlity with ref!
type PolymorphicComponentPropWithRef<C extends React.ElementType, Props = {}> = PolymorphicComponentProp<C, Props> & {
  ref?: PolymorphicRef<C>;
};

// This is the type for the "ref" only
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];

/**
 * This is the updated component props using PolymorphicComponentPropWithRef
 */
type BoxProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<C, { className?: string } & VariantProps<typeof boxStyle>>;

/**
 * This is the type used in the type annotation for the component
 */
type BoxComponent = <C extends React.ElementType = "div">(props: BoxProps<C>) => React.ReactElement | null;

// eslint-disable-next-line react/display-name
export const Box: BoxComponent = React.forwardRef(
  <C extends React.ElementType = "div">({ as, stack, className, children }: BoxProps<C>, ref?: PolymorphicRef<C>) => {
    const Component = as || "div";

    return (
      <Component className={boxStyle({ stack, className })} ref={ref}>
        {children}
      </Component>
    );
  }
);
