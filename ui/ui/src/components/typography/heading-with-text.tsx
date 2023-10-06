import { memo } from "react";
import { Box } from "../layouts/box";
import { Heading } from "./heading";
import { Text } from "./text";

type HeadingWithTextProps = {
  title: string;
  description: string;
};

export const HeadingWithText = memo(({ title, description }: HeadingWithTextProps) => {
  return (
    <Box stack="vertical" className="items-center gap-2">
      <Heading>{title}</Heading>
      <Text align="center" className="max-w-xs">
        {description}
      </Text>
    </Box>
  );
});
