import { TAvailableRole } from "@utils/constants";

export type TPermissionAction = "read" | "create" | "update" | "delete" | "*";

export interface IPermissions {
  actions: TPermissionAction[];
  resource: string; // e.g., "user", "post", etc.
}

export interface IPartner {
  _id: string;
  name: string;
  email: string;
  phone: string | number;
  role: TAvailableRole;
  permissions: IPermissions[];
  sessionExpiry: number;
  token: string;
  passwordChangedAt: string;
}

export interface IPartnerLogoutRequest {
  admin: IPartner;
}

export interface IPartnerAuthState {
  admin: IPartner | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface IPartnerLoginCredentials {
  email: string;
  password: string;
  role: TAvailableRole;
}

export interface IPartnerLoginResponse {
  partner: IPartner;
}
