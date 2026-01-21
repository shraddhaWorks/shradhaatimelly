"use client";

import ParentDetailsCard from "@/components/ui/parentportal/ParentDetailsCard";
import ProfileSkeleton from "@/components/ui/parentportal/ProfileSkeleton";
import QuickStats from "@/components/ui/parentportal/QuickStats";
import StudentHeroCard from "@/components/ui/parentportal/StudentHeroCard";
import StudentInfoCard from "@/components/ui/parentportal/StudentInfoCard";
import { useEffect, useState } from "react";

export default function StudentParentProfile() {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/me")
      .then(res => res.json())
      .then(data => {
        setStudent(data.student);
        setLoading(false);
      });
  }, []);

  if (loading) return <ProfileSkeleton />;
  if (!student) return null;

  return (
    <div className="space-y-8">
      <StudentHeroCard student={student} />
      <QuickStats studentId={student.id} />

      <StudentInfoCard student={student} />

      <div className="grid md:grid-cols-2 gap-6">
        <ParentDetailsCard
          title="Father's Details"
          name={student.fatherName}
          phone={student.phoneNo}
        />

        <ParentDetailsCard
          title="Mother's Details"
          name="Mother Name"
          phone="Mother Phone"
        />
      </div>
    </div>
  );
}
