import { IPartner } from "@features/api/auth/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PartnerAuthState {
  user: IPartner | null;
  isAuthenticated: boolean;
  loading: boolean;
  sessionExpiry?: number | null;
}

const initialState: PartnerAuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  sessionExpiry: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: IPartner }>) => {
      const { user } = action.payload;
      // console.log("setCred slice", admin);

      state.user = user;
      state.isAuthenticated = true;
      state.sessionExpiry = user?.sessionExpiry;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateSessionExpiry: (state) => {
      state.sessionExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
    },
  },
});

export const { setCredentials, logout, setLoading, updateSessionExpiry } =
  authSlice.actions;

export default authSlice.reducer;
