export const DEFAULT_EVENT_COUNT = 200;
export const DEFAULT_MOCK_SEED = 20260529;

export const EVENT_ACTIONS = [
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

export const EVENT_SUBJECTS = [
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

export const EVENT_CONTEXTS = [
  "HQ",
  "north campus",
  "parking operations",
  "dispatch",
  "field team",
] as const;
