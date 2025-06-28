import axios from "axios";
import { refreshToken } from "./Login";
const BASE_URL = "http://localhost:8005/api/v1/users";
const TOKEN = localStorage.getItem("jwt-token");

/**
 * Makes an API request with automatic token refresh on 401 errors
 * @param {Object} config - Axios request config
 * @param {boolean} retried - Whether this is a retry after token refresh
 * @returns {Promise<Object>} The API response
 */

export async function makeApiRequest(config, retried = false) {
  try {
    return await axios.request(config);
  } catch (error) {
    
    if (error.response && error.response.status === 401 && !retried) {
      const refreshed = await refreshToken();

      if (refreshed) {
        return makeApiRequest(config, true);
      } else {
        //window.location.href = '/login';
        throw new Error("Authentication failed. Please log in again.");
      }
    }
    throw error;
  }
}

export async function getAllUsers() {
  let config = {
    method: "get",
    url: BASE_URL + "/all",
    headers: {
      Authorization: `${TOKEN}`,
      Accept: "*/*",
    },
  };
  try {
    const response = await makeApiRequest(config);
    if (response.status === 200) {
      return response.data["data"];
    }
  } catch (e) {
    console.error(e);
  }
}

export async function updateUserStatus(email) {
  let config = {
    method: "put",
    url: BASE_URL + "/update/status",
    headers: {
      Authorization: `${TOKEN}`,
      Accept: "*/*",
    },
    data: {
      email: email,
    },
  };
  try {
    const response = await axios.request(config);
    return response.status;
  } catch (e) {
    console.error(e);
  }
}

export async function updateUserInformation(data) {
  let config = {
    method: "put",
    url: BASE_URL + `/update?userId=${data.userId}`,
    headers: {
      Authorization: `${TOKEN}`,
      Accept: "*/*",
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.userRole,
    },
  };

  try {
    const response = await axios.request(config);
    return response.status;
  } catch (e) {
    console.error(e);
  }
}

export default async function createUser(data) {
  const config = {
    method: "post",
    url: BASE_URL + `/create`,
    headers: {
      Authorization: `${TOKEN}`,
      Accept: "*/*",
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      userRole: data.userRole,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    const errorData = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    };

    console.error("Create user error:", error);
    throw errorData;
  }
}

export async function deleteUser(userId) {
  const config = {
    method: "delete",
    url: BASE_URL + `/delete?userId=${userId}`,
    headers: {
      Authorization: `${TOKEN}`,
      Accept: "*/*",
    },
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    const errorData = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    };

    throw errorData;
  }
}
