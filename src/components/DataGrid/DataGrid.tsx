import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { Box, Paper, Typography } from "@mui/material";

import {
  createColumnVisibilityModel,
  createGridColumns,
  createGridRows,
} from "./DataGrid.config";
import type { DataGridProps } from "./DataGrid.types";

export function DataGrid<T>({
  columns,
  rows,
  getRowId,
  isLoading = false,
  error,
}: DataGridProps<T>) {
  const gridColumns = createGridColumns(columns);
  const columnVisibilityModel = createColumnVisibilityModel(columns);
  const gridRows = createGridRows(rows, columns, getRowId);

  return (
    <Paper
      sx={{
        border: "1px solid #d9dee7",
        borderRadius: 2,
        boxShadow: "none",
        gridRow: { md: "span 2" },
        p: 2.5,
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography component="h2" variant="h6">
            DataGrid
          </Typography>
        </Box>
      </Box>

      {error ? (
        <Typography color="error" sx={{ py: 3 }}>
          {error}
        </Typography>
      ) : (
        <Box sx={{ height: 560, mt: 2, width: "100%" }}>
          <MuiDataGrid
            columns={gridColumns}
            disableRowSelectionOnClick
            loading={isLoading}
            pageSizeOptions={[10, 25, 50]}
            rows={gridRows}
            showToolbar
            initialState={{
              columns: {
                columnVisibilityModel,
              },
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 10,
                },
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
}
