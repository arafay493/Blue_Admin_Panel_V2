import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: string | null;
  jwToken: string | null;
  refreshToken: string | null;
  message: string | null;
  userId: string | null;
  userName: string | null;
  succeeded: boolean;
  userTypeId: number;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  jwToken: null,
  refreshToken: null,
  message: null,
  userId: null,
  userName: null,
  succeeded: false,
  userTypeId: null,
};

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.userId = null;
      state.succeeded = false;
      state.userTypeId = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        jwToken: string;
        refreshToken: string;
        message: string;
        userId: string;
        userName: string;
        succeeded: boolean;
        userTypeId: number;
      }>
    ) {
      state.loading = false;
      state.jwToken = action.payload.jwToken;
      state.refreshToken = action.payload.refreshToken;
      state.message = action.payload.message;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.succeeded = action.payload.succeeded;
      state.userTypeId = action.payload.userTypeId;

      // Store tokens and user data in localStorage
      localStorage.setItem("AuthToken", action.payload.jwToken);
      localStorage.setItem("RefreshToken", action.payload.refreshToken);
      localStorage.setItem("UserId", action.payload.userId);
      localStorage.setItem("UserName", action.payload.userName);
      localStorage.setItem("UserTypeId", String(action.payload.userTypeId));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.succeeded = false;
    },
    logout(state) {
      state.jwToken = null;
      state.refreshToken = null;
      state.message = null;
      state.userId = null;
      state.userName = null;
      state.succeeded = false;
      state.userTypeId = null;

      // Clear localStorage
      localStorage.removeItem("AuthToken");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("UserId");
      localStorage.removeItem("UserName");
      localStorage.removeItem("UserTypeId");
      localStorage.removeItem("previousRoute");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
