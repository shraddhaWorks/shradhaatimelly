export type UserRole =
  | "SUPERADMIN"
  | "SCHOOLADMIN"
  | "TEACHER"
  | "STUDENT";

export interface ProfileData {
  name: string;
  designation?: string;
  relation?: string;
  email?: string;
  phone?: string;
  employeeId?: string;
  occupation?: string;
  address?: string;
  image?: string;
  status?: "ACTIVE" | "INACTIVE";
}
