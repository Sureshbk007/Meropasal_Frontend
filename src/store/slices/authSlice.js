import { createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";

const initialState = {
  isLogged: true,
  data: {
    id: "1",
    fullName: "Suresh bk",
    email: "suresh@gmail.com",
    role: "ADMIN",
    img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
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
      state.data = {};
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
