import { Box, Stack, Typography } from "@mui/material";
import type { KeyboardEventHandler, Ref } from "react";

import type { EventItem } from "../../types/event";
import { TimelineItem } from "./TimelineItem";

type TimelineGroupProps = {
  activeItemIndex: number;
  label: string;
  items: {
    event: EventItem;
    flatIndex: number;
  }[];
  getItemRef: (flatIndex: number) => Ref<HTMLDivElement>;
  onItemFocus: (flatIndex: number) => void;
  onItemKeyDown: KeyboardEventHandler<HTMLDivElement>;
};

export const TimelineGroup = ({
  activeItemIndex,
  label,
  items,
  getItemRef,
  onItemFocus,
  onItemKeyDown,
}: TimelineGroupProps) => {
  return (
    <Box component="section" sx={{ display: "grid", gap: 1 }}>
      <Typography component="h3" variant="subtitle2">
        {label}
      </Typography>
      <Stack role="list" spacing={2}>
        {items.map(({ event, flatIndex }) => (
          <TimelineItem
            event={event}
            isActive={flatIndex === activeItemIndex}
            itemRef={getItemRef(flatIndex)}
            key={event.id}
            onFocus={() => onItemFocus(flatIndex)}
            onKeyDown={onItemKeyDown}
          />
        ))}
      </Stack>
    </Box>
  );
};
