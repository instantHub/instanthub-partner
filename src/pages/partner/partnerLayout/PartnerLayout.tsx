import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ROUTES } from "@routes";
import {
  Calendar,
  CheckCircle2,
  Clock,
  LogOut,
  Package,
  Settings,
  Users,
  XCircle,
} from "lucide-react";
import {
  useGetOrderStatsQuery,
  useLogoutMutation,
  useUserProfileQuery,
} from "@features/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "@features/slices";
import { TAvailableRole } from "@utils/constants";
import { Loading } from "@components/general";
import { MobileNavLinkItem } from "./MobileNavLinkItem";
import { MiniStat } from "./components";

export const PARTNER_NAV_LINKS = [
  {
    name: "Executives",
    path: ROUTES.partner.executives.root, // Placeholder path for future executive management
    icon: Users,
    description: "Manage and oversee your executive team members.",
  },
  {
    name: "My Orders",
    path: ROUTES.partner.orders.root, // Placeholder path for future executive management
    icon: Users,
    description: "Manage and oversee your executive team members.",
  },
  {
    name: ROUTES.partner.settings,
    path: "/partner/settings", // Placeholder path for partner profile settings
    icon: Settings,
    description: "Update your profile, preferences, and account details.",
  },
];

export const PartnerLayout: React.FC = () => {
  const { data: user, isSuccess } = useUserProfileQuery();
  const { data: statsResponse, isLoading, isError } = useGetOrderStatsQuery();

  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (isSuccess && user) {
      console.log("isSuccess && data");

      dispatch(setCredentials({ user: user }));
    }
  }, [isSuccess, user, dispatch]);

  if (isLoading) return <Loading />;

  if (isError || !statsResponse?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900">Failed to load data</h3>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  const { data } = statsResponse;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header (Sticky) */}
        <header className="bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-800 px-4 pt-8 pb-16 rounded-b-4xl">
          <div className="flex items-center justify-between mb-6">
            <NavLink
              to={ROUTES.partner.dashboard}
              className="text-xl sm:text-2xl font-black text-white"
            >
              Partner Portal
            </NavLink>

            <div className="text-white flex gap-2 sm:gap-5 items-start">
              {PARTNER_NAV_LINKS.map((link, i) => (
                <>
                  <NavLink to={link.path} className="text-base">
                    {link.name}
                  </NavLink>
                  <span>|</span>
                </>
              ))}
              <p className="text-base">Logout</p>
            </div>
          </div>

          {/* Main Stat Card - Active Orders */}
          <StatCard
            label="My Active Orders"
            value={data.myWork.active}
            icon={<Package className="w-6 h-6 text-white" />}
            gradient="bg-gradient-to-br from-white/20 to-white/5 border border-white/20"
            iconBg="bg-white/20"
          />
        </header>

        {/* Stats Grid - Overlapping Header */}
        <div className="px-4 -mt-6">
          <div className="grid grid-cols-4 gap-3">
            <MiniStat
              label="Total Completed"
              value={data.myWork.completed}
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              color="bg-emerald-50"
            />
            <MiniStat
              label="Today's completed"
              value={data.today.myActive}
              icon={<Calendar className="w-4 h-4 text-blue-600" />}
              color="bg-blue-50"
            />
            <MiniStat
              label="Total Pending"
              value={data.tomorrow.myAssigned}
              icon={<Clock className="w-4 h-4 text-purple-600" />}
              color="bg-purple-50"
            />
            <MiniStat
              label="Total Cancelled"
              value={data.tomorrow.myAssigned}
              icon={<Clock className="w-4 h-4 text-purple-600" />}
              color="bg-purple-50"
            />
          </div>
        </div>

        {/* 2. Content Area */}
        <main className="flex-1 overflow-y-auto p- sm:p- pb-20 lg:pb-6">
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

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  gradient,
  iconBg,
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-4 ${gradient} shadow-sm`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-white/80 uppercase tracking-wider">
          {label}
        </p>
        <h3 className="text-3xl font-black text-white mt-1">{value}</h3>
      </div>
      <div className={`p-2.5 rounded-xl ${iconBg}`}>{icon}</div>
    </div>
    {/* Decorative circles */}
    <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
    <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/5" />
  </div>
);
