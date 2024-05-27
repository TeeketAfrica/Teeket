import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/userSlice";

const useIsUserAuth = () => {
  const { token } = useSelector(selectUserDetails);
  return !!token;
};

export default useIsUserAuth;
