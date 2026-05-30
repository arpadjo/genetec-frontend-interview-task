import { Box, Typography } from "@mui/material";
import type { KeyboardEventHandler, Ref } from "react";

import type { EventItem } from "../../types/event";
import { formatDate } from "../../utils/formatDate";

type TimelineItemProps = {
  event: EventItem;
  isActive: boolean;
  itemRef: Ref<HTMLDivElement>;
  onFocus: () => void;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};

export const TimelineItem = ({
  event,
  isActive,
  itemRef,
  onFocus,
  onKeyDown,
}: TimelineItemProps) => {
  return (
    <Box
      aria-label={`${event.title}, ${formatDate(event.date)}`}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      ref={itemRef}
      role="listitem"
      tabIndex={isActive ? 0 : -1}
      sx={{
        borderLeft: "3px solid #1976d2",
        borderRadius: 1,
        outline: "none",
        pl: 1.5,
        py: 0.75,
        ...(isActive
          ? {
              backgroundColor: "rgba(25, 118, 210, 0.08)",
              boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.35)",
            }
          : {}),
        "&:focus-visible": {
          backgroundColor: "rgba(25, 118, 210, 0.08)",
          boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.45)",
        },
      }}
    >
      <Typography color="text.secondary" sx={{ display: "block", mb: 0.25 }} variant="caption">
        {formatDate(event.date)}
      </Typography>
      <Typography variant="body2">{event.title}</Typography>
    </Box>
  );
};
