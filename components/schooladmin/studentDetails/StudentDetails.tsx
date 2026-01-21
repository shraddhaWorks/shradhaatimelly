"use client";

import { useState } from "react";
import { useStudentDetails } from "@/hooks/schooladmin/useStudentDetails";

import StudentSearchCard from "@/components/ui/studentdetails/StudentSearchCard";
import StudentSummaryGrid from "@/components/ui/studentdetails/SummaryCard";
import StudentInfoCard, { StudentEditPayload } from "@/components/ui/studentdetails/StudentInfo";
import AcademicPerformanceCard from "@/components/ui/studentdetails/AcademicPerformance";
import FeeDetailsCard from "@/components/ui/studentdetails/FeeDetails";
import CertificatesCard from "@/components/ui/studentdetails/CertificatesInfo";
import { FiCalendar, FiEdit2, FiSave, FiX } from "react-icons/fi";
import SelectField from "@/components/ui/common/SelectField";
import { academicYearOptions } from "@/constants/selectFieldOptions";
import { MAIN_COLOR } from "@/constants/colors";
import { toast } from "@/services/toast/toast.service";

export default function StudentDetails() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [pendingUpdates, setPendingUpdates] = useState({});
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [latestForm, setLatestForm] = useState<StudentEditPayload | null>(null);

  const {
    loading,
    error,
    student,
    attendance,
    fetchByAdmissionNo,
    updateStudent,
  } = useStudentDetails();

  const handleSave = () => {
    if (!student || !latestForm) return;

    const cleanedUpdates = Object.fromEntries(
      Object.entries(latestForm).filter(
        ([_, value]) =>
          value !== "" &&
          value !== undefined &&
          value !== null
      )
    );

    if (Object.keys(cleanedUpdates).length === 0) {
      setIsEditing(false);
      return;
    }

    updateStudent(student.AdmissionNo, cleanedUpdates);
    setIsEditing(false);
    toast.success("Student details updated successfully.");
  };



  return (
    <div className="space-y-6 p-4 sm:p-6">
      <StudentSearchCard
        value={admissionNo}
        onChange={setAdmissionNo}
        onSearch={() => fetchByAdmissionNo(admissionNo)}
      />

      {loading && <p className="text-sm text-center">Loading...</p>}

      {error && (
        <p className="text-sm text-red-500 text-center py-6">
          {error}
        </p>
      )}

      {student && !error && (
        <>
          {/* Academic year + edit controls */}
          <div className="flex flex-col justify-between sm:flex-row sm:items-center sm:justify-between gap-3 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm">
              <FiCalendar className="text-green-600 text-xl mt-6" />
              <SelectField
                label="Academic Year"
                value={academicYear}
                onChange={(e) => {
                  const year = e.target.value;
                  setAcademicYear(year);

                  // refetch student data for selected year
                  if (admissionNo) {
                    fetchByAdmissionNo(admissionNo, year);
                  }
                }}
                options={academicYearOptions}
              />
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                style={{ backgroundColor: `${MAIN_COLOR}` }}
                className="flex items-center gap-2 text-white px-5 py-2 rounded-lg text-sm"
              >
                <FiEdit2 className="text-base" />
                Edit Details
              </button>

            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setPendingUpdates({});
                  }}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm bg-gray-500 text-white"
                >
                  <FiX className="text-base" />
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  style={{ backgroundColor: `${MAIN_COLOR}` }}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm text-white"
                >
                  <FiSave className="text-base" />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <StudentSummaryGrid
            student={student}
            attendance={attendance}
          />

          <StudentInfoCard
            student={student}
            isEditing={isEditing}
            onSave={(data) => setLatestForm(data)}
          />

          <AcademicPerformanceCard marks={student.marks} />
          <FeeDetailsCard fee={student.fee} />
          <CertificatesCard
            certificates={[
              ...(student.certificates ?? []),
              ...(student.transferCertificates ?? []),
            ]}

          />
        </>
      )}

    </div>
  );
}
