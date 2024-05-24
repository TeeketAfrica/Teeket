import axios from "axios";
import { authBaseUrl } from "../utils/constants";

const authApi = axios.create({
  baseURL: authBaseUrl,
  headers: {
    "Content-Type": "application/json",
    // Add any other custom headers here
  },
  // Add other custom config here if needed
});

export default authApi;
