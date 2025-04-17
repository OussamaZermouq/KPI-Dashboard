import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Tooltip } from "@mui/material";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

export default function KpiDataGrid({ data }) {
  const columns = [
    {
      field: "title",
      headerName: "KPI",
      flex: 1,
      renderCell: (params) => (
        <Typography fontWeight="bold">{params.value}</Typography>
      ),
    },
    {
      field: "value",
      headerName: "Avg Value",
      flex: 1,
    },
    {
      field: "chart",
      headerName: "Trend",
      flex: 3, // made it wider
      renderCell: (params) => {
        const sparkData = params.row.data.map((val, index) => ({
          index,
          value: val,
        }));

        return (
          <Tooltip
            title={`Value: ${sparkData[params.row.data.length - 1].value}`}
            arrow
            placement="top"
          >
            <Box sx={{ width: "100%", height: 70, cursor: "pointer" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" hide />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1976d2"
                    strokeWidth={2.2}
                    dot={false}
                  />
                  <RechartsTooltip />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Tooltip>
        );
      },
    },
  ];

  const rows = data.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <Box sx={{ height: 500, width: "100%", mt: 4 }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        KPI Trend Table
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
