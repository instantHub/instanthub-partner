export const AVAILABLE_ROLE = {
  PARTNER: "partner",
  EXECUTIVE: "executive",
} as const;

export type TAvailableRole =
  (typeof AVAILABLE_ROLE)[keyof typeof AVAILABLE_ROLE];
