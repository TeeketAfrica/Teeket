import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserDetails,
  setToken,
  setUserDetails,
} from "../features/userSlice";
import { setEventDetails } from "../features/eventSlice";

const useSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(selectUserDetails);

  const signOut = async () => {
    try {
      await authApi.post("/refresh_token", {
        refresh_token: token,
      });

      sessionStorage.clear("TOKEN");
      dispatch(setToken(null));
      dispatch(setUserDetails([]));
      dispatch(setEventDetails([]));
      navigate("/auth/login");
    } catch (err) {
      console.log("Error signing out user", err);
    }
  };

  return { signOut };
};

export default useSignOut;
