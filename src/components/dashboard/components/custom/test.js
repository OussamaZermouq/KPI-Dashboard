import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function TestComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Basic date picker"  onChange={(e)=>console.log(e)}/>
    </LocalizationProvider>
  );
}
