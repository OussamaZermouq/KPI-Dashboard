import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../../shared-theme/AppTheme';
import emailjs from "emailjs-com";
import ColorModeSelect from '../../../shared-theme/ColorModeSelect';
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SingupComponent(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [firstNameError, setFirstNameError] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setNameErrorMessage] = React.useState('');
  
  const [email, setEmail] = useState("");

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!firstName.value || firstName.value.length < 1) {
      setFirstNameError(true);
      setFirstNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }

    if (!lastName.value || lastName.value.length < 1) {
      setLastNameError(true);
      setLastNameError('last name is required.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( lastNameError || firstNameError || emailError || passwordError) {
      e.preventDefault();
      return;
    }

    const data = new FormData(e.currentTarget);
    const serviceID = "service_gxhl8xb"; // Replace with your EmailJS service ID
    const templateID = "template_7xgnnht"; // Replace with your EmailJS template ID
    const userID = "xvQbznqBbE4Y8ewoW"; // Replace with your EmailJS user ID

    const templateParams = {
      name: data.get('firstName'),
      email: data.get('email'),
      admin_email: "medaminekhaddi@gmail.com",
    };

    try {
      console.log(templateParams)
      await emailjs.send(serviceID, templateID, templateParams, userID);
      alert("Signup information sent to the administrator!");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send signup information. Please try again.");
    }
  };


  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <TextField
                autoComplete="firstName"
                name="firstName"
                required
                fullWidth
                id="firstName"
                error={firstNameError}
                helperText={firstNameErrorMessage}
                color={firstNameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <TextField
                autoComplete="lastName"
                name="lastName"
                required
                fullWidth
                id="lastName"
                error={lastNameError}
                helperText={lastNameErrorMessage}
                color={lastNameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
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
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Box sx={{
                height:50
            }}>

            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>

        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}


// export function Signup({ onClose, onSignup }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const serviceID = "service_gxhl8xb"; // Replace with your EmailJS service ID
//     const templateID = "template_7xgnnht"; // Replace with your EmailJS template ID
//     const userID = "xvQbznqBbE4Y8ewoW"; // Replace with your EmailJS user ID

//     const templateParams = {
//       name: name,
//       email: email,
//       admin_email: "medaminekhaddi@gmail.com",
//     };

//     try {
//       await emailjs.send(serviceID, templateID, templateParams, userID);
//       alert("Signup information sent to the administrator!");
//       if (onSignup) onSignup(); // Notify App.js of successful signup
//     } catch (error) {
//       console.error("Failed to send email:", error);
//       alert("Failed to send signup information. Please try again.");
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
//       <Typography variant="h5" mb={2}>
//         Signup Form
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <Box display="flex" justifyContent="space-between" mt={2}>
//           <Button type="submit" variant="contained" color="primary">
//             OK
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={onClose} // Close the signup form
//           >
//             Cancel
//           </Button>
//         </Box>
//       </form>
//       <Box mt={4}>
//         <Typography variant="body2" color="textSecondary">
//           we will contact you soon.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }