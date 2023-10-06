import { cva, VariantProps } from "class-variance-authority";
import React, { memo, ReactNode } from "react";

const textStyle = cva("font-lato", {
  variants: {
    variant: {
      header: "font-bold text-2xl",
      label: "font-bold text-base -tracking-[0.01em]",
      label_sm: "font-bold text-sm leading-[20px] -tracking-[0.01em]",
      description: "font-normal text-xl leading-[28px] -tracking-[0.025em]",
      modal_header: "font-normal text-xl leading-[30px] -tracking-[0.01em]",
      body_lg: "font-normal text-lg leading-[20px] -tracking-[0.01em]",
      body: "font-normal text-base leading-[20px] -tracking-[0.01em]",
      body_sm: "font-normal text-[15px] leading-[18px] -tracking-[0.01em]",
      body_xs: "font-normal text-[14px] leading-[18px] -tracking-[0.01em]",
      button: "font-normal text-xl leading-[24px] -tracking-[0.01em]",
      button_sm: "font-normal text-base leading-[20px] -tracking-[0.01em]",
      info: "font-normal text-sm leading-[16px] -tracking-[0.01em]",
      caption: "font-normal text-sm leading-[20px] -tracking-[0.01em] uppercase",
    },
    colors: {
      primary: "",
      secondary: "",
      tertiary: "",
    },
    align: {
      left: "",
      center: "",
      right: "",
    },
  },
  defaultVariants: {
    variant: "body",
    colors: "primary",
    align: "left",
  },
});

type TextBaseProps<E extends React.ElementType = React.ElementType> = {
  children: ReactNode;
  className?: string;
  as?: E;
  style?: React.CSSProperties;
} & VariantProps<typeof textStyle>;

type TextProps<E extends React.ElementType> = TextBaseProps<E> & Omit<React.ComponentProps<E>, keyof TextBaseProps>;

const TextBase = <E extends React.ElementType>({ children, as, variant, colors, className, ...props }: TextProps<E>): JSX.Element => {
  const Component = as || "p";
  return (
    <Component className={textStyle({ variant, colors, class: className })} {...props}>
      {children}
    </Component>
  );
};

export const Text = memo(TextBase) as typeof TextBase;
