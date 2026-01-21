// AcademicPerformanceCard.tsx

import AnimatedCard from "../common/AnimatedCard";
import DataTable from "../TableData";

export default function AcademicPerformanceCard({ marks }: any) {
  return (
    <AnimatedCard>
      <h3 className="font-semibold mb-3">Academic Performance</h3>

      <DataTable
        columns={[
          { header: "Subject", accessor: "subject" },
          { header: "Marks", accessor: "marks" },
          { header: "Total", accessor: "totalMarks" },
          { header: "Grade", accessor: "grade" },
        ]}
        data={marks}
        emptyText="No marks available"
      />
    </AnimatedCard>
  );
}
