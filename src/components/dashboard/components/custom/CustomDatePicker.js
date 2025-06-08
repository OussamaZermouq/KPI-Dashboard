import * as React from "react";
import useDate from "../../../../hooks/useDate";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function CustomDatePicker() {
  const { dates, selectedDate, setSelectedDate } = useDate();

  const [selectedDateControlledValue, setSelectedDateControlledValue] =
    React.useState(dayjs(selectedDate));

  const handleDateUpdate = (value) => {
    setSelectedDateControlledValue(value);
    setSelectedDate(dayjs(value).format("YYYY-MM-DD"));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          height: "10",
        }}
        onChange={(value) => handleDateUpdate(value)}
        value={selectedDateControlledValue}
        minDate={dayjs(dates[0], "YYYY-MM-DD")}
        maxDate={dayjs(dates[dates.length - 1], "YYYY-MM-DD")}
        label="Date"
      />
    </LocalizationProvider>
  );
}
