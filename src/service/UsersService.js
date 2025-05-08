import axios from "axios";

const BASE_URL = "http://localhost:8005/api/v1/users";
const TOKEN = localStorage.getItem("jwt-token");
export async function getAllUsers() {
  let config = {
    method: "get",
    url: BASE_URL+"/all",
    headers: {
      Authorization: `${TOKEN}`,
      Accept:'*/*'
    },
  };
  try {
    const response = await axios.request(config);
    if (response.status === 200) {
      return response.data['data'];
    }
  } catch (e) {
    console.error(e);
  }
}

export async function updateUserStatus(email){
  let config = {
    method: "put",
    url: BASE_URL+"/update/status",
    headers: {
      Authorization: `${TOKEN}`,
      Accept:'*/*'
    },
    data:{
      email : email,
    },
  };
  try{
    const response = await axios.request(config);
    return response.status;
  }
  catch(e){
    console.error(e)
  }
}
