"use client";

import { useEffect, useState } from "react";
import {
  School,
  Users,
  MessageSquare,
  Bell,
  Calendar,
  Clock,
  User,
} from "lucide-react";

/* ================= TYPES ================= */

interface Class {
  id: string;
  name: string;
  section?: string;
  _count: {
    students: number;
  };
}

interface Event {
  id: string;
  title?: string;
  createdAt: string;
}

interface Appointment {
  id: string;
  student: {
    user: {
      name: string;
    };
  };
  message: string;
  createdAt: string;
}

/* ================= PAGE ================= */

export default function TeacherDashboard() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/teacher/dashboard");
        const data = await res.json();

        setClasses(data.classes ?? []);
        setEvents(data.events ?? []);
        setAppointments(data.appointments ?? []);
      } catch (error) {
        console.error("Teacher dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  const totalStudents = classes.reduce(
    (sum, cls) => sum + cls._count.students,
    0
  );

  return (
    <div className="min-h-screen bg-[#F8FAFB] p-6 md:p-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Teacher Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of classes, students, and communications
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#E7F7EF] rounded-2xl p-6">
          <School />
          <div className="text-3xl font-bold mt-4">
            {classes.length}
          </div>
          <div className="text-sm text-gray-600">Classes</div>
        </div>

        <div className="bg-[#EEF2FF] rounded-2xl p-6">
          <Users />
          <div className="text-3xl font-bold mt-4">
            {totalStudents}
          </div>
          <div className="text-sm text-gray-600">Students</div>
        </div>

        <div className="bg-[#FFFBEB] rounded-2xl p-6">
          <MessageSquare />
          <div className="text-3xl font-bold mt-4">
            {appointments.length}
          </div>
          <div className="text-sm text-gray-600">
            Student Messages
          </div>
        </div>

        <div className="bg-[#F5F3FF] rounded-2xl p-6">
          <Bell />
          <div className="text-3xl font-bold mt-4">
            {events.length}
          </div>
          <div className="text-sm text-gray-600">Events</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Classes */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-lg font-bold mb-6">
            Classes Handled
          </h2>

          <div className="space-y-4">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="flex justify-between p-4 rounded-xl hover:bg-gray-50"
              >
                <div className="flex gap-4">
                  <span className="font-semibold">
                    {cls.name}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 rounded-full">
                    {cls.section ?? "General"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <User size={14} />
                  <span>{cls._count.students}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Student Messages */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="text-lg font-bold mb-6">
              Student Messages
            </h2>

            <div className="space-y-4">
              {appointments.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  className="p-4 border rounded-xl"
                >
                  <h4 className="font-bold text-sm">
                    {a.student.user.name}
                  </h4>

                  <p className="text-xs text-gray-600 mt-1">
                    {a.message}
                  </p>

                  <p className="text-[10px] text-gray-400 mt-2">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="text-lg font-bold mb-6">
              Upcoming Events
            </h2>

            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex gap-4">
                  <div className="w-1 bg-emerald-500 rounded-full" />

                  <div>
                    <h4 className="font-bold text-sm">
                      {event.title ?? "School Event"}
                    </h4>

                    <div className="flex gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(
                          event.createdAt
                        ).toLocaleDateString()}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Time
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
