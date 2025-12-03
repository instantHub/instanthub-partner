import React from "react";
import { ROUTES } from "@routes";
import { Navigate } from "react-router-dom";
import { useUserProfileQuery } from "@features/api";
import { AVAILABLE_ROLE } from "@utils/constants";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const ExecutiveProtected: React.FC<AdminProtectedRouteProps> = ({
  children,
}) => {
  console.log("ExecutiveProtectedRoute called..!");

  const { data: user, isLoading, isError, isSuccess } = useUserProfileQuery();
  // console.log("user - ExecutiveProtectedRoute", user, isSuccess);

  const LayoutMap: Record<string, any> = {
    [AVAILABLE_ROLE.PARTNER_EXECUTIVE]: <>{children}</>,
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

  return layout;
};
