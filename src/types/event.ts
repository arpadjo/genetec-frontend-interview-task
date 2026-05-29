export type EventStatus = "planned" | "active" | "done";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  owner: string;
  status: EventStatus;
  description?: string;
};
