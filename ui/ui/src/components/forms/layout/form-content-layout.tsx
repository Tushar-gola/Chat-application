import { cx } from "class-variance-authority";
import { ReactNode, memo } from "react";
import { Loader } from "../../../svgs/loader";
import { Text } from "../../typography/text";

type FormContentLayoutProps = {
  title: string;
  description?: string;
  leftContent?: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
};

export const FormContentLayout = memo(
  ({ children, title, description, leftContent, isLoading, className, titleClassName }: FormContentLayoutProps) => {
    return (
      <div className={cx("grid grid-cols-1 gap-4", className)}>
        <div
          className={cx(
            "px-4 py-3 flex justify-between items-center gap-2 border-2 border-gray-100 rounded-lg bg-teal-800 ",
            titleClassName
          )}
        >
          <Text variant="caption" className="font-semibold uppercase text-white ">
            {title}
          </Text>
          {/* <Text variant="body_sm" className="text-gray-500">
          {description}
        </Text> */}
          {leftContent}
        </div>
        <div className="p-4 col-span-2 grid gap-4">
          <Loader.IconWithLoader loading={isLoading}>{children}</Loader.IconWithLoader>
        </div>
      </div>
    );
  }
);
