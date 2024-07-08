import axios from "axios";
import { mediaBaseUrl } from "../utils/constants";

const token = sessionStorage.getItem("TOKEN");

const mediaApi = axios.create({
  baseURL: mediaBaseUrl,
});

mediaApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "multipart/form-data";
  config.Accept = "application/json";
  return config;
});

export default mediaApi;
