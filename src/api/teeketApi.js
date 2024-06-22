import axios from "axios";
import { teeketBaseUrl } from "../utils/constants";

const token = sessionStorage.getItem("TOKEN");

const teeketApi = axios.create({
  baseURL: teeketBaseUrl,
});

teeketApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default teeketApi;
