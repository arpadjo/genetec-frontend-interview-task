import type { EventItem } from "../types/event";

export const sortEvents = (events: EventItem[]) => {
  return [...events].sort((firstEvent, secondEvent) => {
    return Date.parse(firstEvent.date) - Date.parse(secondEvent.date);
  });
};
