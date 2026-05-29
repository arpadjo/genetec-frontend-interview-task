import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import type { ReactNode } from "react";

import type { EventItem } from "../../types/event";
import type { DataGridColumn } from "./DataGrid.types";

export const eventColumns: DataGridColumn<EventItem>[] = [
  {
    id: "id",
    label: "ID",
    accessor: "id",
    sortable: true,
  },
  {
    id: "date",
    label: "Date",
    accessor: (event) => new Date(event.date).toLocaleDateString(),
    sortable: true,
    filterable: true,
  },
  {
    id: "title",
    label: "Title",
    accessor: "title",
    sortable: true,
    filterable: true,
  },
];

export function createGridColumns<T>(columns: DataGridColumn<T>[]): GridColDef[] {
  return columns.map((column) => ({
    field: column.id,
    headerName: column.label,
    flex: 1,
    minWidth: 140,
    sortable: column.sortable ?? false,
    filterable: column.filterable ?? false,
  }));
}

export function createColumnVisibilityModel<T>(
  columns: DataGridColumn<T>[],
): Record<string, boolean> {
  return columns.reduce<Record<string, boolean>>(
    (visibilityModel, column) => ({
      ...visibilityModel,
      [column.id]: !column.hidden,
    }),
    {},
  );
}

function getCellValue<T>(
  row: T,
  accessor: DataGridColumn<T>["accessor"],
): ReactNode {
  if (typeof accessor === "function") {
    return accessor(row);
  }

  const value = row[accessor];

  return value == null ? "" : String(value);
}

export function createGridRows<T>(
  rows: T[],
  columns: DataGridColumn<T>[],
  getRowId: (row: T) => string,
): GridRowsProp {
  return rows.map((row) => {
    return columns.reduce<Record<string, unknown>>(
      (gridRow, column) => ({
        ...gridRow,
        [column.id]: getCellValue(row, column.accessor),
      }),
      { id: getRowId(row) },
    );
  });
}
