import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { useDispatch } from "react-redux";

const useSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await authApi.post("/refresh_token", {
        refresh_token: sessionStorage.getItem("TOKEN"),
      });

      sessionStorage.clear("TOKEN");
      dispatch({ type: "RESET_APP" });
      navigate("/auth/login");
    } catch (err) {
      console.log("Error signing out user", err);
    }
  };

  return { signOut };
};

export default useSignOut;
