import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Signup({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = "https://getform.io/f/axowqxrb";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
        console.log("Response:", response); // Log the response for debugging
      if (response.ok) {
        alert("Signup information sent to the administrator!");
        if (onClose) onClose();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Failed to send form:", error);
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