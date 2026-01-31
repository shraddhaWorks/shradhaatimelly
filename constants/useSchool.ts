"use client";

import { useEffect, useState } from "react";
import { MineSchool } from "@/interfaces/schooladmin";

export function useSchool() {
  const [school, setSchool] = useState<MineSchool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch("/api/school/mine", {
          credentials: "include",
        });
        const data = await res.json();

        if (data?.school) {
          setSchool(data.school);
        }
      } catch (err) {
        console.error("Failed to fetch school", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, []);

  return {
    school,
    schoolName: school?.name ?? "School",
    loading,
  };
}
