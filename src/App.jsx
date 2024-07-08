import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect } from "react";
import useGetSelf from "./hooks/useGetSelf";
import { useSelector } from "react-redux";
import { selectActiveUser } from "./features/activeUserSlice";

const router = createBrowserRouter(routes);

function App() {
  // const activeUser = useSelector(selectActiveUser);

  // const handleGetProfile = useGetSelf();

  // console.log("active", activeUser);
  // useEffect(() => {
  //   handleGetProfile();
  // }, [handleGetProfile]);

  return <RouterProvider router={router} />;
}

export default App;
