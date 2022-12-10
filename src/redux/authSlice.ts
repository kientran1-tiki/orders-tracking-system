import { createSlice } from "@reduxjs/toolkit";

const initAuth: any = {
  token: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initAuth,
  reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
