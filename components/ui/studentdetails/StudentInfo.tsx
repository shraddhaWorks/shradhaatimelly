"use client";

import { useEffect, useState } from "react";
import AnimatedCard from "../common/AnimatedCard";

export type StudentEditPayload = {
  rollNo?: string;
  dob?: string;
  address?: string;
  fatherName?: string;
  phoneNo?: string;
};

export default function StudentInfoCard({
  student,
  isEditing,
  onSave,
}: {
  student: any;
  isEditing: boolean;
  onSave: (data: StudentEditPayload) => void;
}) {
  const [form, setForm] = useState<StudentEditPayload>({
    rollNo: "",
    dob: "",
    address: "",
    fatherName: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (student && isEditing) {
      setForm({
        rollNo: student.rollNo ?? "",
        dob: student.dob ? student.dob.split("T")[0] : "",
        address: student.address ?? "",
        fatherName: student.fatherName ?? "",
        phoneNo: student.phoneNo ?? "",
      });
    }
  }, [student, isEditing]);

  const update = (key: keyof StudentEditPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    onSave({ ...form, [key]: value }); // 🔑 live sync to parent
  };

  return (
    <>
      <AnimatedCard>
        <h3 className="font-semibold mb-4">Student Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <Readonly label="Admission No" value={student.AdmissionNo} />

          <Editable
            label="Roll No"
            value={isEditing ? form.rollNo : student.rollNo}
            disabled={!isEditing}
            onChange={(v:any) => update("rollNo", v)}
          />

          <Readonly
            label="Class"
            value={`${student.class?.name} - ${student.class?.section}`}
          />

          <Editable
            label="Date of Birth"
            type="date"
            value={
              isEditing
                ? form.dob
                : student.dob
                ? student.dob.split("T")[0]
                : ""
            }
            disabled={!isEditing}
            onChange={(v:any) => update("dob", v)}
          />

          <Editable
            label="Address"
            value={isEditing ? form.address : student.address}
            disabled={!isEditing}
            onChange={(v:any) => update("address", v)}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="font-semibold mb-4">Parent & Contact Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Editable
            label="Father's Name"
            value={isEditing ? form.fatherName : student.fatherName}
            disabled={!isEditing}
            onChange={(v:any) => update("fatherName", v)}
          />

          <Editable
            label="Parent Contact"
            value={isEditing ? form.phoneNo : student.phoneNo}
            disabled={!isEditing}
            onChange={(v:any) => update("phoneNo", v)}
          />

          <Readonly label="Email" value={student.user?.email} />
        </div>
      </AnimatedCard>
    </>
  );
}

function Readonly({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value ?? "-"}</p>
    </div>
  );
}

function Editable({ label, value, disabled, onChange, type = "text" }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <input
        type={type}
        disabled={disabled}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg px-3 py-2 text-sm ${
          disabled
            ? "bg-gray-50"
            : "bg-white border border-gray-300"
        }`}
      />
    </div>
  );
}
