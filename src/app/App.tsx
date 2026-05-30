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
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { DataGrid } from "../components/DataGrid/DataGrid";
import { EventForm } from "../components/EventForm/EventForm";
import type { EventFormValues } from "../components/EventForm/EventForm.types";
import { Timeline } from "../components/Timeline/Timeline";
import { mockEvents } from "../data/mockEvents";
import { eventColumns } from "../components/DataGrid/DataGrid.config";
import type { EventItem } from "../types/event";
import { toDateTimeLocalValue } from "../utils/formatDate";
import { sortEvents } from "../utils/sortEvents";

type GridDemoState = "normal" | "loading" | "empty" | "error";

const App = () => {
  const [events, setEvents] = useState(mockEvents);
  const [gridDemoState, setGridDemoState] = useState<GridDemoState>("normal");
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const openEventForm = () => {
    setEditingEvent(null);
    setSuccessMessage("");
    setIsEventFormOpen(true);
  };

  const openEditForm = (event: EventItem) => {
    setEditingEvent(event);
    setSuccessMessage("");
    setIsEventFormOpen(true);
  };

  const closeEventForm = () => {
    setIsEventFormOpen(false);
    setEditingEvent(null);
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

  const saveEditedEvent = (values: EventFormValues) => {
    if (!editingEvent) {
      return;
    }

    const updatedEvent = {
      ...editingEvent,
      title: values.title.trim(),
      date: new Date(values.date).toISOString(),
    };

    setEvents((currentEvents) =>
      sortEvents(
        currentEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event,
        ),
      ),
    );
    setSuccessMessage(`Event "${updatedEvent.title}" was updated.`);
    closeEventForm();
  };

  const submitEventForm = (values: EventFormValues) => {
    if (editingEvent) {
      saveEditedEvent(values);
      return;
    }

    addEvent(values);
  };

  const formInitialValues = editingEvent
    ? {
        title: editingEvent.title,
        date: toDateTimeLocalValue(editingEvent.date),
      }
    : undefined;
  const gridRows = gridDemoState === "empty" ? [] : events;
  const gridError =
    gridDemoState === "error" ? "Failed to load events." : undefined;

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
              alignItems: "center",
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography color="text.secondary" variant="body2">
              DataGrid demo state toggle
            </Typography>
            <ToggleButtonGroup
              exclusive
              onChange={(_, value: GridDemoState | null) => {
                if (value) {
                  setGridDemoState(value);
                }
              }}
              size="small"
              value={gridDemoState}
            >
              <ToggleButton value="normal">Normal</ToggleButton>
              <ToggleButton value="loading">Loading</ToggleButton>
              <ToggleButton value="empty">Empty</ToggleButton>
              <ToggleButton value="error">Error</ToggleButton>
            </ToggleButtonGroup>
          </Box>

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
              error={gridError}
              getRowId={(event) => event.id}
              isLoading={gridDemoState === "loading"}
              onEditRow={openEditForm}
              rows={gridRows}
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
            {editingEvent ? "Edit Event" : "New Event"}
          </Typography>
          <IconButton aria-label="Close event form" onClick={closeEventForm}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <EventForm
            initialValues={formInitialValues}
            mode={editingEvent ? "edit" : "add"}
            onCancel={closeEventForm}
            onSubmit={submitEventForm}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default App;
