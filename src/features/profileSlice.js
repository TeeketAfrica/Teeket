import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setProfile } = eventSlice.actions;
