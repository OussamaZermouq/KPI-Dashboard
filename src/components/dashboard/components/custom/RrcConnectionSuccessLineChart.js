import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function RrcConnectionSuccessLineChart({
  rrcConnectionRateProp,
  hoursProp,
}) {
  return (
    <Card variant="outlined" sx={{ width: "100%", my:1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          RRC connection rate
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
            RRC connection rate in the last {hoursProp.length} hours
          </Typography>
        </Stack>
        <LineChart
          xAxis={[{ data: hoursProp }]}
          series={[
            {
              data: rrcConnectionRateProp,
            },
          ]}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
