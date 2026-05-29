export type EventFormValues = {
  title: string;
  date: string;
};

export type EventFormProps = {
  mode?: "add" | "edit";
  onCancel?: () => void;
};
