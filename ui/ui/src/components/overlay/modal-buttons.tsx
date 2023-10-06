import { Button } from "../forms/button";

type ModalButtonsProps = {
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  isEdit?: true;
};

export const ModalButtons = ({
  isLoading,
  onClose,
  onSubmit,
  isEdit,
}: ModalButtonsProps): JSX.Element => {
  return (
    <>
      <Button size="md" onClick={onClose}>
        Cancel
      </Button>
      <Button size="md" onClick={onSubmit} loading={isLoading}>
        {isEdit ? "Edit" : "Create"}
      </Button>
    </>
  );
};
