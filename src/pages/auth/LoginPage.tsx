import { FormEvent, useState } from "react";
import { IdCard, PersonStanding, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AVAILABLE_ROLE, TAvailableRole } from "@utils/constants";
import { FormInput } from "@components/general";

interface LoginPageProps {
  role: TAvailableRole;
}

export const LoginPage = ({ role }: LoginPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const isPartner = role === AVAILABLE_ROLE.PARTNER;

  // Dynamic theme based on role
  const theme = isPartner
    ? "text-indigo-600 focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700"
    : "text-emerald-600 focus:ring-emerald-500 bg-emerald-600 hover:bg-emerald-700";

  const ringTheme = isPartner
    ? "focus:ring-indigo-500"
    : "focus:ring-emerald-500";
  const bgSoft = isPartner ? "bg-indigo-50" : "bg-emerald-50";
  const iconColor = isPartner ? "text-indigo-500" : "text-emerald-500";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in as ${role}`, formData);
    // Add your login logic here
  };

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className={`px-8 py-10 text-center ${bgSoft}`}>
          <div
            className={`mx-auto w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 ${iconColor}`}
          ></div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {isPartner ? "Partner Portal" : "Executive Access"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter your credentials to access the dashboard.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <FormInput
              label="Email Address"
              startIcon={
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
              }
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <FormInput
              label="Password"
              startIcon={
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
              }
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${theme}`}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
