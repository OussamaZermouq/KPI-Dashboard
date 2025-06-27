import axios from "axios";

BASE_URL_SPRING = "http://localhost:8005/api/v1/file";
BASE_URL_PYTHON = "http://localhost:8000/file";
TOKEN = localStorage.getItem("jwt-token");

export async function getFileByHash(fileHash) {
  if (!TOKEN) {
    console.error("No token found");
  }
  let config = {
    method: "get",
    url: BASE_URL + "/byhash?fileHash=" + fileHash,
    headers: {
      Autorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching KPI data:", error);
    return null;
  }
}

export async function uploadFileToCloud(file) {
  if (!TOKEN) {
    console.error("No token found");
  }

  let data = new FormData();
  data.append("file", file);

  let config = {
    method: "post",
    maxBodyLength : Infinity,
    url: BASE_URL_PYTHON + "/uploadForCloud",
    headers: {
      Autorization: `Bearer ${TOKEN}`,
      ...data.getHeaders()
    },
    data:data
  };

  axios
    .request(config)
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
