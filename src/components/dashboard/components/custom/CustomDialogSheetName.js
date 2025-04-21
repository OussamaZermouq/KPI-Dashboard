import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { DialogActions, DialogContent } from "@mui/material";

function SimpleDialog(props) {
  const {
    onClose,
    selectedValue,
    open,
    sheetNamesProp,
    handleSelectSheetnameChange,
  } = props;
  const [value, setValue] = React.useState(selectedValue);
  const [sheetsNames, setSheetsNames] = React.useState(sheetNamesProp["data"]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    console.log(value);
    handleSelectSheetnameChange(value);
    onClose(value);
  };
  const radioGroupRef = React.useRef(null);
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      onClose={handleOk}
    >
      <DialogTitle>Select a sheet</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="SheetName"
          name="SheetName"
          value={value}
          onChange={handleChange}
        >
          {sheetsNames.map((sheetName) => (
            <FormControlLabel
              value={sheetName}
              key={sheetName}
              control={<Radio />}
              label={sheetName}
            />
          ))}
        </RadioGroup>
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

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function CustomDialogSheetName({
  dialogDataProp,
  selectedSheetName,
  handleSelectSheetnameChange,
  onDialogClose 
}) {
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(dialogDataProp[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

 
  const handleClose = (value) => {
    setOpen(false);
    if (value){
      setSelectedValue(value);
      selectedSheetName(value);
    }
    onDialogClose(); 
  };

  return (
    <SimpleDialog
      selectedValue={selectedValue}
      open={open}
      onClose={handleClose}
      sheetNamesProp={dialogDataProp}
      handleSelectSheetnameChange={handleSelectSheetnameChange}
    />
  );
}