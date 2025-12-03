import React, { useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@routes";
import { Home, LogOut, Settings, Users } from "lucide-react";
import { useLogoutMutation, useUserProfileQuery } from "@features/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "@features/slices";
import { TAvailableRole } from "@utils/constants";
import { Button } from "@components/general";

// Define the links available to the Partner Role
const PARTNER_NAV_LINKS = [
  {
    name: "Dashboard",
    path: ROUTES.partner_executive.root, // The index route of the partner dashboard
    icon: Home,
    description: "View your key metrics and performance overview.",
  },
  {
    name: "Orders",
    path: ROUTES.partner_executive.orders.root, // Placeholder path for future executive management
    icon: Users,
    description: "Manage and oversee your executive team members.",
  },
  {
    name: "Settings",
    path: ROUTES.partner_executive.settings, // Placeholder path for partner profile settings
    icon: Settings,
    description: "Update your profile, preferences, and account details.",
  },
];

export const ExecutiveLayout: React.FC = () => {
  const { data: user, isSuccess } = useUserProfileQuery();

  const [logout] = useLogoutMutation();
  const location = useLocation();

  const dispatch = useDispatch();

  // Placeholder Logout Function
  const handleLogout = async () => {
    try {
      await logout({
        id: user?._id ?? "",
        role: user?.role as TAvailableRole,
      }).unwrap();
      toast.success("Logged out successfully");
      //   dispatch(logoutAction());
      window.location.href = ROUTES.loginPage;
    } catch (error) {}
  };

  // Check if we are on the main dashboard index route.
  // We only want to show the large navigation cards on the main dashboard.
  const isDashboardIndex = location.pathname.includes(ROUTES.partner.dashboard);

  // --- Shared Link Component for Mobile Bottom Nav ---
  const MobileNavLinkItem: React.FC<{
    to: string;
    icon: React.ElementType;
    label: string;
  }> = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center p-2 w-full transition duration-150 text-xs ${
          isActive
            ? "text-indigo-700 font-semibold"
            : "text-gray-500 hover:text-indigo-600"
        }`
      }
    >
      <Icon className="w-5 h-5 mb-0.5" />
      <span>{label}</span>
    </NavLink>
  );

  // --- Card Component for Desktop/Tablet Navigation ---
  const NavCard: React.FC<{
    to: string;
    icon: React.ElementType;
    label: string;
    description: string;
  }> = ({ to, icon: Icon, label, description }) => (
    <NavLink
      to={to}
      className="block p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02] border border-gray-100 hover:border-indigo-400"
    >
      <div className="flex items-start">
        <Icon className="w-8 h-8 text-indigo-600 mr-4 mt-1" />
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">{label}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </NavLink>
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && user) {
      console.log("isSuccess && data");

      dispatch(setCredentials({ user: user }));
    }
  }, [isSuccess, user, dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header (Sticky) */}
        <header className="bg-white shadow z-10 sticky top-0">
          <div className="flex justify-between items-center p-4 border-b">
            {/* Branding/Title */}
            <Button
              variant="ghost"
              onClick={() => navigate(`/${ROUTES.partner_executive.root}`)}
              className="text-xl font-bold text-indigo-700"
            >
              Executive Portal
            </Button>

            {/* User Info / Logout */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 hidden sm:inline">
                Executive {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-red-600 hover:text-red-700 border border-transparent hover:border-red-300 px-3 py-1 rounded-full transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4 mr-1 sm:mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* 2. Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-6">
          {/* Card-Based Navigation (Visible only on the main dashboard index) */}
          {isDashboardIndex && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Welcome to your Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {PARTNER_NAV_LINKS?.map((link) => (
                  <NavCard
                    key={link.path}
                    to={link.path}
                    icon={link.icon}
                    label={link.name}
                    description={link.description}
                  />
                ))}
              </div>
              <hr className="my-8" />
            </>
          )}

          {/* Nested Route Content */}
          <Outlet />
        </main>

        {/* Footer (Not Fixed, stays at the bottom of the page content) */}
        <footer className="p-3 bg-white border-t text-center text-xs text-gray-500 mt-auto hidden lg:block">
          &copy; {new Date().getFullYear()} InstantHub. All Rights Reserved.
        </footer>
      </div>

      {/* 3. Mobile Bottom Navigation Bar (Fixed) - Primary Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-30 lg:hidden">
        <div className="flex justify-around h-16">
          {PARTNER_NAV_LINKS.slice(0, 3).map((link) => (
            <MobileNavLinkItem
              key={link.path}
              to={link.path}
              icon={link.icon}
              label={link.name}
            />
          ))}
          {/* You could add a Profile/Logout button here if space allows */}
          <div className="flex flex-col items-center justify-center p-2 w-full">
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center text-xs text-red-500 hover:text-red-700 transition"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 mb-0.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
