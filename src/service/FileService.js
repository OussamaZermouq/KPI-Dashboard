import axios from "axios";

const BASE_URL_SPRING = "http://localhost:8005/api/v1/file";
const BASE_URL_PYTHON = "http://localhost:8000";

export async function getAllFiles() {
  const TOKEN = localStorage.getItem("jwt-token");

  if (!TOKEN) {
    console.error("No token found");
  }
  let config = {
    method: "get",
    url: BASE_URL_SPRING + "/",
    headers: {
      Authorization: `${TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error files :", error);
    return null;
  }
}

export async function getFileByHash(fileHash) {
  const TOKEN = localStorage.getItem("jwt-token");

  if (!TOKEN) {
    console.error("No token found");
  }
  let config = {
    method: "get",
    url: BASE_URL_SPRING + "/byhash?fileHash=" + fileHash,
    headers: {
      Autorization: `${TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error file :", error);
    return null;
  }
}

export async function uploadFileToCloud(file) {
  const TOKEN = localStorage.getItem("jwt-token");

  if (!TOKEN) {
    console.error("No token found");
    throw new Error("No token found");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      BASE_URL_PYTHON + "/uploadForCloud",
      formData,
      {
        headers: {
          Authorization: `${TOKEN}`,
        },
        maxBodyLength: Infinity,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteFileFromCloud(fileId) {
  const TOKEN = localStorage.getItem("jwt-token");
  if (!TOKEN) {
    console.error("No token found");
    throw new Error("No token found");
  }
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${BASE_URL_SPRING}?fileId=${fileId}`,
    headers: {
      Authorization: `${TOKEN}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error file :", error);
    throw error;
  }
}

export async function updateFileCloud(file, fileId) {
  const TOKEN = localStorage.getItem("jwt-token");

  if (!TOKEN) {
    console.error("No token found");
    throw new Error("No token found");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.put(
      BASE_URL_PYTHON + "/updateForCloud?fileId=" + fileId,
      formData,
      {
        headers: {
          Authorization: `${TOKEN}`,
        },
        maxBodyLength: Infinity,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
