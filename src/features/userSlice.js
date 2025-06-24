import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      name: "",
      imageURL: "",
      email: "",
    },
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.data.name = action.payload.name ?? state.data.name;
      state.data.imageURL = action.payload.imageURL ?? state.data.imageURL;
      state.data.email = action.payload.email ?? state.data.email;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export const selectUserDetails = (state) => state.user; // Corrected selector

export default userSlice.reducer;
