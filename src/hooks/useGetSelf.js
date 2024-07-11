import { useDispatch } from "react-redux";
import { setActiveUser } from "../features/activeUserSlice";
import teeketApi from "../api/teeketApi";
import { useToast } from "@chakra-ui/react";

export default function useGetSelf() {
  const dispatch = useDispatch();
  const toast = useToast();

  async function handleGetSelf() {
    const token = sessionStorage.getItem("TOKEN");

    if (token) {
      try {
        const response = await teeketApi.get("/user/profile");
        const userData = response.data;
        dispatch(setActiveUser(userData));
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || "An error occured";
        toast({
          title: "Events failed to fetch.",
          description: `${errorMessage}`,
          status: "error",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    }
  }

  return handleGetSelf;
}
