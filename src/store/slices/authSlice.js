import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.data = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
      state.data = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
