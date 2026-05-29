import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import {
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
import { Timeline } from "../components/Timeline/Timeline";
import { mockEvents } from "../data/mockEvents";
import { eventColumns } from "../components/DataGrid/DataGrid.config";

function App() {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);

  const openEventForm = () => {
    setIsEventFormOpen(true);
  };

  const closeEventForm = () => {
    setIsEventFormOpen(false);
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
                Static layout for the DataGrid, Timeline, and New Event form
                demo.
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
              rows={mockEvents}
            />
            <Timeline events={mockEvents} />
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
          <EventForm onCancel={closeEventForm} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;
