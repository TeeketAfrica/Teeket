import { createSlice } from "@reduxjs/toolkit";

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: null,
  reducers: {
    setActiveUser: (state, action) => {
      return action.payload;
    },
    clearActiveUser: () => null,
    setIsCreator: (state, action) => {
      if (state) {
        state.is_creator = action.payload;
      }
    },
  },
});

export const { setActiveUser, clearActiveUser, setIsCreator } = activeUserSlice.actions;
export const selectActiveUser = (state) => state.activeUser;
export default activeUserSlice.reducer;