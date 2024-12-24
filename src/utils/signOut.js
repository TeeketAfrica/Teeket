import { useNavigate } from "react-router-dom";
import { persistor } from "../app/store";
import { useStorage } from "./storage";

const useSignOut = () => {
  const navigate = useNavigate();
  const { removeAccessToken, removeRefreshToken } = useStorage();

  const signOut = async () => {
    try {
      sessionStorage.clear();
      removeRefreshToken();
      removeAccessToken();
      persistor.purge();
      navigate("/auth/login");
    } catch (err) {
      console.log("Error signing out user", err);
    }
  };

  return { signOut };
};

export default useSignOut;
