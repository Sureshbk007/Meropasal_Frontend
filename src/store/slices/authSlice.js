import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.isLogged = true;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.isLogged = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
