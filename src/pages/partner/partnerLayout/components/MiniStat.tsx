interface MiniStatProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export const MiniStat: React.FC<MiniStatProps> = ({
  label,
  value,
  icon,
  color,
}) => (
  <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
    <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
    </div>
  </div>
);
