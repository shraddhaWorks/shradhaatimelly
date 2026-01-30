"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import SchoolAdminSideBar from "@/components/layout/SchoolAdminSideBar";
import { PARENT_MENU_ITEMS } from "@/constants/parent/sidebar";

import ParentDashboard from "@/components/parent/dashboard/Dashboard";
import ParentHomework from "@/components/parent/homework/Homework";
import ParentAttendance from "@/components/parent/attendance/Attendance";
import ParentChatShell from "@/components/parent/chats/Chat";
import FeesTab from "@/components/parent/fees/Fees";
import ParentMarks from "@/components/parent/marks/ParentMarks";
import ParentCertificates from "@/components/parent/certificates/ParentCertificates";


import { useParentDashboardData } from "@/hooks/parent/useParentDashboard";
import { MeContext, StudentFeeApiResponse } from "@/interfaces/student";
import MobileBottomNav from "@/components/ui/parentportal/MobileBottomBar";
import MobileRadialMenu from "@/components/ui/parentportal/MobileRadialMenu";
import MobileTopBar from "@/components/ui/parentportal/MobileTopBar";
import { MineSchool } from "@/interfaces/schooladmin";
import ParentStudentProfile from "@/components/parent/studentparentprofile/ParentStudentProfile ";


export default function ParentDashboardLayout() {
  const tab = useSearchParams().get("tab") ?? "profile";
  const [radialOpen, setRadialOpen] = useState(false);

  const {
    attendanceStats,
    homeworks,
    loading,
    appointments,
    teachers,
    fees,
    news,
    studentSchoolInfo,
    events,
    feesAllRes,
    schoolMine,
    reloadHomework,
    reloadAppointments,
    reloadFee,
  } = useParentDashboardData();

  const renderPage = () => {
    switch (tab) {
      case "profile":
          return (
            <ParentStudentProfile
              me={studentSchoolInfo as MeContext}
              loading={loading}
            />
          );

      case "homework":
        return <ParentHomework homeworks={homeworks} loading={loading} reloadHomework={reloadHomework} />;
      case "attendance":
        return <ParentAttendance attendanceStats={attendanceStats} />;
      case "marks":
        return <ParentMarks />;
      case "chat":
        return <ParentChatShell appointments={appointments} teachers={teachers} reloadAppointments={reloadAppointments} />;
      case "fees":
        return <FeesTab fee={fees} feesAllRes={feesAllRes as StudentFeeApiResponse} reloadFee={reloadFee} />;
      case "certificates":
        return <ParentCertificates />;
      default:
        return <ParentDashboard events={events} attendanceStats={attendanceStats} studentSchoolInfo={studentSchoolInfo as MeContext}/>;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:block">
        <SchoolAdminSideBar
  school={schoolMine as MineSchool}
  menuItems={PARENT_MENU_ITEMS}
  profile={{
    name: studentSchoolInfo?.student?.user?.name ?? "Student",
    initials: studentSchoolInfo?.student?.user?.name?.[0] ?? "S",
  }}
  roleLabel="Parent"
/>

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
        {radialOpen && <MobileRadialMenu onClose={() => setRadialOpen(false)} menuItems={PARENT_MENU_ITEMS} />}
      </div>
    </div>
  );
}
