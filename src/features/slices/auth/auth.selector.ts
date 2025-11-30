import { PartnerAuthState } from "./auth.slice";
import { RootState } from "@features/store";

export const selectAdminState = (state: RootState): PartnerAuthState =>
  state.authSlice;
