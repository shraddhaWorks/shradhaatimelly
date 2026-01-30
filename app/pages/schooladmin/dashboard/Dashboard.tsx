"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";

import SchoolAdminSideBar from "@/components/layout/SchoolAdminSideBar";
import { SCHOOLADMIN_MENU_ITEMS } from "@/constants/schooladmin/sidebar";
import DashboardTab from "@/components/schooladmin/dashboard/Dashboard";
import { useDashboardData } from "@/hooks/useSchoolAdminDashboard";
import TeachersPage from "@/components/schooladmin/teachers/Teachers";
import StudentsManagementPage from "@/components/schooladmin/studentsManagement/StudentManagement";
import TeacherLeavesPage from "@/components/schooladmin/teachersleaves/TeacherLeaves";
import FeePaymentsPage from "@/components/schooladmin/schoolpayments/SchoolPayements";
import SchoolAdminClassesPage from "@/components/schooladmin/classes/Classes";
import WorkshopsPage from "@/components/schooladmin/workshops/WorkShops";
import AnalysisClient from "@/components/schooladmin/analysis/Analysis";
import NewsfeedPage from "@/components/schooladmin/newsfeed/Newsfeed";
import StudentDetails from "@/components/schooladmin/studentDetails/StudentDetails";
import ExamsPage from "@/components/schooladmin/exams/exams";
import { MineSchool } from "@/interfaces/schooladmin";

export default function SchoolAdminLayout() {
  const [open, setOpen] = useState(false);
  const tab = useSearchParams().get("tab") ?? "dashboard";

  const {
    loading,
    stats,
    attendance,
    students,
    teacherLeaves,
    teacherPendingLeaves,
    classes,
    error,
    events,
    news,
    teachers,
    tcRequestsAll,
    tcRequestsPending,
    feeDetails,
    feeStats,
    schoolMine,
    reloadDashboard,
    reloadClasses,
    reloadStudents,
    reloadTeachers,
    reloadLeaves,
    reloadTCRequests,
  } = useDashboardData();

  const renderPage = () => {
    switch (tab) {
      case "students":
        return <StudentsManagementPage classes={classes} reload={reloadStudents} />;
      case "classes":
        return (
          <SchoolAdminClassesPage
            teachers={teachers}
            loadingTeachers={loading}
            reload={reloadClasses}
          />
        );
      case "teachers":
        return <TeachersPage teachers={teachers} reload={reloadTeachers} loading={loading} />;
      case "teacher-leaves":
        return (
          <TeacherLeavesPage
            allLeaves={teacherLeaves}
            pending={teacherPendingLeaves}
            loading={loading}
            reload={reloadLeaves}
          />
        );
      case "tc-approvals":
        return (
          <TeacherLeavesPage
            allLeaves={tcRequestsAll}
            pending={tcRequestsPending}
            loading={loading}
            reload={reloadTCRequests}
            isTCApprovalsPage
          />
        );
      case "payments":
        return <FeePaymentsPage classes={classes} fees={feeDetails} stats={feeStats} />;
      case "workshops":
        return <WorkshopsPage workshops={events} loading={loading} reload={reloadDashboard} />;
      case "newsfeed":
        return <NewsfeedPage />;
      case "exams":
        return <ExamsPage />;
      case "analysis":
        return <AnalysisClient />;
      case "student-details":
        return <StudentDetails />;
      default:
        return (
          <DashboardTab
            loading={loading}
            stats={stats}
            attendance={attendance}
            workshops={events}
            news={news}
            reload={reloadDashboard}
            error={error}
          />
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="hidden md:block">
        <div className="h-full bg-white/5 backdrop-blur-2xl border-r border-white/10 shadow-xl">
          <SchoolAdminSideBar school={schoolMine} menuItems={SCHOOLADMIN_MENU_ITEMS} />
        </div>
      </aside>

      {/* ========== MOBILE SIDEBAR ========== */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-xl">
            <SchoolAdminSideBar
              school={schoolMine as MineSchool}
              menuItems={SCHOOLADMIN_MENU_ITEMS}
              onClose={() => setOpen(false)}
            />
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center gap-3 p-4 bg-white/10 backdrop-blur-xl border-b border-white/20">
          <button onClick={() => setOpen(true)}>
            <Menu className="text-white" />
          </button>
          <h1 className="font-semibold text-white">Admin Panel</h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white/5 backdrop-blur-xl border-t border-l border-white/10 rounded-tl-2xl">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
