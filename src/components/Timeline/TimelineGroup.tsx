import { Box, Stack, Typography } from "@mui/material";

import type { EventItem } from "../../types/event";
import { TimelineItem } from "./TimelineItem";

type TimelineGroupProps = {
  label: string;
  events: EventItem[];
};

export function TimelineGroup({ label, events }: TimelineGroupProps) {
  return (
    <Box component="section" sx={{ display: "grid", gap: 1 }}>
      <Typography component="h3" variant="subtitle2">
        {label}
      </Typography>
      <Stack spacing={2}>
        {events.map((event) => (
          <TimelineItem event={event} key={event.id} />
        ))}
      </Stack>
    </Box>
  );
}
