// StudentSummaryGrid.tsx
import { User, GraduationCap, Percent } from "lucide-react";
import StatCard from "../StatCard";

export default function StudentSummaryGrid({
  student,
  attendance,
}: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Student Name" value={student.user?.name} icon={<User />} />
      <StatCard
        title="Class"
        value={`${student.class?.name ?? ""}-${student.class?.section ?? ""}`}
        icon={<GraduationCap size={17}/>}
      />
      <StatCard
        title="Attendance"
        value={attendance?.percent ?? 0}
        icon={<Percent size={17}/>}
      />
      <StatCard
        title="Academic %"
        value={Math.round(student.academicPercent ?? 0)}
        icon={<Percent size={17}/>}
      />
    </div>
  );
}
