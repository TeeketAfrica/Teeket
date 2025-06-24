import axios from "axios";
import { authBaseUrl, mediaBaseUrl, teeketBaseUrl } from "./constants";
import { useStorage } from "./storage";

// Implementation of the mutex here to prevent multiple concurrent calls.
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  for (const prom of failedQueue) {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  }

  failedQueue = [];
};

// returns an Axios instance
export const createApiInstance = (
  baseURL,
  contentType = "application/json"
) => {
  const { getAccessToken, getRefreshToken, setAccessToken } = useStorage();

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": contentType,
    },
  });

  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      const access_token = getAccessToken();
      if (config.nullAuth) {
        // for requests that requires a null Bearer token
        config.headers.Authorization = `Bearer null`;
      }
      // For authenticated requests, attach the access token if available
      else if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If a refresh is already in process, queue the request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = getRefreshToken();
          console.log(refreshToken)
          const response = await axios.post(`${authBaseUrl}/refresh_token`, {
            refresh_token: refreshToken,
          });

          const accessToken = response.data.access_token;

          // Update access tokens in storage
          setAccessToken(accessToken);

          // Process the queue with the new access token
          processQueue(null, accessToken);
          isRefreshing = false;

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const authApi = createApiInstance(authBaseUrl);
export const mediaApi = createApiInstance(mediaBaseUrl, "multipart/form-data");
export const paymentApi = createApiInstance(teeketBaseUrl);
export const teeketApi = createApiInstance(teeketBaseUrl);
