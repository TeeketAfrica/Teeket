import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../features/eventSlice";

const store = configureStore({
  reducer: {
    event: eventReducer,
  },
});

export default store;
