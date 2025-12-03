import { ROUTES } from "@routes";

export const BASE_URL = "/api/partners";

export const AVAILABLE_ROLE = {
  PARTNER: "partner",
  PARTNER_EXECUTIVE: "partner_executive",
} as const;

export type TAvailableRole =
  (typeof AVAILABLE_ROLE)[keyof typeof AVAILABLE_ROLE];

export const DASHBOARDS_ROUTES_ENUM = {
  [AVAILABLE_ROLE.PARTNER]: ROUTES.partner.root,
  [AVAILABLE_ROLE.PARTNER_EXECUTIVE]: ROUTES.partner_executive.root,
};
