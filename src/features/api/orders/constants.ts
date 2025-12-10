export const UNASSIGNED_ORDERS_TAG = "UnAssigned Orders";
export const MY_ORDERS_API_TAG = "My Orders";
export const ORDERS_API_TAG = "Orders";
export const ORDER_DETAIL_API_TAG = "Order Detail";
export const ORDER_STATS_API_TAG = "OrderStats";

const BASE = "/api/partners-orders";

export const ORDER_API_PATHS = {
  BASE: BASE,
  BY_LOCATION: `${BASE}/by-location`,
  MY_ORDERS: `${BASE}/my-orders`,
  ASSIGN_ORDER: `${BASE}/assign-order`,
  UNASSIGN_ORDER: (id: string) => `/api/orders/${id}/unassign-order`,
} as const;
