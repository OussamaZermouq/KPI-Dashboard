import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DialogActions, DialogContent, Box, Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useSheet from "../../../../hooks/useSheet";
import useDate from "../../../../hooks/useDate";
import useCity from "../../../../hooks/useCity";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function SheetCityDateSelectionDialog({
  dialogDataProp,
  selectedSheetNameProp,
  handleSelectSheetnameChange,
  onDialogClose,
  citiesProp,
  datesProp,
}) {
  const [open, setOpen] = React.useState(true);
  const [selectedSheetName, setSelectedSheetName] = React.useState(
    dialogDataProp[0]
  );
  const [selectedCityName, setSelectedCityName] = React.useState("");
  //Weird name to distinguish between this and the context value name
  const [selectedDateControlledValue, setSelectedDateControlledValue] =
    React.useState();

  const radioGroupRef = React.useRef(null);

  const { setSelectedCity, setCities } = useCity();
  const { setSheets, setSelectedSheet } = useSheet();
  const { setDates, setSelectedDate } = useDate();
  const handleSheetChange = (event) => {
    setSelectedSheetName(event.target.value);
  };

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    setOpen(false);
    onDialogClose();
  };

  const handleOk = () => {
    if (selectedSheetName) {
      setSelectedSheetName(selectedSheetName);
      selectedSheetNameProp(selectedSheetName);
    }
    if (
      selectedCityName &&
      datesProp &&
      selectedDateControlledValue &&
      citiesProp &&
      selectedSheetName
    ) {
      setCities(citiesProp);
      setSelectedCity(selectedCityName);
      setSheets(dialogDataProp);
      setSelectedSheet(selectedSheetName);
      setDates(datesProp);
      setSelectedDate(dayjs(selectedDateControlledValue).format("YYYY-MM-DD"));
    }

    handleSelectSheetnameChange(
      selectedSheetName,
      selectedCityName,
      dayjs(selectedDateControlledValue).format("YYYY-MM-DD")
    );

    //TODO: Add some checks before the user closes the dialog (City and Date selection)

    setOpen(false);
    onDialogClose();
  };

  const handleCitySelectChange = (event) => {
    setSelectedCityName(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 650 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      onClose={handleOk}
    >
      <DialogTitle>Select a sheet and city</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Select Sheet:
          </Typography>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="SheetName"
            name="SheetName"
            value={selectedSheetName}
            onChange={handleSheetChange}
          >
            {dialogDataProp.map((sheetName) => (
              <FormControlLabel
                value={sheetName}
                key={sheetName}
                control={<Radio />}
                label={sheetName}
              />
            ))}
          </RadioGroup>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Select City:
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={selectedCityName}
              label="City"
              onChange={handleCitySelectChange}
            >
              {citiesProp && citiesProp.length > 0 ? (
                citiesProp.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled color="text.secondary">
                  No cities available
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Select Date:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(value) => setSelectedDateControlledValue(value)}
              value={selectedDateControlledValue}
              minDate={dayjs(datesProp[0], "YYYY-MM-DD")}
              maxDate={dayjs(datesProp[datesProp.length - 1], "YYYY-MM-DD")}
              sx={{
                width: "100%",
              }}
              label="Date"
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
