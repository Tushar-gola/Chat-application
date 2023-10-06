import { ReactNode } from "react";
import { Icons } from "../../svgs/icons";
import { Text } from "../typography/text";

type ModalProps = {
  children: ReactNode;
  closeModal: () => void;
  contentClass?: string;
  noPadding?: boolean;
  title: string;
  footer?: ReactNode;
  persist?: boolean;
};

export const Modal = ({ children, closeModal, contentClass, title, footer, noPadding, persist }: ModalProps) => {
  return (
    <div className="absolute inset-0 z-40 flex justify-center items-center">
      <div className="absolute inset-0 bg-black/60" onClick={!persist ? closeModal : () => {}} />
      <div
        className={`bg-white rounded-md shadow-2xl max-h-[calc(100vh_-_2rem)] overflow-hidden relative ${
          contentClass ?? "max-w-[960px]"
        }`}
      >
        <div className="flex justify-between p-4 border-b border-gray-100">
          <Text>{title}</Text>
          <button onClick={closeModal}>
            <Icons.Close />
          </button>
        </div>
        <div className="max-h-[calc(100vh_-_10rem)] h-full overflow-x-hidden">
          <div className="w-full h-full">
            <div className={`bg-white h-fit flex flex-col gap-4 ${noPadding ? "p-0" : "p-4"}`}>
              <div className={`bg-white rounded-xl flex flex-col gap-4 ${noPadding ? "p-0" : "p-4"}`}>{children}</div>
            </div>
          </div>
        </div>
        {footer && <div className="p-2 border-t border-gray-100 bg-white">{footer}</div>}
      </div>
    </div>
  );
};
