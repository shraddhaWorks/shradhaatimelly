"use client";
import { useEffect, useState } from "react";

export default function QuickStats({ studentId }: { studentId: string }) {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/parent/dashboard/summary")
      .then(res => res.json())
      .then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card label="Attendance" value={`${stats.attendancePercent}%`} />
      <Card label="Assignments" value="8" />
      <Card label="Workshops" value={stats.workshops} />
      <Card label="Overall Grade" value="A+" />
    </div>
  );
}

function Card({ label, value }: any) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
      <p className="text-2xl font-bold text-green-600">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
