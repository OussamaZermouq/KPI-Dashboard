import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import emailjs from "emailjs-com";

export default function Signup({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // EmailJS configuration
    const serviceID = "service_gxhl8xb"; // Replace with your EmailJS service ID
    const templateID = "template_7xgnnht"; // Replace with your EmailJS template ID
    const userID = "YyKhji9TdQUJ-oNn4"; // Replace with your EmailJS user ID

    const templateParams = {
      name: name,
      email: email,
      admin_email: "medaminekhaddi@gmail.com",
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      alert("Signup information sent to the administrator!");
      if (onClose) onClose();
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
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </form>
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          Welcome to Optim Web Site , we will contact you soon.
        </Typography>
      </Box>
    </Box>
  );
}