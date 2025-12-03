import { TAvailableRole } from "@utils/constants";
import { ICreator, IPermissions } from "../auth/types";

export interface IExecutive {
  _id: string;
  name: string;
  email: string;
  phone: string;
  executiveID: string;
  creator: ICreator;
  isActive: boolean;
  loginAttempts: number;
  role: TAvailableRole;
  permissions: IPermissions[];
  sessionExpiry: number;
  passwordChangedAt: string;
  assignedOrders: any[];
  lastLogin?: string;
}

// API REQ & RES
export interface ICreatePartnerExecutiveRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}
export interface ICreatePartnerExecutiveResponse {
  success: boolean;
  message: string;
}
