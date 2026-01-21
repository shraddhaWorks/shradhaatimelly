import { useState } from "react";
import { studentApi } from "@/services/schooladmin/students.service";
import { IAttendanceSummary, IStudent, IUpdateStudentPayload } from "@/interfaces/studentdetails";

export function useStudentDetails() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<IStudent | null>(null);
  const [attendance, setAttendance] =
    useState<IAttendanceSummary | null>(null);

  const fetchByAdmissionNo = async (
    admissionNo: string,
    academicYear?: string
  ) => {
    setLoading(true);
    setError(null);
    setStudent(null);
    setAttendance(null);

    try {
      const res = await studentApi.getByAdmissionNo(
        admissionNo,
        academicYear
      );
      setStudent(res.data.student);
      setAttendance(res.data.attendance);
    } catch {
      setError("Failed to fetch student details");
    } finally {
      setLoading(false);
    }
  };


  const updateStudent = async (
    admissionNo: string,
    updates: IUpdateStudentPayload
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await studentApi.updateByAdmissionNo(
        admissionNo,
        updates
      );
      setStudent(res.data.student);
    } catch {
      setError("Failed to update student details");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    student,
    attendance,
    fetchByAdmissionNo,
    updateStudent,
  };
}
