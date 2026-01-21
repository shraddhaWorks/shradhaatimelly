import AnimatedCard from "../common/AnimatedCard";
import LeaveTypeBadge from "../LeaveTypeBadge";

export default function CertificatesCard({ certificates }: any) {
  return (
    <AnimatedCard>
      <h3 className="font-semibold mb-3">Certificates</h3>

      {certificates.length === 0 && (
        <p className="text-sm text-gray-500">No certificates found</p>
      )}

      <div className="space-y-2">
        {certificates.map((c: any) => (
          <div key={c.id} className="flex justify-between text-sm">
            <span>{c.reason || "Transfer Certificate"}</span>
            <LeaveTypeBadge type={c.status} />
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}
