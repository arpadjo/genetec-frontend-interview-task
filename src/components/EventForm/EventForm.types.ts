export type EventFormValues = {
  title: string;
  date: string;
};

export type EventFormProps = {
  initialValues?: EventFormValues;
  mode?: "add" | "edit";
  onCancel?: () => void;
  onSubmit: (values: EventFormValues) => void;
};
