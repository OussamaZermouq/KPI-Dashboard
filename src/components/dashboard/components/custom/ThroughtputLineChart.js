import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card, CardContent, Stack, Typography } from "@mui/material";

function ThroughtputLineChart({
  throughtputDataUlProp,
  hoursDataProp,
  throughtputDataDlProp,
}) {
  const [throughtputDataUl, setThroughtputDataUl] = useState(
    throughtputDataUlProp
  );
  const [throughtputDataDl, setThroughtputDataDl] = useState(
    throughtputDataDlProp
  );
  const [hoursData, setHoursData] = useState(hoursDataProp);

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Session continuity
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
            Session continuity in the last {hoursData.length} hours
          </Typography>
        </Stack>
        <LineChart
          sx={{
            width: "100%",
          }}
          height={300}
          localeText={{
            loading: "Data should be available soon.",
            noData: "Select some data to display.",
          }}
          series={[
            { data: throughtputDataUl, label: "Upload Throughput" },
            { data: throughtputDataDl, label: "Download Throughput" },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: hoursData,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}

export default ThroughtputLineChart;
