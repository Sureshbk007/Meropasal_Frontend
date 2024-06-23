import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  data: null,
  loading: false,
  error: {
    login: null,
    signup: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.error.login = null;
    },
    clearSignupError: (state) => {
      state.error.signup = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.error.signup = null;
        state.isLogged = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error.signup = action.payload.errors;
        state.loading = false;
        state.isLogged = false;
        state.data = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.error.login = null;
        state.isLogged = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error.login = action.payload.errors;
        state.loading = false;
        state.isLogged = false;
        state.data = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLogged = false;
        state.data = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error.login = action.payload;
      });
  },
});

export const { clearLoginError, clearSignupError } = authSlice.actions;

export const signup = createAsyncThunk(
  "auth/signup",
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue({ message: "Failed to signup" });
    }
  }
);

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
        return rejectWithValue(data);
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
