import { createSlice } from "@reduxjs/toolkit";

export const authUsererSlice = createSlice({
  name: "authedUser",
  initialState: null,
  reducers: {
    setAuthUser(state, action) {
      console.log("action", action);
      return action.payload.id;
    },
  },
});

export const { setAuthUser } = authUsererSlice.actions;

export default authUsererSlice.reducer;
