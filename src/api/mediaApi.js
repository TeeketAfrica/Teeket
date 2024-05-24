import axios from "axios";
import { mediaBaseUrl } from "../utils/constants";

const mediaApi = axios.create({
  baseURL: mediaBaseUrl,
  headers: {
    "Content-Type": "application/json",
    // Add any other custom headers here
  },
  // Add other custom config here if needed
});

export default mediaApi;
