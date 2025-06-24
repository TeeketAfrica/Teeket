import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme.js";
import { persistor, store } from "./app/store.js";
import { ModalProvider } from "./context/ModalContext.jsx";
import ReusableModal from "./components/modal";
import { PersistGate } from "redux-persist/integration/react";
import { SearchProvider } from "./context/SearchContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { clientId } from "./utils/constants.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <SearchProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ChakraProvider theme={theme}>
              <GoogleOAuthProvider clientId={clientId}>
                <App />
              </GoogleOAuthProvider>
              <ReusableModal />
            </ChakraProvider>
          </PersistGate>
        </Provider>
      </SearchProvider>
    </ModalProvider>
  </React.StrictMode>
);
