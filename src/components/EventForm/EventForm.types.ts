import type { EventStatus } from "../../types/event";

export type EventFormValues = {
  title: string;
  date: string;
  owner: string;
  status: EventStatus;
  description: string;
};
