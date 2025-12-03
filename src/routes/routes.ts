export const ROUTES = {
  root: "/",
  loginPage: "/dashboard-login",
  accessDenied: "/access-denied",

  updateProfile: "/update-profile",

  partner: {
    root: "partner",
    dashboard: "dashboard",
    settings: "settings",
    executives: {
      root: "executives",
    },
    orders: {
      root: "orders",
      list: "list",
      listByStatus: ":filter",
      detail: ":orderId/order-detail",
      orderReQuote: "/order-detail/:orderId/re-quote",
      orderReQuoteCompletion: "/order-detail/:orderId/re-quote/completion",
    },
  },

  partner_executive: {
    root: "partner-executive",
    settings: "settings",
    dashboard: "dashboard",
    orders: {
      root: "orders",
      today: "today",
      detail: ":orderId/order-detail",
    },
  },
};
