export const GRID_DEMO_STATES = {
  normal: "normal",
  loading: "loading",
  empty: "empty",
  error: "error",
} as const;

export type GridDemoState =
  (typeof GRID_DEMO_STATES)[keyof typeof GRID_DEMO_STATES];
