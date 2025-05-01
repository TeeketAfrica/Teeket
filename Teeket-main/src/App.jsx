import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes/routes";
import useGetSelf from "./hooks/useGetSelf";
import { useEffect } from "react";

const router = createBrowserRouter(routes);

function App() {
  const handleGetProfile = useGetSelf();

  useEffect(() => {
    handleGetProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
