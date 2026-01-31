import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  index?: number;
}

export default function SchoolAdminStatCard({
  icon,
  title,
  value,
  subtitle,
  index = 0,
}: Props) {
  return (
    <div
      className={`
        relative rounded-2xl p-6 min-h-[150px]
        text-white overflow-hidden
        bg-white/5
        backdrop-blur-2xl
        border border-white/10
        shadow-lg
        transition-all duration-300
        hover:-translate-y-1 hover:bg-white/10
        animate-fade-in
      `}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Trending */}
      <TrendingUp className="absolute top-4 right-4 w-5 h-5 text-lime-400" />

      {/* Icon */}
      <div className="mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Title */}
      <p className="text-sm text-white/70 font-medium">
        {title}
      </p>

      {/* Value */}
      <h2 className="text-3xl font-bold mt-1">
        {value}
      </h2>

      {/* KPI */}
      {subtitle && (
        <p className="mt-2 text-sm text-lime-400 font-semibold">
          {subtitle}
        </p>
      )}
    </div>
  );
}
