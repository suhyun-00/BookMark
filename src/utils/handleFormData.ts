export const handleOnKeyDown = (
  event: React.KeyboardEvent<HTMLFormElement>,
  handleFormData: (form: HTMLFormElement) => void,
  onClose?: () => void,
) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const form = event.currentTarget;
    handleFormData(form);
  } else if (event.key === 'Escape' && onClose) {
    event.stopPropagation();
    onClose();
  }
};

export const handleOnSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  handleFormData: (form: HTMLFormElement) => void,
) => {
  event.preventDefault();
  handleFormData(event.currentTarget);
};
