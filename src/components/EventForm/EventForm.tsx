import { Box, Button, Divider, Stack, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";

import { eventSchema } from "./EventForm.schema";
import type { EventFormProps } from "./EventForm.types";
import type { EventFormValues } from "./EventForm.types";

const defaultValues: EventFormValues = {
  title: "",
  date: "",
};

export const EventForm = ({
  initialValues = defaultValues,
  onCancel,
  onSubmit,
}: EventFormProps) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setFocus,
  } = useForm<EventFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(eventSchema),
    shouldFocusError: true,
  });

  const focusFirstInvalidField = (
    fieldErrors: FieldErrors<EventFormValues>,
  ) => {
    if (fieldErrors.title) {
      setFocus("title");
      return;
    }

    if (fieldErrors.date) {
      setFocus("date");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit, focusFirstInvalidField)}
    >
      <Stack spacing={2}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              error={Boolean(errors.title)}
              fullWidth
              helperText={errors.title?.message}
              label="Title"
              placeholder="Required title"
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.date)}
              fullWidth
              helperText={errors.date?.message}
              label="Date"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              type="datetime-local"
            />
          )}
        />

        <Divider />

        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit" variant="contained">
            Save Event
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
