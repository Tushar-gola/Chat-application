import { forwardRef } from "react";

import { FieldError } from "react-hook-form";
import { Box } from "../layouts/box";
import { Text } from "../typography/text";
import { Check, CheckProps } from "./_input-parts/check";

type CheckboxProps = {
  label?: string;
  disabled?: boolean;
  withLayout?: boolean;
  error?: FieldError;
} & CheckProps;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, withLayout = true, disabled = false, ...props }, ref) => {
    return (
      <Box className={`grid grid-cols-3 gap-2 relative items-center `}>
        {withLayout && <div />}
        <Box className={`flex gap-2 items-center ${withLayout ? "col-span-2" : "col-span-3"}`}>
          <Check disabled={disabled} name={name} {...props} ref={ref} className="border-gray-200" />
          {label && (
            <Text as="label" variant="body" htmlFor={name}>
              {label}
            </Text>
          )}
        </Box>
      </Box>
    );
  }
);
