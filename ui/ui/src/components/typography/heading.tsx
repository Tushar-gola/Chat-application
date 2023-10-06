import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";

const headingStyle = cva("font-sen font-bold", {
  variants: {
    variant: {
      h1: "text-6xl leading-[72px] -tracking-wide",
      h2: "text-5xl leading-[56px] -tracking-wide",
      h3: "text-4xl leading-[46px] -tracking-wide",
      h4: "text-3xl leading-10 -tracking-wide",
      h5: "text-2xl leading-10 -tracking-wide",
      h6: "text-xl leading-10 -tracking-wide",
    },
    colors: {
      primary: "",
      secondary: "",
      tertiary: "",
    },
  },
  defaultVariants: {
    variant: "h4",
    colors: "primary",
  },
});

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> &
  VariantProps<typeof headingStyle>;

export const Heading: FC<HeadingProps> = ({ children, as = "h4", variant, colors, className, ...props }) => {
  const Component = as;

  return (
    <Component className={headingStyle({ variant, colors, className })} {...props}>
      {children}
    </Component>
  );
};
