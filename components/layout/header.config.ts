import { UserRole } from "@/types/profile";


export const PROFILE_CONFIG: Record<UserRole, {
  titleKey: string;
  subtitleKey?: string;
  fields: {
    label: string;
    key: string;
    icon: "email" | "phone" | "id" | "address" | "occupation";
  }[];
  showEdit: boolean;
}> = {
  TEACHER: {
    titleKey: "name",
    subtitleKey: "designation",
    fields: [
      { label: "Email", key: "email", icon: "email" },
      { label: "Phone", key: "phone", icon: "phone" },
      { label: "Employee ID", key: "employeeId", icon: "id" },
      { label: "Address", key: "address", icon: "address" },
    ],
    showEdit: true,
  },

  STUDENT: {
    titleKey: "name",
    subtitleKey: "relation",
    fields: [
      { label: "Email", key: "email", icon: "email" },
      { label: "Phone", key: "phone", icon: "phone" },
      { label: "Occupation", key: "occupation", icon: "occupation" },
      { label: "Address", key: "address", icon: "address" },
    ],
    showEdit: true,
  },

  SCHOOLADMIN: {
    titleKey: "name",
    fields: [
      { label: "Email", key: "email", icon: "email" },
      { label: "Phone", key: "phone", icon: "phone" },
    ],
    showEdit: false,
  },

  SUPERADMIN: {
    titleKey: "name",
    fields: [{ label: "Email", key: "email", icon: "email" }],
    showEdit: false,
  },
};
