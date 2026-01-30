"use client";

import ParentDetailsCard from "@/components/ui/parentportal/ParentDetailsCard";
import ProfileSkeleton from "@/components/ui/parentportal/ProfileSkeleton";
import QuickStats from "@/components/ui/parentportal/QuickStats";
import StudentHeroCard from "@/components/ui/parentportal/StudentHeroCard";
import StudentInfoCard from "@/components/ui/parentportal/StudentInfoCard";
import { MeContext } from "@/interfaces/student";

export default function StudentParentProfile({
  me,
  loading,
}: {
  me: MeContext | null;
  loading: boolean;
}) {
  if (loading) return <ProfileSkeleton />;
  if (!me?.student) return null;

  const { student } = me;

  return (
    <div className="space-y-8">
      {/* HERO CARD */}
      <StudentHeroCard student={student} />

      {/* QUICK STATS */}
      <QuickStats studentId={student.id} />

      {/* STUDENT INFO */}
      <StudentInfoCard student={student} />

      {/* PARENT DETAILS */}
      <div className="grid md:grid-cols-2 gap-6">
        <ParentDetailsCard
          title="Father's Details"
          name={student.fatherName}
          phone={student.phoneNo}
        />

        <ParentDetailsCard
          title="Mother's Details"
          name="-"
          phone="-"
        />
      </div>
    </div>
  );
}
