import { FiUser, FiPhone } from "react-icons/fi";

export default function ParentDetailsCard({
  title,
  name,
  phone,
}: {
  title: string;
  name: string;
  phone: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">{title}</h3>

      <div className="space-y-3">
        <Row icon={<FiUser />} value={name} />
        <Row icon={<FiPhone />} value={phone} />
      </div>
    </div>
  );
}

function Row({ icon, value }: any) {
  return (
    <div className="flex items-center gap-3 text-gray-700">
      <span>{icon}</span>
      <span>{value}</span>
    </div>
  );
}
