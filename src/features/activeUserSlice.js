import { createSlice } from "@reduxjs/toolkit";

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: null,
  reducers: {
    setActiveUser: (state, action) => {
      return action.payload;
    },
    clearActiveUser: () => null,
    setUserFirstName: (state, action) => {
      if (state) {
        state.first_name = action.payload;
      }
    },
    setUserLastName: (state, action) => {
      if (state) {
        state.last_name = action.payload;
      }
    },
    setIsCreator: (state, action) => {
      if (state) {
        state.is_creator = action.payload;
      }
    },
  },
});

export const { setActiveUser, clearActiveUser, setUserFirstName, setUserLastName, setIsCreator } = activeUserSlice.actions;
export const selectActiveUser = (state) => state.activeUser;
export default activeUserSlice.reducer;