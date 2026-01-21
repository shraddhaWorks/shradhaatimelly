import Newsfeed from "@/components/schooladmin/newsfeed/Newsfeed";
import ProfileCard from "@/components/ui/common/StudentProfile";
import { Event, MeContext } from "@/interfaces/student";

export default function ParentDashboard({
  events,
  attendanceStats,
  studentSchoolInfo,
}: {
  events: Event[];
  attendanceStats: {
    present: number;
    absent: number;
    late: number;
    percent: number;
  };
  studentSchoolInfo: MeContext;
}) {
  return (
    <div className="space-y-6">
      {/* PROFILE CARD */}
      <ProfileCard
        name={studentSchoolInfo?.user?.name}
        username={`@Class ${studentSchoolInfo?.class?.name}-${studentSchoolInfo?.class?.section}`}
        attendance={attendanceStats.present}
        percentage={attendanceStats.percent}
        workshops={events.length}
      />

      {/* NEWSFEED (REUSED COMPONENT) */}
      <section className="bg-white rounded-3xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Newsfeed</h2>

        <Newsfeed mode="home" />
      </section>
    </div>
  );
}
