"use client";

import { FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { SidebarItem } from "@/constants/schooladmin/sidebar";

export default function MobileRadialMenu({
  menuItems,
  onClose,
}: {
  menuItems: SidebarItem[];
  onClose: () => void;
}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center pb-28">
      <div className="relative grid grid-cols-3 gap-6 p-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl">

        {menuItems
          .filter(
            (item) =>
              item.tab &&          // must navigate
              item.href &&         // must have link
              item.action !== "logout"
          )
          .slice(0, 6)              // keep radial clean
          .map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.tab}
                onClick={() => {
                  router.push(item.href!);
                  onClose();
                }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <span className="text-xs text-center">{item.label}</span>
              </button>
            );
          })}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 right-4 bg-white rounded-full p-2 shadow"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}
