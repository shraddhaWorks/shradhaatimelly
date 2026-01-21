"use client";

import { MAIN_COLOR } from "@/constants/colors";
import { IMenuItem } from "@/interfaces/dashboard";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Sidebar({ menuItems }: { menuItems: IMenuItem[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  const handleClick = async (item: IMenuItem) => {
    if (item.action === "logout") {
      await signOut({ callbackUrl: "/" });
      return;
    }

    if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <aside className="w-64 bg-white px-3 py-4">
      {menuItems.map((item) => {
        const isActive = item.tab === activeTab;
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className={`
              relative overflow-hidden
              w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl
              text-sm font-medium transition-colors duration-200
              ${
                isActive
                  ? "text-white bg-green-100"
                  : "text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            {/* Falling Fill Animation */}
            {isActive && (
              <span
                className="absolute inset-0 z-0 animate-fill-down"
                style={{ backgroundColor: MAIN_COLOR }}
              />
            )}

            {/* Content */}
            <span className="relative z-10 flex items-center gap-3">
              <Icon
                className={`text-lg ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              />
              <span>{item.label}</span>
            </span>
          </button>
        );
      })}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fillDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0%);
          }
        }

        .animate-fill-down {
          animation: fillDown 0.35s ease-out forwards;
        }
      `}</style>
    </aside>
  );
}
