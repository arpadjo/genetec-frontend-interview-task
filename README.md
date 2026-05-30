# Event Operations Demo

React demo app for the frontend technical task.

The project uses `pnpm`.

The app shows three reusable components:

- `DataGrid`
- `Timeline`
- `EventForm`

## Features

- DataGrid with pagination, sorting, filtering, column visibility, loading, empty, and error states.
- Timeline grouped by day.
- Timeline keyboard navigation with arrow keys.
- Screen-reader announcements when the focused timeline item changes.
- Add and edit event form.
- Form validation for required title and valid date.
- Success message after saving.
- Mock data only.

## How to Review

- Use the DataGrid toolbar to sort, filter, and hide/show columns.
- Use the state toggle above the grid to see loading, empty, and error states.
- Click the edit icon in the grid to edit an event.
- Click `New Event` to add an event.
- Focus a Timeline item and use arrow keys to move between events.

## Accessibility

Timeline items are keyboard focusable.
Arrow keys move focus between events.
A hidden live region announces the current day group and event title.

## Data Model

The event model is intentionally small:

```ts
type EventItem = {
  id: string;
  title: string;
  date: string;
};
```

## Choices

- I used MUI for the UI components.
- I used MUI X DataGrid because the task allows free open-source UI components, and it gives a strong table base.
- I kept app state in React state because the data is local mock data only.
- I used `react-hook-form` with `zod` for controlled form validation.
- Timeline events are grouped by day because this is the grouping requested in the task.
- Mock events are generated with Faker and sorted by date.

## Trade-offs

- MUI X DataGrid is used for table behavior because the task allows free UI components.
- Local React state is used because the app only uses mock data.
- Unit tests are not included because the task says they are not required.

## Improvement ideas

- Add focused unit and integration tests for the form, helpers, and main add/edit flow.
- Add stronger responsive polish for small screens.
- Customize the DataGrid toolbar so it only shows the actions needed by this task.
- Add Timeline virtualization if the event list becomes much larger.
- Move from mock data to an API-backed data layer if this became a real app.
- Add better error handling around save/update actions (in case of API is being used).

## Code Organization

The app keeps reusable UI parts separated from app-level state.

- `App` owns the demo state, modal state, and add/edit flow.
- `DataGrid`, `Timeline`, and `EventForm` receive data and callbacks through props.
- DataGrid-specific adapter logic lives next to the DataGrid component.
- Shared helpers, like date formatting and sorting, live in `utils`.
- Static values used across modules live in `constants`.
- Types are kept explicit and small.

## Folder Structure

```txt
src/
  app/              App shell and page composition
  components/       Reusable UI components
    DataGrid/       DataGrid wrapper and column config
    Timeline/       Timeline, groups, and items
    EventForm/      Add/edit event form, schema, and types
  constants/        Shared constant values
  data/             Mock data
  types/            Shared TypeScript types
  utils/            Reusable helper functions
```

## Run

```bash
pnpm install
pnpm dev
```

## Check

```bash
pnpm lint
pnpm build
```
