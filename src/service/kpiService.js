import axios from "axios";

export async function getKPI(sheetName, city, date, file) {
  const token = localStorage.getItem("jwt-token");
  if (!token) {
    console.error("No token found");
  }

  let data = new FormData();
  data.append("file", file);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/upload?city=${encodeURI(city)}&sheet_name=${encodeURI(sheetName)}&date=${date}`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching KPI data:", error);
    return null;
  }
}

export async function getFileInfo(file) {
  const token = localStorage.getItem("jwt-token");
  if (!token) {
  }

  let data = new FormData();
  data.append("file", file);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/info`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching sheet names:", error);
    return null;
  }
}
