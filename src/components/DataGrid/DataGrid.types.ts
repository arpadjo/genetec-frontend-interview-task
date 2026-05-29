import type { ReactNode } from "react";

export type DataGridColumn<T> = {
  id: string;
  label: string;
  accessor: keyof T | ((row: T) => ReactNode);
  sortable?: boolean;
  filterable?: boolean;
  hidden?: boolean;
};

export type DataGridProps<T> = {
  columns: DataGridColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  isLoading?: boolean;
  error?: string;
};
