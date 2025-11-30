export const ROUTES = {
  root: "/",
  loginPage: "/dashboard-login",
  accessDenied: "/access-denied",

  partner_dashboard: "/partner/dashboard",
  executive_dashboard: "/executive/dashboard",

  updateProfile: "/update-profile",

  ordersList: "/orders",
  ordersListByStatus: "/orders/:filter",
  orderDetail: "/orders/:orderId/order-detail",
  orderReQuote: "/order-detail/:orderId/re-quote",
  orderReQuoteCompletion: "/order-detail/:orderId/re-quote/completion",

  executive: {
    root: "/executive",
    dashboard: "/executive/dashboard",
    orders: "/executive/orders/:type",
    ordersToday: "/executive/orders/today",
    orderDetail: "/executive/:orderId/order-detail",
  },
};
