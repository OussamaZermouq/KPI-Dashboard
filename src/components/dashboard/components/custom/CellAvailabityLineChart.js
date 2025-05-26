import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function CellAvailabilityLineChart({
  hoursProp,
  cellAvailabilityProp,
}) {
  return (
    <Card variant="outlined" sx={{ width: "100%", my:1}}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Cell availability rate
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          ></Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Cell availability rate in the last {hoursProp.length} hours
          </Typography>
        </Stack>
        <BarChart
          xAxis={[{ scaleType: "band", data: hoursProp }]}
          series={[
            {
              data: cellAvailabilityProp,
              label: "Cell Availability",
            },
          ]}
          layout="vertical"
          height={300}

        />
      </CardContent>
    </Card>
  );
}
