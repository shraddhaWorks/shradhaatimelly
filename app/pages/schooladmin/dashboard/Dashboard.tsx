"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import SchoolAdminSideBar from "@/components/layout/SchoolAdminSideBar";
import { SCHOOLADMIN_MENU_ITEMS } from "@/constants/schooladmin/sidebar";

import DashboardTab from "@/components/schooladmin/dashboard/Dashboard";
import TeachersPage from "@/components/schooladmin/teachers/Teachers";
import StudentsManagementPage from "@/components/schooladmin/studentsManagement/StudentManagement";
import TeacherLeavesPage from "@/components/schooladmin/teachersleaves/TeacherLeaves";
import FeePaymentsPage from "@/components/schooladmin/schoolpayments/SchoolPayements";
import SchoolAdminClassesPage from "@/components/schooladmin/classes/Classes";
import WorkshopsPage from "@/components/schooladmin/workshops/WorkShops";
import AnalysisClient from "@/components/schooladmin/analysis/Analysis";
import NewsfeedPage from "@/components/schooladmin/newsfeed/Newsfeed";
import StudentDetails from "@/components/schooladmin/studentDetails/StudentDetails";

import MobileTopBar from "@/components/ui/parentportal/MobileTopBar";
import MobileBottomNav from "@/components/ui/parentportal/MobileBottomBar";
import MobileRadialMenu from "@/components/ui/parentportal/MobileRadialMenu";

import { useDashboardData } from "@/hooks/useSchoolAdminDashboard";

export default function SchoolAdminLayout() {
  const tab = useSearchParams().get("tab") ?? "dashboard";
  const [radialOpen, setRadialOpen] = useState(false);

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
        return <SchoolAdminClassesPage teachers={teachers} loadingTeachers={loading} reload={reloadClasses} />;
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
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">

      {/* ===== SIDEBAR (Tablet & Desktop) ===== */}
      <aside className="hidden md:block">
        <SchoolAdminSideBar menuItems={SCHOOLADMIN_MENU_ITEMS} />
      </aside>

      {/* ===== MAIN ===== */}
      <div className="flex-1 flex flex-col relative">

        {/* MOBILE TOP BAR */}
        <div className="md:hidden">
          <MobileTopBar />
        </div>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
          {renderPage()}
        </main>

        {/* MOBILE BOTTOM NAV */}
        <div className="md:hidden">
          <MobileBottomNav onMore={() => setRadialOpen(true)} />
        </div>

        {/* RADIAL MENU */}
        {radialOpen && (
          <MobileRadialMenu
            menuItems={SCHOOLADMIN_MENU_ITEMS}
            onClose={() => setRadialOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
