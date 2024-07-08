import { createSlice } from "@reduxjs/toolkit";

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: null,
  reducers: {
    setActiveUser: (state, action) => {
      return action.payload;
    },
    clearActiveUser: () => null,
  },
});

export const { setActiveUser, clearActiveUser } = activeUserSlice.actions;
export const selectActiveUser = (state) => state.activeUser;  
export default activeUserSlice.reducer;
