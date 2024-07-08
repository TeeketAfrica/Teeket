import axios from "axios";
import { authBaseUrl } from "../utils/constants";

const token = sessionStorage.getItem("TOKEN");

const authApi = axios.create({
  baseURL: authBaseUrl,
  headers: {
    common: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // Token: localStorage.getItem("psp-tks"),
    },
  },
  // Add other custom config here if needed
});

export default authApi;
