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
    try {
      const dataToEncrypt =
        typeof data === "string" ? data : JSON.stringify(data);
      return CryptoJS.AES.encrypt(dataToEncrypt, SECRET_KEY).toString();
    } catch (error) {
      console.error("Error encrypting data:", error);
      return null;
    }
  };

  const decrypt = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        throw new Error("Decryption resulted in empty string");
      }
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
    try {
      const encryptedValue = encrypt(value);
      if (encryptedValue === null) {
        throw new Error("Encryption failed");
      }
      Cookies.set(token, encryptedValue, options);
    } catch (error) {
      console.error(`Error setting cookie ${token}:`, error);
    }
  };

  const getCookie = (token) => {
    try {
      const encryptedValue = Cookies.get(token);
      if (!encryptedValue) {
        return null;
      }
      return decrypt(encryptedValue);
    } catch (error) {
      console.error(`Error getting cookie ${token}:`, error);
      return null;
    }
  };

  const setAccessToken = (
    value,
    options = { expires: ACCESS_TOKEN_EXPIRY_SECONDS }
  ) => {
    setCookie("access_token", value, options);
  };

  const setRefreshToken = (
    value,
    options = { expires: REFRESH_TOKEN_EXPIRY_SECONDS }
  ) => {
    setCookie("refresh_token", value, options);
  };

  const setName = (value, options) => {
    setCookie("name", value, options);
  };

  const removeCookie = (token, options) => {
    try {
      Cookies.remove(token, options);
    } catch (error) {
      console.error(`Error removing cookie ${token}:`, error);
    }
  };

  const removeAccessToken = (options) => {
    removeCookie("access_token", options);
  };

  const removeRefreshToken = (options) => {
    removeCookie("refresh_token", options);
  };

  const getAccessToken = () => {
    return getCookie("access_token");
  };

  const getRefreshToken = () => {
    return getCookie("refresh_token");
  };

  const getName = () => {
    return getCookie("name");
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

export default useStorage;
