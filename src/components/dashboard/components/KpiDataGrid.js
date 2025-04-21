import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function KpiDataGrid({ kpis = {} }) {
  // Dynamically generate rows for all KPIs in the kpis object
  const calculateAverage = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return "N/A";
    }
    return (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
  };

  const isValidKpi = (avg) => {
    return avg !== "N/A" && avg > 0;
  };

  // Build rows dynamically from kpis object
  const rows = Object.keys(kpis).map((kpiName, idx) => ({
    id: idx + 1,
    kpi: kpiName,
    avg: kpiName === 'hours' ? kpis[kpiName].length : calculateAverage(kpis[kpiName]),
  }));

  const columns = [
    { field: "kpi", headerName: "KPI", flex: 1 },
    { field: "avg", headerName: "AVG", flex: 1 },
    {
      field: "state",
      headerName: "State",
      flex: 1,
      renderCell: (params) => {
        return isValidKpi(params.row.avg) ? (
          <CheckCircleOutlineIcon color="success" />
        ) : (
          <ErrorOutlineIcon color="error" />
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        KPI Table
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
