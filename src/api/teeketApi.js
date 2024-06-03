import axios from "axios";
import { teeketBaseUrl } from "../utils/constants";
import useIsUserAuth from "../hooks/useIsUserAuth";

const token = useIsUserAuth();

const teeketApi = axios.create({
  baseURL: teeketBaseUrl,
});

teeketApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";

  console.log(token);
  return config;
});

export default teeketApi;
