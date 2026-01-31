"use client";

import SchoolAdminAttendanceCard from "@/components/ui/SchoolAdminAttendanceCard";
import SchoolAdminNewsFeedCard from "@/components/ui/SchoolAdminNewsFeedCard";
import SchoolAdminWorkshopCard from "@/components/ui/SchoolAdminWorkshopCard";
import SchoolAdminStatCard from "@/components/ui/SchoolAdminStatCard";
import { useSchool } from "@/constants/useSchool";
import {
  BookOpen,
  Users,
  GraduationCap,
  CalendarDays,
  IndianRupee,
} from "lucide-react";

interface DashboardTabProps {
  loading: boolean;
  stats: any;
  attendance: any;
  workshops: any;
  news: any;
  reload: any;
  error: any;
}

export default function DashboardTab({
  loading,
  stats,
  attendance,
  workshops,
  news,
  error,
  reload,
}: DashboardTabProps) {

  // ✅ Hook MUST be here
  const { schoolName } = useSchool();

  if (loading) {
    return <p className="text-gray-400 text-center">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">

      {/* Error */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg mb-4">
          <p className="font-medium">{error.message}</p>
          <p className="text-sm">Failed: {error.failedApis.join(", ")}</p>
          <button onClick={reload} className="mt-2 text-sm underline">
            Retry
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here's an overview of your school
        </p>
      </div>

      {/* Welcome Card */}
      <div
        className="
          rounded-2xl p-6 mb-6
          bg-white/5
          backdrop-blur-2xl
          border border-white/10
          text-white
        "
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Welcome back, {schoolName}! 👋
        </h1>

        <p className="mt-1 text-white/70">
          Here's what's happening in your school today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <SchoolAdminStatCard
          icon={<BookOpen size={22} />}
          title="Total Classes"
          value={stats.totalClasses}
          subtitle="+3 this month"
          index={0}
        />

        <SchoolAdminStatCard
          icon={<Users size={22} />}
          title="Total Students"
          value={stats.totalStudents}
          subtitle="+52 this month"
          index={1}
        />

        <SchoolAdminStatCard
          icon={<GraduationCap size={22} />}
          title="Total Teachers"
          value={stats.totalTeachers}
          subtitle="+5 this month"
          index={2}
        />

        <SchoolAdminStatCard
          icon={<CalendarDays size={22} />}
          title="Upcoming Workshops"
          value={stats.upcomingWorkshops}
          subtitle="3 this week"
          index={3}
        />

        <SchoolAdminStatCard
          icon={<IndianRupee size={22} />}
          title="Fees Collected"
          value={`₹${(stats.feesCollected / 100000).toFixed(1)}L`}
          subtitle="92% collected"
          index={4}
        />
      </div>

      {/* Attendance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
  <SchoolAdminAttendanceCard variant="students" />
  <SchoolAdminAttendanceCard variant="teachers" />
</div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SchoolAdminWorkshopCard workshops={workshops} />
        <SchoolAdminNewsFeedCard news={news} />
      </div>
    </div>
  );
}
