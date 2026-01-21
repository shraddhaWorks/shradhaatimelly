export interface ITransferCertificate {
  id: string;
  reason: string | null;
  status: string;
  issuedDate: string | null;
  tcDocumentUrl: string | null;
  createdAt: string;
  student: {
    id: string;
    user: { id: string; name: string | null; email: string | null };
    class: { id: string; name: string; section: string | null } | null;
  };
  requestedBy: { id: string; name: string | null; email: string | null } | null;
  approvedBy: { id: string; name: string | null; email: string | null } | null;
}

export interface MineSchool {
  id: string;
  name: string;
  address: string;
  location: string;
  icon?: string | null;
  pincode: string;
  district: string;
  state: string;
  city: string;
  createdAt: string;
}

export interface GetMySchoolResponse {
  message?: string;
  school: MineSchool ;
}
