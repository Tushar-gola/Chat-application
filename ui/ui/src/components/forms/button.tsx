import { cva, VariantProps } from "class-variance-authority";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, memo } from "react";
import { Loader } from "../../svgs/loader";

type ButtonBaseProps = VariantProps<typeof buttonStyle> & {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
};

interface ButtonAsAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

type ButtonProps = ButtonBaseProps & (ButtonAsAnchorProps | ButtonAsButtonProps);

const buttonStyle = cva(
  "px-4 disabled:opacity-60  disabled:cursor-not-allowed flex items-center justify-center rounded-md transition-all duration-200 ease-custom-in-out hover:ease-custom-in-out",
  {
    variants: {
      variant: {
        primary: "bg-teal-800 hover:bg-teal-700 hover:disabled:bg-teal-800 active:bg-teal-600 text-white",
        primary_outline: "border-teal-800 border-2 hover:bg-teal-100 hover:disabled:bg-teal-500 active:bg-teal-200 text-teal-800",
        primary_ghost: "bg-teal-50 hover:bg-teal-100 hover:disabled:bg-teal-50 active:bg-teal-200 text-teal-500",
        default: "bg-teal-900 hover:bg-black hover:disabled:bg-teal-900 active:bg-teal-800 text-white",
        default_outline: "bg-gray-50 hover:bg-teal-100 active:bg-teal-200 text-teal-900 border-2 border-gray-100",
        default_ghost: "bg-teal-50 hover:bg-teal-100 active:bg-teal-200 text-teal-900 ",
        link: "hover:bg-teal-50 active:bg-teal-50 text-teal-900 ",
        social: "bg-transparent hover:bg-teal-100 active:bg-teal-200 text-teal-900 border-2 border-teal-100",
      },
      size: {
        md: "text-sm h-8 px-4 min-w-fit",
        lg: "text-base h-10  px-6 min-w-fit",
      },
      fullWidth: {
        true: "w-full",
        false: "w-max",
      },
    },
    defaultVariants: {
      fullWidth: false,
      variant: "primary",
      size: "lg",
    },
  }
);

export const Button = memo(
  ({ children, variant, size, loading, disabled, className, fullWidth, leftIcon, ...props }: ButtonProps) => {
    const classes = buttonStyle({ variant, size, className: className, fullWidth });
    const isDisabled = disabled || loading;

    if ("href" in props && props.href !== undefined) {
      return (
        <a {...props} className={classes}>
          {loading ? <Loader.BaseLoader color="white" /> : children}
        </a>
      );
    }

    return (
      <button type="button" disabled={isDisabled} {...props} className={classes}>
        <div className="flex gap-2">
          {!loading && leftIcon}
          {loading ? "Loading..." : children}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";
