import { createBrowserRouter as Router, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";

import * as AUTH_PAGES from "@pages/auth";

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
    ],
  },
]);
