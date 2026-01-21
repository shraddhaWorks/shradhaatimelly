"use client";

import { MAIN_COLOR } from "@/constants/colors";
import AnimatedCard from "../common/AnimatedCard";

export default function StudentSearchCard({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (v: string) => void;
  onSearch: (admissionNo: string) => void;
}) {
  return (
    <AnimatedCard>
      <h2 className="font-semibold text-lg">Student Details</h2>
      <p className="text-sm text-gray-500 mb-4">
        Search and view complete student information
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(value);
          }}
          placeholder="Enter Admission Number"
          className="
            flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm
            focus:ring-2 focus:ring-gray-500 outline-none
          "
        />

        <button
          onClick={() => onSearch(value)}
          style={{backgroundColor:`${MAIN_COLOR}`}}
          className="
            text-white px-6 py-2 rounded-lg
            text-sm font-medium hover:bg-green-700
            transition
          "
        >
          Search
        </button>
      </div>
    </AnimatedCard>
  );
}
