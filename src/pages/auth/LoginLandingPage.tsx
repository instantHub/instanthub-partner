import { useState } from "react";
import { AVAILABLE_ROLE, TAvailableRole } from "@utils/constants";
import {
  ArrowLeft,
  ChevronRight,
  IdCard,
  PersonStanding,
  ShieldCheck,
} from "lucide-react";
import { LoginPage } from "./LoginPage";

export type TLoginView = "selection" | TAvailableRole;

export const LoginLandingPage = () => {
  const [currentView, setCurrentView] = useState<TLoginView>("selection");

  const renderSelectionView = () => (
    <div className="w-full max-w-4xl px-4 animate-fade-in-up">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-6">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Welcome Back
        </h1>
        <p className="text-lg text-gray-500 max-w-lg mx-auto">
          Please select your role to access the secure workspace.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Partner Card */}
        <button
          onClick={() => setCurrentView(AVAILABLE_ROLE.PARTNER)}
          className="group relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-md border-2 border-transparent hover:border-indigo-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left"
        >
          <div className="h-24 w-24 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
            <IdCard size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Login as Partner
          </h3>
          <p className="text-gray-500 text-sm text-center mb-6 px-4">
            Access business analytics, revenue reports, and management tools.
          </p>
          <div className="mt-auto flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Continue <ChevronRight size={16} className="ml-1" />
          </div>
        </button>

        {/* Executive Card */}
        <button
          onClick={() => setCurrentView(AVAILABLE_ROLE.EXECUTIVE)}
          className="group relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-md border-2 border-transparent hover:border-emerald-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left"
        >
          <div className="h-24 w-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300">
            <PersonStanding size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Partner Executive
          </h3>
          <p className="text-gray-500 text-sm text-center mb-6 px-4">
            Manage field operations, check-ins, and daily executive tasks.
          </p>
          <div className="mt-auto flex items-center text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Continue <ChevronRight size={16} className="ml-1" />
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen py-10 lg;py-0 bg-gray-50 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-100/50 blur-3xl" />
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-emerald-50/50 blur-3xl" />
      </div>

      {/* Back Navigation */}
      {currentView !== "selection" && (
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={() => setCurrentView("selection")}
            className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-gray-600 hover:text-gray-900 hover:shadow-md transition-all"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Change Role</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="w-full z-10 flex flex-col items-center justify-center p-4">
        {currentView === "selection" ? (
          renderSelectionView()
        ) : (
          <LoginPage role={currentView} />
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center z-10">
        <p className="text-xs text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} Instant Hub. Secure Environment.
        </p>
      </footer>
    </div>
  );
};
