import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// Define the shape of the data you are passing into this component
interface KpiData {
  title: string;
  value: string;
  data: number[];
}

interface KpiDataGridProps {
  data: KpiData[];
}

const KpiDataGrid: React.FC<KpiDataGridProps> = ({ data }) => {
  const columns: GridColDef[] = [
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
      flex: 2,
      renderCell: (params) => {
        const dataPoints = params.row.data.map((val, index) => ({
          index,
          value: val,
        }));

        return (
          <Box sx={{ width: "100%", height: 50 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPoints}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%", mt: 4 }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        KPI Trend Table
      </Typography>
      <DataGrid
        rows={data.map((item, index) => ({ id: index, ...item }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default KpiDataGrid;
