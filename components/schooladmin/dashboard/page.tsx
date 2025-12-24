"use client";

export default function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here's an overview of your school
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Classes" value="12" />
        <StatCard title="Total Students" value="456" />
        <StatCard title="Total Teachers" value="32" />
        <StatCard title="Upcoming Workshops" value="5" />
        <StatCard title="Fees Collected (This Year)" value="₹42.5L" />
      </div>

      {/* Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AttendanceCard
          title="Student Attendance"
          percent={83}
          meta="Present: 378 | Absent: 78"
        />
        <AttendanceCard
          title="Teacher Leave"
          percent={13}
          meta="On Leave: 4 | Present: 28"
        />
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WorkshopsCard />
        <NewsCard />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl p-4 bg-white shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
    </div>
  );
}
function AttendanceCard({
  title,
  percent,
  meta,
}: {
  title: string;
  percent: number;
  meta: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-6">
      <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center">
        <span className="font-semibold">{percent}%</span>
      </div>

      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{meta}</p>
      </div>
    </div>
  );
}
function WorkshopsCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-medium mb-3">Upcoming Workshops</h3>

      <div className="border rounded-lg p-3">
        <p className="font-medium">Hackathon 2024</p>
        <p className="text-sm text-gray-500">
          March 15, 2024 • Class 10
        </p>
      </div>
    </div>
  );
}

function NewsCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-medium mb-3">Latest News</h3>

      <div className="border rounded-lg p-3">
        <p className="font-medium">
          Annual Sports Day 2024 - A Grand Success!
        </p>
        <p className="text-sm text-gray-500">2 days ago</p>
      </div>
    </div>
  );
}
