import { XCircle } from "lucide-react";

export const ErrorState = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="font-bold text-gray-900">Failed to load data</h3>
        <p className="text-sm text-gray-500">Please try again later</p>
      </div>
    </div>
  );
};
