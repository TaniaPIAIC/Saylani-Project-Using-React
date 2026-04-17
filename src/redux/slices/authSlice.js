import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userType: null, // 'student', 'admin', null
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.userType = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Set user
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    // Set user type
    setUserType: (state, action) => {
      state.userType = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  setUserType,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
