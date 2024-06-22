import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/userSlice";

const useIsUserAuthenticated = () => {
  const { token } = useSelector(selectUserDetails);
  return !!token;
};

export default useIsUserAuthenticated;
