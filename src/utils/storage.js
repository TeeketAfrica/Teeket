import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import {
  ACCESS_TOKEN_EXPIRY_SECONDS,
  REFRESH_TOKEN_EXPIRY_SECONDS,
} from "./constants";

const SECRET_KEY = import.meta.env.VITE_REACT_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined or is invalid");
}

export const useStorage = () => {
  const encrypt = (data) => {
    const dataToEncrypt =
      typeof data === "string" ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(dataToEncrypt, SECRET_KEY).toString();
  };

  const decrypt = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      try {
        return JSON.parse(decryptedText);
      } catch {
        return decryptedText;
      }
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  };
  const setCookie = (token, value, options) => {
    const encryptedValue = encrypt(value);
    Cookies.set(token, encryptedValue, options);
  };

  const setAccessToken = (
    value,
    options = { expires: ACCESS_TOKEN_EXPIRY_SECONDS }
  ) => {
    const encryptedValue = encrypt(value);
    Cookies.set("access_token", encryptedValue, options);
  };

  const setRefreshToken = (
    value,
    options = { expires: REFRESH_TOKEN_EXPIRY_SECONDS }
  ) => {
    const encryptedValue = encrypt(value);
    Cookies.set("refresh_token", encryptedValue, options);
  };

  const setName = (value, options) => {
    const encryptedValue = encrypt(value);
    Cookies.set("name", encryptedValue, options);
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
    const encryptedValue = Cookies.get(token);
    return encryptedValue ? decrypt(encryptedValue) : null;
  };

  const getAccessToken = () => {
    const encryptedValue = Cookies.get("access_token");
    return encryptedValue ? decrypt(encryptedValue) : null;
  };

  const getRefreshToken = () => {
    const encryptedValue = Cookies.get("refresh_token");
    return encryptedValue ? decrypt(encryptedValue) : null;
  };

  const getName = () => {
    const encryptedValue = Cookies.get("name");
    return encryptedValue ? decrypt(encryptedValue) : null;
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
    setName,
    getName,
  };
};
