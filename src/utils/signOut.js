import { useNavigate } from "react-router-dom";
import { persistor } from "../app/store";

const useSignOut = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      sessionStorage.clear();
      persistor.purge();
      navigate("/auth/login");
    } catch (err) {
      console.log("Error signing out user", err);
    }
  };

  return { signOut };
};

export default useSignOut;
