import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ChooseChartType from "./ChooseChartType";
import { Card, CardActionArea, CardContent, Paper, Stack } from "@mui/material";
import { getFileInfo } from "../../../../service/kpiService";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChartDataPicker from "./ChartDataPicker";
import ChartCustomization from "./ChartCutomization";
const steps = [
  "Upload Files",
  "Choose Chart Type",
  "Choose Data",
  "Chart Customization",
];

export default function CreateCustomChartStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [file, setFile] = React.useState();
  const [fileData, setFileData] = React.useState([]);
  const [selectedChart, setSelectedChart] = React.useState();
  const [selectedCity, setselectedCity] = React.useState();
  const [selectedSheet, setSelectedSheet] = React.useState();
  const handleChartSelection = (chart) => {
    setSelectedChart(chart);
  };
  const handleSheetSelection = (sheet) => {
    setSelectedSheet(sheet);
  };

  const handleCityChange = (city) => {
    setselectedCity(city);
  };
  //Step functions

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  //

  const handleUploadFile = async (file) => {
    setFile(file);
    try {
      const data = await getFileInfo(file);
      setFileData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const UploadFileComponent = () => {
    return (
      <>
        <Card
          sx={{
            width: { lg: "60%", md: "70%", xs: "90%" },
            height: "500px",
          }}
        >
          <CardActionArea
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                width: "100%",
              }}
            >
              <Paper
                onDrop={(e) => {
                  e.preventDefault();
                  console.log(e.target);
                  //handleUploadFile()
                }}
                sx={{
                  height: "100%",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: {
                      md: "flex",
                      xs: "flex flex-grid flex-items-center",
                    },
                    alignItems: "center",
                    justifyContent: "center",
                    justifyItems: "center",
                    gap: 4,
                    p: 5,
                    border: "9px dashed darkgrey",
                    borderRadius: 10,
                    position: "relative", // Add this for positioning context
                  }}
                >
                  <FileUploadSection
                    id="file-upload-1"
                    onFileSelect={handleUploadFile}
                  />
                </Box>
              </Paper>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  };

  const VisuallyHiddenInput2 = ({
    id,
    type = "file",
    onChange,
    accept,
    ...props
  }) => (
    <input
      id={id}
      type={type}
      onChange={onChange}
      accept={accept}
      style={{
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        width: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
      }}
      {...props}
    />
  );
  const FileUploadResult = () => {
    return (
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <CheckCircleOutlineIcon fontSize="large" />
        <Typography variant="h4">
          {" "}
          File has been uploaded successfully
        </Typography>
      </Stack>
    );
  };

  const FileUploadSection = ({ id, onFileSelect }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file && onFileSelect) {
        onFileSelect(file);
      }
    };

    return (
      <>
        <label
          htmlFor={id}
          style={{
            cursor: "pointer",
            display: "block",
            textAlign: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" color="grey">
            Click or drop files to upload
          </Typography>
        </label>
        <VisuallyHiddenInput2
          id={id}
          type="file"
          onChange={handleFileChange}
          accept=".xlsx"
        />
      </>
    );
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box
            sx={{
              backgroundColor: "red",
            }}
          >
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            sx={{
              height: "700px",
              display: "flex",
              m: 2,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {activeStep === 0 &&
              (file ? <FileUploadResult /> : <UploadFileComponent />)}
            {activeStep === 1 && (
              <ChooseChartType
                handleChartSelectionCallback={(item) =>
                  handleChartSelection(item)
                }
              />
            )}
            {activeStep === 2 && selectedChart && (
              <ChartDataPicker
                dataProp={fileData}
                setSelectedCityProp={handleCityChange}
                setSelectedSheetProp={handleSheetSelection}
              />
            )}
            {activeStep === 3 && (
              <ChartCustomization
                sheetNameProp={selectedSheet}
                cityProp={selectedCity}
                chartTypeProp={selectedChart}
                fileProp={file}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button disabled={!file} onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
