import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import emailjs from "emailjs-com";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const BASE_URL = "http://localhost:8005/api/v1/auth";

const LoginService = async (email, password) => {
  var body = { email: email, password: password };
  try {
    const response = await axios.post(
      BASE_URL + "/login",
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    if (response.status === 200) {
      localStorage.setItem("jwt-token", "Bearer " + response.data["token"]);
    }

    return response.status;
  } catch (err) {
    console.log(err);
  }
};
export default LoginService;


export function decodedJwtToken(){
  let jwtToken = localStorage.getItem('jwt-token');
  let decodedToken = jwtDecode(jwtToken);
  return decodedToken;
}