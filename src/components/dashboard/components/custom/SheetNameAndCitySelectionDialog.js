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
import useCity from "../../../../hooks/useCity";

export default function SheetNameAndCitySelectionDialog({
  dialogDataProp,
  selectedSheetNameProp,
  handleSelectSheetnameChange,
  onDialogClose,
  citiesProp,
}) {
  const [open, setOpen] = React.useState(true);
  const [selectedSheetName, setSelectedSheetName] = React.useState(
    dialogDataProp[1]
  );
  const [selectedCityName, setSelectedCityName] = React.useState('');
  const radioGroupRef = React.useRef(null);
  const { selectedCity, setSelectedCity, cities, setCities } = useCity();

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
    handleSelectSheetnameChange(selectedSheetName);
    setOpen(false);
    if (selectedSheetName) {
      setSelectedSheetName(selectedSheetName);
      selectedSheetNameProp(selectedSheetName);

      if (selectedCityName && citiesProp) {
        // setSelectedCity(selectedCityName)
        // setCities(citiesProp);
      }
    }
    onDialogClose();
  };

  const handleCitySelectChange = (event) => {
    setSelectedCityName(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 550 } }}
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

SheetNameAndCitySelectionDialog.propTypes = {
  dialogDataProp: PropTypes.array.isRequired,
  selectedSheetName: PropTypes.func.isRequired,
  handleSelectSheetnameChange: PropTypes.func.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  citiesProp: PropTypes.array.isRequired,
};
