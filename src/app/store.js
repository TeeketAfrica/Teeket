import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import eventReducer from "../features/eventSlice";
import userReducer from "../features/userSlice";
import activeUserReducer from "../features/activeUserSlice";

const persistConfig = {
  key: "root",
  storage,
};

const allReducers = combineReducers({
  event: eventReducer,
  user: userReducer,
  activeUser: activeUserReducer,
});

const persistedReducer = persistReducer(persistConfig, allReducers);

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
