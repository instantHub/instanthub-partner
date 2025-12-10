import { TFilterTab } from "@features/api/orders/types";

interface TFilterTabsProps {
  activeTab: TFilterTab;
  onTabChange: (tab: TFilterTab) => void;
  counts: { all: number; today: number; tomorrow: number };
}

export const FilterTabs: React.FC<TFilterTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: { id: TFilterTab; label: string; count: number }[] = [
    { id: "all", label: "All Available", count: counts.all },
    { id: "today", label: "Today", count: counts.today },
    { id: "tomorrow", label: "Tomorrow", count: counts.tomorrow },
  ];

  return (
    <div className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm pt-4 pb-3 -mx-4 px-4">
      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 relative py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-md"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="block">{tab.label}</span>
            <span
              className={`text-xs font-bold mt-0.5 block ${
                activeTab === tab.id ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              {tab.count} orders
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
