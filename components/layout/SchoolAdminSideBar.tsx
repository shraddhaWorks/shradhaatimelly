"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SidebarItem } from "@/constants/schooladmin/sidebar";
import BrandLogo from "../ui/common/BrandLogo";
import { MineSchool } from "@/interfaces/schooladmin";

const ANIMATE_BG = "#BFE6B0"; // falling color
const FINAL_BG = "#D6F0C8";   // settled color
const ACTIVE_TEXT = "#43b771";

type School = {
  id: string;
  name?: string;
  icon?: string | null;
};
type SidebarProps = {
  school?: MineSchool;
  menuItems: SidebarItem[];
  onClose?: () => void;

  /** NEW */
  profile?: {
    name: string;
    subtitle?: string;
    avatarUrl?: string | null;
    initials?: string;
  };

  roleLabel?: string; // "Parent", "Student", "School Admin"
};


export default function SchoolAdminSideBar({
  school,
  menuItems,
  onClose,
  profile,
  roleLabel = "School Admin",
}: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "dashboard";


  const handleClick = async (item: SidebarItem) => {
    if (item.action === "logout") {
      await signOut({ callbackUrl: "/" });
      return;
    }

    if (item.href) {
      router.push(item.href);
      onClose?.();
    }
  };
  const schoolName = school?.name ?? "School";

  return (
    <aside className="relative w-64 bg-white h-full flex flex-col border-r border-gray-300">
      {/* TOP BRAND */}
      <div className="px-4 py-5 flex items-center gap-3 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-[#43b771] flex items-center justify-center overflow-hidden">
          {school?.icon ? (
            <img src={school.icon} className="w-full h-full object-contain" />
          ) : (
            <span className="text-white font-bold">
              {school?.name?.[0] ?? "S"}
            </span>
          )}
        </div>

        <div>
          <p className="font-semibold text-sm text-gray-900">{schoolName}</p>
          <p className="text-xs text-gray-500">Management System</p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = item.tab === activeTab;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.label}
              onClick={() => handleClick(item)}
              whileHover={{ x: 4, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-full mb-2 overflow-hidden rounded-xl"
            >
              {/* FINAL SETTLED COLOR */}
              {isActive && (
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: FINAL_BG }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                />
              )}

              {/* FALLING COLOR (TOP → BOTTOM) */}
              {isActive && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: ANIMATE_BG,
                    transformOrigin: "top",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                />
              )}

              {/* CONTENT */}
              <div
                className={`relative z-10 flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${isActive
                    ? "shadow-md"
                    : "text-gray-500 hover:bg-gray-100"
                  }`}
              >
                <Icon
                  className="text-lg"
                  style={{
                    color: isActive ? ACTIVE_TEXT : "#9ca3af",
                  }}
                />
                <span
                  style={{
                    color: isActive ? ACTIVE_TEXT : "#6b7280",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* BOTTOM PROFILE */}
      {profile && (
        <div className="px-4 py-4 border-t border-gray-300 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#43b771] text-white flex items-center justify-center text-sm font-semibold overflow-hidden">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} className="w-full h-full object-cover" />
            ) : (
              profile.initials ?? "U"
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">{profile.name}</p>
            <p className="text-xs text-gray-500">{roleLabel}</p>
          </div>
        </div>
      )}


      {/* BRAND LOGO */}
      <div className="border-t border-gray-100 h-14 flex items-center px-4">
        <div className="-ml-8 scale-[0.9]">
          <BrandLogo isbrandLogoWhite={false} />
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 -right-6 h-full w-6 bg-gradient-to-r from-gray-300/40 to-transparent" />
    </aside>
  );
}
