import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../../shared-theme/AppTheme";
import emailjs from "emailjs-com";
import ColorModeSelect from "../../../shared-theme/ColorModeSelect";
import { Snackbar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import singupService, { signupService } from "../../../../service/Login";
import { useNavigate } from "react-router-dom";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SingupComponent(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    React.useState(false);
  const [
    passwordErrorConfirmationMessage,
    setPasswordErrorConfirmationMessage,
  ] = React.useState("");

  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [info, setInfo] = useState("");
  const navigate = useNavigate()
  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const passwordConfirmation = document.getElementById(
      "passwordConfirmation"
    );

    let isValid = true;

    // Email validation
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    // First name validation
    if (!firstName.value || firstName.value.length < 1) {
      setFirstNameError(true);
      setFirstNameErrorMessage("First name is required.");
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage("");
    }

    // Last name validation
    if (!lastName.value || lastName.value.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage("Last name is required."); // Fixed setter name
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage(""); // Fixed setter name
    }

    // Password validation
    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    // Password confirmation validation
    if (
      !passwordConfirmation.value ||
      password.value !== passwordConfirmation.value
    ) {
      setPasswordConfirmationError(true); // Should be boolean
      setPasswordErrorConfirmationMessage("Passwords do not match.");
      isValid = false;
    } else {
      setPasswordConfirmationError(false);
      setPasswordErrorConfirmationMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs first
    if (validateInputs()) {
      try {
        await signupService(firstName, lastName, email, password);
        setInfo("Registration successful, an email has been sent to the admin to enable your account.");
      } catch (error) {
        setInfo("Registration failed. Please try again.");
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <TextField
                autoComplete="firstName"
                name="firstName"
                required
                fullWidth
                id="firstName"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                error={firstNameError}
                helperText={firstNameErrorMessage}
                color={firstNameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <TextField
                autoComplete="lastName"
                name="lastName"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                fullWidth
                id="lastName"
                error={lastNameError}
                helperText={lastNameErrorMessage}
                color={lastNameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                variant="outlined"
                error={passwordConfirmationError}
                helperText={passwordErrorConfirmationMessage}
                color={passwordConfirmationError ? "error" : "primary"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="passwordConfirmation">
                Password Confirmation
              </FormLabel>
              <TextField
                required
                fullWidth
                name="passwordConfirmation"
                placeholder="••••••"
                type="password"
                id="passwordConfirmation"
                autoComplete="new-password"
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                }}
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Box
              sx={{
                height: 50,
              }}
            ></Box>
            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
            <Button onClick={()=>{navigate('/login')}} fullWidth variant="outlined">Back to login</Button>
            {info && <Typography>{info}</Typography>}
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
