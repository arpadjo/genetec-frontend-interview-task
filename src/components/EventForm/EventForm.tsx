import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { EventFormProps } from "./EventForm.types";

export function EventForm({ mode = "add", onCancel }: EventFormProps) {
  const title = mode === "add" ? "Add Event" : "Edit Event";

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography component="h2" variant="h6">
            {title}
          </Typography>
        </Box>
      </Box>

      <Stack spacing={2}>
        <TextField
          disabled
          fullWidth
          label="Title"
          placeholder="Required title"
        />
        <TextField disabled fullWidth label="Date" type="datetime-local" />

        <Divider />

        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button disabled variant="contained">
            Save Event
          </Button>
        </Stack>

        <Chip
          label="Success message region"
          variant="outlined"
          sx={{ alignSelf: "start" }}
        />
      </Stack>
    </Box>
  );
}
