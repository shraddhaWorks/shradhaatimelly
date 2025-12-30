"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, GraduationCap, ClipboardList, Users,
  Newspaper, MessageSquare, CalendarDays, Menu, X
} from "lucide-react";

// Component imports (Assuming these are correct in your structure)
import RequireRole from "./RequireRole";
import MarksEntryPage from "./MarksEntry";
import MarkAttendancePage from "./AtendMark";
import HomeworkPage from "./Homework";
import NewsFeedPage from "./NewsFeed";
import CommunicationPage from "@/app/communication/page";
import TeacherLeavesPage from "./teacherLeave";
import TeacherDashboard from "./teacherDashboard";

const actions = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "homework", label: "Homework", icon: GraduationCap }, 
  { id: "marks-entry", label: "Marks", icon: ClipboardList },
  { id: "attendance-mark", label: "Attendance", icon: Users },
  { id: "newsfeed", label: "Newsfeed", icon: Newspaper },
  { id: "communication", label: "Parents Chat", icon: MessageSquare },
  { id: "leaves", label: "Leave", icon: CalendarDays },
];

export default function TeachersPage() {
  const { data: session, status } = useSession();
  const [active, setActive] = useState(actions[0]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Safely extract session data
  const userName = session?.user?.name || "User";
  const userSubject = (session?.user as any)?.subjectsTaught;
  const userRoleDisplay = userSubject ? `${userSubject} Teacher` : "Teacher";

  // DYNAMIC SCHOOL DATA
  const schoolIcon = (session?.user as any)?.icon || ""; 
  const schoolName = (session?.user as any)?.schoolName || "My School";

  const renderContent = (id: string) => {
    switch (id) {
      case "dashboard": return <RequireRole allowedRoles={["TEACHER"]}><TeacherDashboard /></RequireRole>;
      case "homework": return <RequireRole allowedRoles={["TEACHER"]}><HomeworkPage /></RequireRole>;
      case "marks-entry": return <RequireRole allowedRoles={["TEACHER"]}><MarksEntryPage /></RequireRole>;
      case "attendance-mark": return <RequireRole allowedRoles={["TEACHER"]}><MarkAttendancePage /></RequireRole>;
      case "newsfeed": return <RequireRole allowedRoles={["TEACHER"]}><NewsFeedPage /></RequireRole>;
      case "communication": return <RequireRole allowedRoles={["TEACHER"]}><CommunicationPage /></RequireRole>;
      case "leaves": return <RequireRole allowedRoles={["TEACHER"]}><TeacherLeavesPage /></RequireRole>;
      default: return <div className="p-20 text-gray-400">🚧 Feature under development</div>;
    }
  };

  const Sidebar = ({ mobile = false }) => (
    <aside className={`${mobile ? "w-72" : "hidden md:flex w-72"} flex-col bg-white border-r border-gray-100 h-screen sticky top-0 z-50`}>
      {/* 1. TOP LOGO AND SCHOOL NAME */}
      <div className="p-8 flex items-center gap-4">
        <div className="h-12 w-12 bg-[#33b663] rounded-2xl flex items-center justify-center shadow-md overflow-hidden p-2 transition-transform hover:rotate-3 shrink-0">
          {schoolIcon ? (
            <img src={schoolIcon} alt="School" className="h-full w-full object-contain brightness-0 invert" />
          ) : (
            <GraduationCap className="text-white" size={26} />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-bold text-gray-800 leading-tight truncate">{schoolName}</h1>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Teacher Portal</span>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="flex-1 px-5 space-y-2">
        {actions.map((item) => {
          const Icon = item.icon;
          const isActive = active.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActive(item); setMobileOpen(false); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive ? "bg-[#e9f7f0] text-[#33b663] font-bold shadow-sm" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Icon size={22} className={isActive ? "text-[#33b663]" : "text-gray-400"} />
              <span className="text-[15px]">{item.label}</span>
              {isActive && <motion.div layoutId="indicator" className="ml-auto w-1.5 h-6 bg-[#33b663] rounded-full" />}
            </button>
          );
        })}
      </nav>

      {/* 3. PROFILE SECTION */}
      <div className="mt-auto pb-4 px-5">
        <div className="py-6 border-t border-gray-50">
          <div className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50">
            <div className="h-12 w-12 rounded-full bg-[#33b663] text-white flex items-center justify-center text-lg font-black shrink-0">
              {userName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-[14px] font-extrabold text-gray-900 truncate">{userName}</p>
              <p className="text-[12px] text-gray-400 font-medium truncate capitalize">{userRoleDisplay.toLowerCase()}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 opacity-50">
          <div className="h-7 w-7 bg-[#33b663] rounded-full flex items-center justify-center text-white text-[10px] font-black italic">T</div>
          <span className="text-lg font-black text-gray-900 tracking-tighter">timelly</span>
        </div>
      </div>
    </aside>
  );

  if (status === "loading") return <div className="h-screen flex items-center justify-center font-bold text-[#33b663]">Loading Dashboard...</div>;

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <Sidebar />

      {/* NAVBAR WITH DYNAMIC NAME & ICON */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => setMobileOpen(true)} className="p-2 text-gray-600">
            <Menu size={26} />
          </button>
          
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 bg-[#33b663] rounded-lg flex items-center justify-center p-1 shrink-0">
              {schoolIcon ? (
                <img src={schoolIcon} alt="School" className="h-full w-full object-contain brightness-0 invert" />
              ) : (
                <GraduationCap className="text-white" size={16} />
              )}
            </div>
            <h2 className="text-sm font-bold text-gray-800 truncate leading-none">
              {schoolName}
            </h2>
          </div>
        </div>
        <span className="bg-[#e9f7f0] text-[#33b663] px-3 py-1 rounded-full text-[10px] font-black uppercase">
          {active.label}
        </span>
      </header>

      <main className="flex-1 overflow-x-hidden pt-16 md:pt-0 bg-[#F8FAFB]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full w-full bg-white"
          >
            {renderContent(active.id)}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-40" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} className="fixed inset-y-0 left-0 z-50 shadow-2xl">
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}