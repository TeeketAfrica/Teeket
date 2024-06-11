import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import eventReducer from "../features/eventSlice";
import userReducer from "../features/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const allReducers = combineReducers({
  event: eventReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type == "RESET_APP") {
    state = undefined;
  }

  if (action.type == "RESET_EVENT") {
    const { user } = state;
    state = {
      user,
      event: undefined, // Resetting event state
    };
    sessionStorage.setItem("EVENT_PAGE", 0);
  }

  return allReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
