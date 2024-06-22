import axios from "axios";
import { teeketBaseUrl } from "../utils/constants";

const teeketApi = axios.create({
  baseURL: teeketBaseUrl,
});

teeketApi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("TOKEN");
    console.log("token", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default teeketApi;
