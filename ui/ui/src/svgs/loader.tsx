import { cx } from "class-variance-authority";
import React, { memo } from "react";

const defaultColor = "#BDBDBD";

type IconProps = {
  color?: string;
  size?: "h-20" | "h-14" | "h-4";
  className?: string;
  width?: "80" | "40" | "30" | "20";
  height?: "80" | "40" | "30" | "20";
};

const BaseLoader = memo(
  ({ color = defaultColor, size = "h-20", width = "80", height = "80", className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 472.007 472.007"
      enableBackground="new 0 0 472.007 472.007"
      className={cx("fill-current text-teal-900 mx-auto", className)}
      width={width}
      height={height}
      {...props}
    >
      <path d="m259.748 456.007-7.744-240h-32l-7.744 240h-48.256v16h144v-16h-48.256z" />
      <path
        d="m252.876 243.095-.872-27.088h-32l-.872 27.088a31.43 31.43 0 0 0 33.744 0z"
        style={{
          fill: "#fff",
        }}
      />
      <g>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="7s"
          from="0 235 207"
          repeatCount="indefinite"
          to="360 235 207"
          type="rotate"
        />
        <path d="M410.188 294.207a240.063 240.063 0 0 0-150.096-91.8c-.096-.512-.272-.992-.4-1.496a23.865 23.865 0 0 0-.8-2.6c-.224-.608-.48-1.192-.752-1.776s-.688-1.352-1.072-2a24.969 24.969 0 0 0-2.112-3.032c-.36-.44-.688-.904-1.072-1.312a25.694 25.694 0 0 0-1.984-1.864c-.272-.232-.544-.464-.8-.688a24.446 24.446 0 0 0-8.696-4.432V9.951c.061-5.434-4.294-9.889-9.728-9.95a9.84 9.84 0 0 0-9.224 6.126 244.8 244.8 0 0 0-2.144 181.128 24.384 24.384 0 0 0-3.856 3.64c-.168.192-.328.4-.488.6a24.993 24.993 0 0 0-2.496 3.72c-.2.368-.408.728-.592 1.112a25.125 25.125 0 0 0-1.464 3.904c-.128.456-.304.88-.416 1.344a25.083 25.083 0 0 0-.664 5.6c0 .664.144 1.296.192 1.952L64.932 294.503c-4.724 2.78-6.333 8.844-3.608 13.6a9.839 9.839 0 0 0 9.8 4.888 239.814 239.814 0 0 0 152.88-84.184 24.54 24.54 0 0 0 4.424 1.928c.544.184 1.096.376 1.656.52s1.12.256 1.696.352c1.366.26 2.753.394 4.144.4 1.658 0 3.312-.169 4.936-.504a23.528 23.528 0 0 0 4-1.248c.184-.072.392-.104.576-.176a24.671 24.671 0 0 0 7.784-5.256l144.216 84.04c4.684 2.721 10.687 1.129 13.407-3.555l.049-.085a10.026 10.026 0 0 0-.704-11.016z" />
      </g>
    </svg>
  )
);

const IconWithLoader = ({
  loading,
  children,
  ...baseLoaderProps
}: {
  loading?: boolean;
  children?: React.ReactNode;
} & IconProps) => {
  if (loading) {
    return <BaseLoader {...baseLoaderProps} />;
  }
  if (children) return <>{children}</>;
  return <></>;
};

export const Loader = {
  BaseLoader,
  IconWithLoader,
};
