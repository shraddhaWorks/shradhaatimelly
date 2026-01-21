/* =========================
   CORE ENTITIES
========================= */

export interface IUser {
  id: string;
  name: string | null;
  email: string | null;
}

export interface IClass {
  id: string;
  name: string;
  section: string | null;
}

export interface ISchool {
  id: string;
  name: string;
}

/* =========================
   ATTENDANCE
========================= */

export interface IAttendanceSummary {
  percent: number;
  present: number;
  absent: number;
}

/* =========================
   EXAMS & MARKS
========================= */

export interface IExam {
  id: string;
  name: string;
}

export interface IMark {
  id: string;
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string | null;
  suggestions: string | null;
  exam: IExam;
}

/* =========================
   FEES & PAYMENTS
========================= */

export interface IStudentFee {
  id: string;
  totalFee: number;
  discountPercent: number;
  finalFee: number;
  amountPaid: number;
  remainingFee: number;
  installments: number;
}

export interface IPayment {
  id: string;
  amount: number;
  status: "SUCCESS" | "FAILED" | "PENDING";
  createdAt: string;
}

/* =========================
   CERTIFICATES
========================= */

export interface ICertificate {
  id: string;
  title: string;
  issuedDate: string;
  certificateUrl: string | null;
}

/* =========================
   STUDENT
========================= */

export interface IStudent {
  id: string;
  AdmissionNo: string;
  rollNo: string | null;
  fatherName: string;
  phoneNo: string;
  dob: string;
  address: string | null;

  user: IUser;
  class: IClass | null;
  school: ISchool;

  marks: IMark[];
  fee: IStudentFee | null;
  payments: IPayment[];
  certificates: ICertificate[];
  transferCertificates: ICertificate[];
}

/* =========================
   API RESPONSES
========================= */

export interface IGetStudentDetailsResponse {
  student: IStudent;
  attendance: IAttendanceSummary;
}

/* =========================
   UPDATE PAYLOAD
========================= */

export interface IUpdateStudentPayload {
  fatherName?: string;
  phoneNo?: string;
  address?: string;
  rollNo?: string;
  dob?: string; // ISO string
}
