import { createBrowserRouter as Router, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";

import * as AUTH_PAGES from "@pages/auth";
import ProtectedRoute from "src/guards/Protect";
import { Dashboard } from "@pages/dashboard";
import { Layout } from "@pages/layout";

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
      {
        path: ROUTES.partner_dashboard,
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
