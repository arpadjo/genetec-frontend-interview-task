import type { EventItem } from "../types/event";

export function sortEvents(events: EventItem[]) {
  return [...events].sort((firstEvent, secondEvent) => {
    return Date.parse(firstEvent.date) - Date.parse(secondEvent.date);
  });
}
