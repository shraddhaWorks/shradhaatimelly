import DataTable from "@/components/ui/TableData";
import FeeStatusBadge from "./FeeStatusBadge";

export default function FeeDetails({
  fees,
  loading,
}: {
  fees: any[];
  loading?: boolean;
}) {
  const feeColumns = [
    {
      header: "Roll No",
      render: (row: any) => row.rollNo || "-",
    },
    {
      header: "Student Name",
      render: (row: any) => (
        <div className="font-medium whitespace-nowrap">
          {row.student.user.name}
        </div>
      ),
    },
    {
      header: "Total Amount",
      render: (row: any) => `₹${row.totalFee.toLocaleString()}`,
    },
    {
      header: "Discount (%)",
      render: (row: any) => `${row.discountPercent ?? 0}%`,
    },
    {
      header: "Discount Amount",
      render: (row: any) =>
        `₹${(
          (row.totalFee * (row.discountPercent ?? 0)) /
          100
        ).toLocaleString()}`,
    },
   {
      header: "Total After Discount",
      render: (row: any) => {
        const percent = row.discountPercent ?? 0;
        const discount = (row.totalFee * percent) / 100;
        return `₹${(row.totalFee - discount).toLocaleString()}`;
      },
    },
    {
      header: "Paid Amount",
      render: (row: any) => (
        <span className="text-green-600 font-medium">
          ₹{row.amountPaid.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Due Amount",
      render: (row: any) => (
        <span className="text-red-600 font-medium">
          ₹{row.remainingFee.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row: any) => (
        <FeeStatusBadge paid={row.remainingFee <= 0} />
      ),
    },
  ];

  return (
    <>
      {/* Desktop / Tablet */}
      <div className="hidden md:block">
        <DataTable
          columns={feeColumns}
          data={fees}
          loading={loading}
          emptyText="No fee records found"
        />
      </div>

      {/* Mobile → horizontal scroll table */}
      <div className="md:hidden overflow-x-auto">
        <div className="min-w-[900px]">
          <DataTable
            columns={feeColumns}
            data={fees}
            loading={loading}
            emptyText="No fee records found"
          />
        </div>
      </div>
    </>
  );
}
