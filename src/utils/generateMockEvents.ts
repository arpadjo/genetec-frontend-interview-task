import { faker } from "@faker-js/faker";

import type { EventItem } from "../types/event";
import { sortEvents } from "./sortEvents";

const DEFAULT_EVENT_COUNT = 200;
const DEFAULT_SEED = 20260529;

const EVENT_ACTIONS = [
  "Review",
  "Plan",
  "Validate",
  "Deploy",
  "Investigate",
  "Coordinate",
  "Audit",
  "Prepare",
  "Finalize",
  "Triage",
] as const;

const EVENT_SUBJECTS = [
  "access control rollout",
  "camera firmware update",
  "incident response drill",
  "operator workflow",
  "site onboarding",
  "security dashboard",
  "audit report",
  "release checklist",
  "integration handoff",
  "maintenance window",
] as const;

const EVENT_CONTEXTS = [
  "HQ",
  "north campus",
  "parking operations",
  "dispatch",
  "field team",
] as const;

const generateEventTitle = () => {
  const action = faker.helpers.arrayElement(EVENT_ACTIONS);
  const subject = faker.helpers.arrayElement(EVENT_SUBJECTS);
  const context = faker.helpers.arrayElement(EVENT_CONTEXTS);

  return `${action} ${subject} for ${context}`;
};

export const generateMockEvents = (
  count = DEFAULT_EVENT_COUNT,
  seed = DEFAULT_SEED,
): EventItem[] => {
  faker.seed(seed);

  const events = Array.from({ length: count }, (_, index) => {
    const date = faker.date.between({
      from: "2026-01-01T00:00:00.000Z",
      to: "2026-12-31T23:59:59.999Z",
    });

    return {
      id: `event-${String(index + 1).padStart(3, "0")}`,
      title: generateEventTitle(),
      date: date.toISOString(),
    };
  });

  return sortEvents(events);
};
