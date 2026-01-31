"use client";

type StudentStat = {
  label: string;
  value: number;
  percent: string;
  color: string;
};

type TeacherLeave = {
  name: string;
  subject: string;
  leaveType: string;
  days: string;
  status: "Approved" | "Pending";
};

export default function SchoolAdminAttendanceCard({
  variant,
}: {
  variant: "students" | "teachers";
}) {
  /* ---------- HARD CODED DATA (AS REQUESTED) ---------- */

  const studentStats: StudentStat[] = [
    { label: "Present", value: 1654, percent: "89.5%", color: "text-lime-400" },
    { label: "Absent", value: 142, percent: "7.7%", color: "text-rose-400" },
    { label: "Late", value: 51, percent: "2.8%", color: "text-yellow-400" },
    { label: "Total", value: 1847, percent: "100%", color: "text-white" },
  ];

  const teachers: TeacherLeave[] = [
    {
      name: "Mrs. Priya Sharma",
      subject: "Mathematics",
      leaveType: "Sick Leave",
      days: "2 days",
      status: "Approved",
    },
    {
      name: "Mr. Rajesh Kumar",
      subject: "Physics",
      leaveType: "Casual Leave",
      days: "1 day",
      status: "Pending",
    },
    {
      name: "Mrs. Anita Desai",
      subject: "English",
      leaveType: "Personal Leave",
      days: "3 days",
      status: "Approved",
    },
  ];

  /* ---------- STUDENTS CARD ---------- */
  if (variant === "students") {
    return (
      <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 text-white">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Students Attendance Overview
          </h2>
          <p className="text-sm text-white/60">
            Today's attendance summary
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {studentStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 bg-white/10 border border-white/10"
            >
              <p className="text-sm text-white/60">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value.toLocaleString()}
              </p>
              <p className="text-xs mt-1 text-white/60">
                {stat.percent}
              </p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="rounded-xl p-4 bg-white/10 border border-white/10">
          <div className="flex justify-between mb-2">
            <p className="text-sm text-white/70">
              Overall Attendance Rate
            </p>
            <p className="text-sm font-semibold text-lime-400">
              89.5%
            </p>
          </div>

          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-lime-400 rounded-full w-[89.5%]" />
          </div>

          <p className="text-xs text-lime-400 mt-2">
            ↗ +2.3% from last week
          </p>
        </div>
      </div>
    );
  }

  /* ---------- TEACHERS CARD ---------- */
  return (
    <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Teachers on Leave</h2>
          <p className="text-sm text-white/60">
            Current leave requests
          </p>
        </div>

        <button className="text-sm text-lime-400 hover:underline">
          View All
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {teachers.map((t) => (
          <div
            key={t.name}
            className="flex justify-between items-center p-4 rounded-xl bg-white/10 border border-white/10"
          >
            <div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-white/60">{t.subject}</p>
              <p className="text-xs text-white/40">{t.leaveType}</p>
            </div>

            <div className="text-right">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  t.status === "Approved"
                    ? "bg-lime-400/20 text-lime-400"
                    : "bg-yellow-400/20 text-yellow-400"
                }`}
              >
                {t.status}
              </span>
              <p className="text-xs text-white/40 mt-1">
                {t.days}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
