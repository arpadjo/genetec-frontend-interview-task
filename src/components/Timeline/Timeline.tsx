import { Box, Paper, Stack, Typography } from "@mui/material";
import type { KeyboardEvent } from "react";
import { useMemo, useRef, useState } from "react";

import type { EventItem } from "../../types/event";
import { formatDate } from "../../utils/formatDate";
import { TimelineGroup } from "./TimelineGroup";
import type { TimelineProps } from "./Timeline.types";

const groupEventsByDate = (events: EventItem[]) => {
  const groups = events.reduce<Record<string, EventItem[]>>((groups, event) => {
    const date = formatDate(event.date);

    return {
      ...groups,
      [date]: [...(groups[date] ?? []), event],
    };
  }, {});

  return Object.entries(groups).map(([label, groupEvents]) => ({
    label,
    events: groupEvents,
  }));
};

export const Timeline = ({ events }: TimelineProps) => {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const groups = useMemo(() => groupEventsByDate(events), [events]);
  const timelineItems = useMemo(
    () =>
      groups.flatMap((group) =>
        group.events.map((event) => ({
          event,
          groupLabel: group.label,
        })),
      ),
    [groups],
  );
  const activeItem = timelineItems[activeItemIndex];
  const liveMessage = activeItem
    ? `${activeItem.groupLabel}, ${activeItem.event.title}`
    : "No timeline events";

  const focusItem = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), timelineItems.length - 1);

    setActiveItemIndex(nextIndex);
    itemRefs.current[nextIndex]?.focus();
  };

  const handleItemKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      focusItem(activeItemIndex + 1);
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusItem(activeItemIndex - 1);
    }
  };

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

      <Box
        aria-live="polite"
        role="status"
        sx={{
          border: 0,
          clip: "rect(0 0 0 0)",
          height: 1,
          margin: -1,
          overflow: "hidden",
          p: 0,
          position: "absolute",
          whiteSpace: "nowrap",
          width: 1,
        }}
      >
        {liveMessage}
      </Box>

      <Stack spacing={2} sx={{ mt: 2 }}>
        {groups.map((group, groupIndex) => {
          const previousItemsCount = groups
            .slice(0, groupIndex)
            .reduce((count, previousGroup) => count + previousGroup.events.length, 0);
          const items = group.events.map((event, itemIndex) => ({
            event,
            flatIndex: previousItemsCount + itemIndex,
          }));

          return (
            <TimelineGroup
              activeItemIndex={activeItemIndex}
              getItemRef={(flatIndex) => (element) => {
                itemRefs.current[flatIndex] = element;
              }}
              items={items}
              key={group.label}
              label={group.label}
              onItemFocus={setActiveItemIndex}
              onItemKeyDown={handleItemKeyDown}
            />
          );
        })}
        {groups.length === 0 ? (
          <Typography color="text.secondary">No events to show.</Typography>
        ) : null}
      </Stack>
    </Paper>
  );
};
