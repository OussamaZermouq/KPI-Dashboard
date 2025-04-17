import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import emailjs from "emailjs-com";

export default function Login({ onLogin, onShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted with email:", email, "password:", password);
    localStorage.setItem("jwt-token", "dummy-token"); // Simulate token storage
    onLogin(); // Trigger login callback
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onShowSignup} // Show the signup form
          >
            Signup
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export function Signup({ onClose, onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceID = "service_gxhl8xb"; // Replace with your EmailJS service ID
    const templateID = "template_7xgnnht"; // Replace with your EmailJS template ID
    const userID = "xvQbznqBbE4Y8ewoW"; // Replace with your EmailJS user ID

    const templateParams = {
      name: name,
      email: email,
      admin_email: "medaminekhaddi@gmail.com",
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      alert("Signup information sent to the administrator!");
      if (onSignup) onSignup(); // Notify App.js of successful signup
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send signup information. Please try again.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h5" mb={2}>
        Signup Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            OK
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose} // Close the signup form
          >
            Cancel
          </Button>
        </Box>
      </form>
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          we will contact you soon. 
        </Typography>
      </Box>
    </Box>
  );
}