import * as React from "react";
import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function SessionContinuityBarchart({
  sessionContinuityDataProp,
  hoursDataProp,
}) {
  const [sessionContinuityData, setSessionContinuity] = useState(
    sessionContinuityDataProp
  );
  const [hoursData, setHoursData] = useState(hoursDataProp);

  React.useEffect(() => {
    console.log(sessionContinuityData);
  });
  return (
    <BarChart
      series={sessionContinuityData}
      barLabel={(item, context) => {
        if ((item.value ?? 0) > 10) {
          return "High";
        }
        return context.bar.height < 60 ? null : item.value?.toString();
      }}
      width={600}
      height={350}
    />
  );
}
