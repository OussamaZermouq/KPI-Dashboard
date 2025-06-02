import * as React from "react";
import { Stack, Typography } from "@mui/material";

export default function ChartDataPicker({dataProp}) {
  React.useEffect(()=>{
    console.log(dataProp)
  },[])
  return <Stack>
    <Typography variant="h5">Choose which columns to use</Typography>

  </Stack>;
}
