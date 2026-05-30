import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { DataGrid } from "../components/DataGrid/DataGrid";
import { EventForm } from "../components/EventForm/EventForm";
import type { EventFormValues } from "../components/EventForm/EventForm.types";
import { Timeline } from "../components/Timeline/Timeline";
import { mockEvents } from "../data/mockEvents";
import { eventColumns } from "../components/DataGrid/DataGrid.config";
import { sortEvents } from "../utils/sortEvents";

function App() {
  const [events, setEvents] = useState(mockEvents);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const openEventForm = () => {
    setSuccessMessage("");
    setIsEventFormOpen(true);
  };

  const closeEventForm = () => {
    setIsEventFormOpen(false);
  };

  const clearSuccessMessage = () => {
    setSuccessMessage("");
  };

  const addEvent = (values: EventFormValues) => {
    const newEvent = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      date: new Date(values.date).toISOString(),
    };

    setEvents((currentEvents) => sortEvents([...currentEvents, newEvent]));
    setSuccessMessage(`Event "${newEvent.title}" was added.`);
    closeEventForm();
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f6f7f9" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography component="h1" variant="h4">
                Event Operations
              </Typography>
              <Typography color="text.secondary">
                DataGrid, Timeline, and New Event form demo.
              </Typography>
            </Box>

            <Button
              onClick={openEventForm}
              startIcon={<AddIcon />}
              variant="contained"
            >
              New Event
            </Button>
          </Box>

          {successMessage ? (
            <Alert
              aria-live="polite"
              onClose={clearSuccessMessage}
              role="status"
              severity="success"
            >
              {successMessage}
            </Alert>
          ) : null}

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 2fr) minmax(320px, 1fr)",
              },
            }}
          >
            <DataGrid
              columns={eventColumns}
              getRowId={(event) => event.id}
              rows={events}
            />
            <Timeline events={events} />
          </Box>
        </Stack>
      </Container>

      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={closeEventForm}
        open={isEventFormOpen}
        aria-labelledby="event-form-dialog-title"
      >
        <Box
          sx={{
            alignItems: "center",
            borderBottom: "1px solid #e2e6ee",
            display: "flex",
            justifyContent: "space-between",
            px: 2.5,
            py: 2,
          }}
        >
          <Typography component="h2" id="event-form-dialog-title" variant="h6">
            New Event
          </Typography>
          <IconButton aria-label="Close event form" onClick={closeEventForm}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <EventForm onCancel={closeEventForm} onSubmit={addEvent} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;
