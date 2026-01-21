// FeeDetailsCard.tsx

import AnimatedCard from "../common/AnimatedCard";
import FeeStatusBadge from "../fee/FeeStatusBadge";

export default function FeeDetailsCard({ fee }: any) {
  if (!fee) return null;

  return (
    <AnimatedCard>
      <h3 className="font-semibold mb-4">Fee Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <FeeStat title="Total Fee" value={fee.finalFee} />
        <FeeStat title="Paid" value={fee.amountPaid} />
        <FeeStat title="Pending" value={fee.remainingFee} />
      </div>

      <FeeStatusBadge paid={fee.remainingFee === 0} />
    </AnimatedCard>
  );
}

function FeeStat({ title, value }: any) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="font-bold">₹{value}</p>
    </div>
  );
}
