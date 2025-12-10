import { createBrowserRouter as Router, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";

import * as AUTH_PAGES from "@pages/auth";
import * as PARTNER from "@pages/partner";
import * as EXECUTIVE from "@pages/executive";
import { ExecutiveProtected, PartnerProtected } from "@guards";

export const router = Router([
  {
    path: ROUTES.root,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.loginPage} replace />,
      },
      {
        path: ROUTES.loginPage,
        element: <AUTH_PAGES.LoginLandingPage />,
      },

      // Partner layout
      {
        path: ROUTES.partner.root,
        element: (
          <PartnerProtected>
            <PARTNER.PartnerLayout />
          </PartnerProtected>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.partner.dashboard} replace />,
          },
          {
            path: ROUTES.partner.dashboard,
            element: <PARTNER.Dashboard />,
          },
          {
            path: ROUTES.partner.executives.root,
            element: <PARTNER.Executives />,
          },
          {
            path: ROUTES.partner.orders.root,
            element: <PARTNER.MyOrders />,
          },
          {
            path: ROUTES.partner.settings,
            element: <PARTNER.Settings />,
          },
        ],
      },

      // Executive layout
      {
        path: ROUTES.partner_executive.root,
        element: (
          <ExecutiveProtected>
            <EXECUTIVE.ExecutiveLayout />
          </ExecutiveProtected>
        ),
      },
    ],
  },
]);
