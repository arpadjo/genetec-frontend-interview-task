import { Box, Typography } from "@mui/material";

import type { EventItem } from "../../types/event";

type TimelineItemProps = {
  event: EventItem;
};

export function TimelineItem({ event }: TimelineItemProps) {
  return (
    <Box sx={{ borderLeft: "3px solid #1976d2", pl: 1.5 }}>
      <Typography color="text.secondary" sx={{ display: "block", mb: 0.25 }} variant="caption">
        {new Date(event.date).toLocaleDateString()}
      </Typography>
      <Typography variant="body2">{event.title}</Typography>
    </Box>
  );
}
