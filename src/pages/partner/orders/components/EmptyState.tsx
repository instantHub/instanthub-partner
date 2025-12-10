import { TFilterTab } from "@features/api/orders/types";
import { Inbox } from "lucide-react";

export const EmptyState: React.FC<{ filter: TFilterTab }> = ({ filter }) => {
  const messages = {
    all: "No orders available in your area",
    today: "No orders scheduled for today",
    tomorrow: "No orders scheduled for tomorrow",
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Inbox className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">No Orders Found</h3>
      <p className="text-sm text-gray-500 text-center">{messages[filter]}</p>
    </div>
  );
};
