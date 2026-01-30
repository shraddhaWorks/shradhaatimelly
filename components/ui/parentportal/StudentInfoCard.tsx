export default function StudentInfoCard({ student }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-4">Student Information</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Info label="Full Name" value={student.user?.name} />
        <Info label="DOB" value={new Date(student.dob).toDateString()} />
        <Info label="Admission No" value={student.AdmissionNo} />
        <Info label="Roll No" value={student.rollNo} />
        <Info label="Email" value={student.user?.email} />
        <Info label="Address" value={student.address} />
      </div>
    </div>
  );
}
function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
