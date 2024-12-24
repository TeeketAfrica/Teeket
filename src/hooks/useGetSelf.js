import { useDispatch } from "react-redux";
import { setActiveUser } from "../features/activeUserSlice";

import { useToast } from "@chakra-ui/react";
import { teeketApi } from "../utils/api";
import { useStorage } from "../utils/storage";

export default function useGetSelf() {
  const dispatch = useDispatch();
  const toast = useToast();

  async function handleGetSelf() {
    const { getAccessToken } = useStorage();
    const token = getAccessToken();
    

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
