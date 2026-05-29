import type { ReactNode } from "react";

export type DataGridColumn<T> = {
  id: string;
  label: string;
  accessor: keyof T | ((row: T) => ReactNode);
  sortable?: boolean;
  filterable?: boolean;
  hidden?: boolean;
};
