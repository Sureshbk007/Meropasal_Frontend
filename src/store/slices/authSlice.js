import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.error = null;
        state.isLogged = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isLogged = false;
        state.data = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLogged = false;
        state.data = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data.errors);
      }
      return data;
    } catch (error) {
      return rejectWithValue({ message: "Failed to login" });
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data.message;
    } catch (error) {
      return rejectWithValue({ message: "Failed to logout" });
    }
  }
);

export default authSlice.reducer;
