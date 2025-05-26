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
      localStorage.setItem(
        "jwt-token",
        "Bearer " + response.data["access_token"]
      );
      localStorage.setItem(
        "refresh-token",
        "Bearer " + response.data["refresh_token"]
      );
    }

    return response.status;
  } catch (err) {
    console.log(err);
    return err
  }
};
export default LoginService;

export const signupService = async (firstName, lastName, email, password) => {
  const endpoint = "https://getform.io/f/axowqxrb";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: {
        name: firstName + " " + lastName,
        email: email,
      },
    });
    console.log("Response:", response);
    if (response.status === 200) {
      let config = {
        method:"post",
        url: BASE_URL+ "/signup",
        data: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      };
      console.log({config})
      const userCreationResponse = await axios.request(config);
      console.log(userCreationResponse)
    }
    return response;
  } catch (error) {
    console.error("Failed to send form:", error);
    return error;
  }
};

/**
 * Refresh token function - gets a new access token using the refresh token
 * @returns {Promise<boolean>} True if refresh was successful, false otherwise
 */

export async function refreshToken() {
  const REFRESH_TOKEN = localStorage.getItem("refresh-token");

  if (!REFRESH_TOKEN) {
    return false;
  }

  let config = {
    method: "post",
    url: BASE_URL + "/refresh",
    headers: {
      Accept: "*/*",
    },
    data: {
      "refresh-token": REFRESH_TOKEN,
    },
  };

  try {
    const response = await axios.request(config);
    if (response.status === 200) {
      localStorage.setItem(
        "jwt-token",
        "Bearer " + response.data["access_token"]
      );

      localStorage.setItem(
        "refresh-token",
        "Bearer " + response.data["refresh_token"]
      );
      return true;
    } else {
      localStorage.removeItem("jwt-token");
      localStorage.removeItem("refresh-token");

      return false;
    }
  } catch (e) {
    console.error("Token refresh failed:", e);

    localStorage.removeItem("jwt-token");
    localStorage.removeItem("refresh-token");

    return false;
  }
}

export function decodedJwtToken() {
  let jwtToken = localStorage.getItem("jwt-token");
  let decodedToken = jwtDecode(jwtToken);
  return decodedToken;
}
