"use client";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import DashboardPage from "@/components/superadmin/dashboard/page";
import { SUPERADMIN_SIDEBAR_ITEMS } from "@/constants/superadmin/sidebar";
import {  useEffect, useState } from "react";

export default function SuperAdminLayout() {
    const [stats, setStats] = useState({
        totalSchools: 0,
        totalStudents: 0, 
      });
      const [schools, setSchools] = useState([]);
      const [transactions, setTransactions] = useState([]);
    
      useEffect(() => {
        fetch("/api/superadmin/dashboard")
          .then((r) => r.json())
          .then((r) => setStats(r.data));
    
        fetch("/api/superadmin/schools?limit=4")
          .then((r) => r.json())
          .then((r) => setSchools(r.data));
    
        fetch("/api/superadmin/transactions")
          .then((r) => r.json())
          .then((r) => setTransactions(r.data.slice(0, 8)));
      }, []);
  return (
  <div className="h-screen flex flex-col">
  <TopNavbar />
  <div className="flex flex-1 overflow-hidden">
    <Sidebar menuItems={SUPERADMIN_SIDEBAR_ITEMS} />
    <main className="flex-1 overflow-y-auto p-4">
      <DashboardPage
        stats={stats}
        schools={schools}
        transactions={transactions}
      />
    </main>
  </div>
</div>

  );
}
