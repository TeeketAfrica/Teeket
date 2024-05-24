import axios from "axios";
import { teeketBaseUrl } from "../utils/constants";

const teeketApi = axios.create({
  baseURL: teeketBaseUrl,
  headers: {
    "Content-Type": "application/json",
    // Add any other custom headers here
  },
  // Add other custom config here if needed
});

export default teeketApi;
