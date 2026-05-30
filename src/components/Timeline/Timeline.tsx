import { Box, Paper, Stack, Typography } from "@mui/material";

import type { EventItem } from "../../types/event";
import { formatDate } from "../../utils/formatDate";
import { TimelineGroup } from "./TimelineGroup";
import type { TimelineProps } from "./Timeline.types";

function groupEventsByDate(events: EventItem[]) {
  return events.reduce<Record<string, EventItem[]>>((groups, event) => {
    const date = formatDate(event.date);

    return {
      ...groups,
      [date]: [...(groups[date] ?? []), event],
    };
  }, {});
}

export function Timeline({ events }: TimelineProps) {
  const previewGroups = Object.entries(
    groupEventsByDate(events.slice(0, 12)),
  ).slice(0, 4);

  return (
    <Paper
      sx={{
        border: "1px solid #d9dee7",
        borderRadius: 2,
        boxShadow: "none",
        p: 2.5,
      }}
    >
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
            Timeline
          </Typography>
        </Box>
      </Box>

      <Stack spacing={2} sx={{ mt: 2 }}>
        {previewGroups.map(([label, groupEvents]) => (
          <TimelineGroup events={groupEvents} key={label} label={label} />
        ))}
      </Stack>
    </Paper>
  );
}
