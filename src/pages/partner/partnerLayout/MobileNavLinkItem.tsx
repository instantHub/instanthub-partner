import { NavLink } from "react-router-dom";

export const MobileNavLinkItem: React.FC<{
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
