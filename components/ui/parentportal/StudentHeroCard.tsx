"use client";
import { motion } from "framer-motion";

export default function StudentHeroCard({ student }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-gradient-to-br from-green-100 to-green-200 p-6 md:p-10 shadow"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">
          {student.user.name?.[0]}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{student.user.name}</h1>
          <p className="text-gray-600">
            Grade {student.class?.name}-{student.class?.section}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-6">
            <Stat label="Attendance" value="92%" />
            <Stat label="Percentage" value="88%" />
            <Stat label="Workshops" value="12" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs uppercase text-gray-600">{label}</p>
    </div>
  );
}
