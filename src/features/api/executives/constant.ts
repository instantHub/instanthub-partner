export const EXECUTIVE_API_TAG = "Executive";

const BASE = "/api/partners";

export const EXECUTIVES_API_PATHS = {
  BASE: `${BASE}/executive`,
  BY_ID: (id: string) => `${BASE}/${id}/executive`,
} as const;
