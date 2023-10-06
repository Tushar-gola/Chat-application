type ModalContainerProps = {
  children: React.ReactNode;
};

export function ModalContainer({ children }: ModalContainerProps) {
  return <div className="bg-white rounded-xl p-4 flex flex-col gap-4">{children}</div>;
}
