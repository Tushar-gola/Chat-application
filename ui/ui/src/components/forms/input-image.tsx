import { ChangeEvent, useRef } from "react";
import { IconsLarge } from "../../svgs/icons";
import { Box } from "../layouts/box";
import { Text } from "../typography/text";

type InputImageProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  preview: string;
};

export const InputImage = ({ onChange, preview }: InputImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box stack="horizontal" className="gap-4">
      {preview ? (
        <img
          src={preview}
          width={132}
          height={132}
          alt="Organization Logo"
          className="border-gray-100 border-2 rounded-2xl cursor-pointer "
        />
      ) : (
        // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          onClick={() => inputRef.current?.click()}
          className="flex justify-center items-center bg-gray-50 border-gray-100 border-2 rounded-2xl cursor-pointer w-24 h-24"
        >
          <IconsLarge.Upload />
        </div>
      )}
      <Box stack="vertical" className="gap-2 justify-center">
        <Text variant="label">Upload Organization Logo</Text>
        <div className="flex flex-col gap-1">
          <Text variant="body" className="text-gray-400">
            A width of 500x500 pixels works best.
          </Text>
          <Text variant="body" className="text-gray-400">
            Maximum size is 500kb
          </Text>
        </div>
        {preview && (
          <Text variant="button_sm" className="text-blue-500 cursor-pointer" onClick={() => inputRef.current?.click()}>
            Change Image
          </Text>
        )}
      </Box>
      <input className="hidden" type="file" ref={inputRef} onChange={onChange} />
    </Box>
  );
};
