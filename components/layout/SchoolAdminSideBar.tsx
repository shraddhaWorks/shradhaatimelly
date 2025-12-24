"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { MAIN_COLOR } from "@/constants/colors";
import { SidebarItem } from "@/constants/schooladmin/sidebar";

export default function SchoolAdminSideBar({
  menuItems,
  onClose, // used for mobile drawer
}: {
  menuItems: SidebarItem[];
  onClose?: () => void;
}) {
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
      onClose?.(); // close drawer on mobile
    }
  };

  return (
    <aside className="w-64 bg-white h-full px-3 py-4">
      {menuItems.map((item) => {
        const isActive = item.tab === activeTab;
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl
              text-sm font-medium transition
              ${
                isActive
                  ? "text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100"
              }
            `}
            style={isActive ? { backgroundColor: MAIN_COLOR } : undefined}
          >
            <Icon
              className={`text-lg ${
                isActive ? "text-white" : "text-gray-400"
              }`}
            />
            <span>{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
