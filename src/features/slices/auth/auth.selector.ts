import { PartnerAuthState } from "./auth.slice";
import { RootState } from "@features/store";

export const selectUserState = (state: RootState): PartnerAuthState =>
  state.authSlice;
