import Cookies from "js-cookie";

export const useStorage = () => {
  const setCookie = (token, value, options) => {
    Cookies.set(token, value, options);
  };
  const setAccessToken = (value, options) => {
    Cookies.set("access_token", value, options);
  };
  const setRefreshToken = (value, options) => {
    Cookies.set("refresh_token", value, options);
  };
  const removeCookie = (token, options) => {
    Cookies.remove(token, options);
  };
  const removeAccessToken = (options) => {
    Cookies.remove("access_token", options);
  };
  const removeRefreshToken = (options) => {
    Cookies.remove("refresh_token", options);
  };
  const getCookie = (token) => {
    Cookies.get(token);
  };
  const getAccessToken = () => {
    return Cookies.get("access_token");
  };
  const getRefreshToken = () => {
    return Cookies.get("refresh_token");
  };

  return {
    setCookie,
    removeCookie,
    getCookie,
    getAccessToken,
    getRefreshToken,
    setRefreshToken,
    setAccessToken,
    removeRefreshToken,
    removeAccessToken,
  };
};
