import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-sm text-gray-500 font-medium">
          Loading dashboard...
        </p>
      </div>
    </div>
  );
};
