import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

export const axiosAPI = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});
