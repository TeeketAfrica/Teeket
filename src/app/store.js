import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../features/eventSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    event: eventReducer,
    user: userReducer,
  },
});

export default store;
