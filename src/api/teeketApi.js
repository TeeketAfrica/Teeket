import axios from "axios";
import { teeketBaseUrl } from "../utils/constants";
import useIsUserAuth from "../hooks/useIsUserAuth";

const token = useIsUserAuth();

const teeketApi = axios.create({
  baseURL: teeketBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    // Add any other custom headers here
  },
  // Add other custom config here if needed
});

export default teeketApi;
