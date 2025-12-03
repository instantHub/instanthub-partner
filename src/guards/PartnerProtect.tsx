import React from "react";
import { useUserProfileQuery } from "@features/api";
import { ROUTES } from "@routes";
import { Navigate } from "react-router-dom";
import { AVAILABLE_ROLE } from "@utils/constants";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const PartnerProtected: React.FC<AdminProtectedRouteProps> = ({
  children,
}) => {
  console.log("PartnerProtected called..!");

  const { data: user, isLoading, isError } = useUserProfileQuery();
  // console.log("user - AdminProtectedRoute", user, isSuccess);

  // const LayoutMap: Record<string, JSX.Element> = {
  const LayoutMap: Record<string, any> = {
    [AVAILABLE_ROLE.PARTNER]: <>{children}</>,
    // [AVAILABLE_ROLE.PARTNER_EXECUTIVE]: <>{children}</>,
    [AVAILABLE_ROLE.PARTNER_EXECUTIVE]: (
      <Navigate to={ROUTES.partner_executive.root} replace />
    ),
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Checking authentication...
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to={ROUTES.loginPage} replace />;
  }

  const layout = LayoutMap[user.role] ?? (
    <Navigate to={ROUTES.accessDenied} replace />
  );

  // ✅ Authenticated and authorized
  return layout;
};
