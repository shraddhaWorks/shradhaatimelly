import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  bg: string;
  iconBg: string;
  index?: number;
}

export default function SchoolAdminStatCard({
  title,
  value,
  icon,
  bg,
  iconBg,
  index = 0,
}: Props) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl 
        p-6 min-h-[160px]
        ${bg}
        shadow-sm hover:shadow-lg
        transition-all duration-300
        hover:-translate-y-1
        animate-fade-in
      `}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* op-right trending icon (GREEN, no background) */}
      <div className="absolute top-4 right-4">
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>

      {/* 🌫️ Large faded background icon */}
      <div className="absolute -bottom-6 -right-6 text-gray-300 opacity-30 pointer-events-none text-[90px]">
        {icon}
      </div>

      {/* Content */}
      <h2 className="text-2xl font-bold mt-4 text-gray-900">{value}</h2>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
    </div>
  );
}
