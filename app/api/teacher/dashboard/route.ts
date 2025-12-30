import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "TEACHER") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const teacherId = session.user.id;
    const schoolId = session.user.schoolId;

    if (!schoolId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 1️⃣ Classes assigned to teacher
    const classes = await prisma.class.findMany({
      where: { schoolId, teacherId },
      include: { _count: { select: { students: true } } },
      orderBy: { createdAt: "desc" },
    });

    const totalStudents = classes.reduce((acc, c) => acc + c._count.students, 0);

    const classIds = classes.map(c => c.id);

    // 2️⃣ Events
    const events = await prisma.event.findMany({
      where: {
        schoolId,
        OR: [
          { teacherId },
          ...(classIds.length ? [{ classId: { in: classIds } }] : []),
          { classId: null }, // school-wide
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // 3️⃣ Appointments (PENDING)
    const appointments = await prisma.appointment.findMany({
      where: {
        status: "PENDING",
        student: {
          classId: { in: classIds },
        },
      },
      include: {
        student: {
          select: { id: true, user: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({
      stats: {
        totalClasses: classes.length,
        totalStudents,
        pendingAppointments: appointments.length,
        unreadMessages: appointments.length,
      },
      classes,
      events,
      appointments: appointments.map(a => ({
        ...a,
        studentName: a.student.user.name,
      })),
    });
  } catch (error: any) {
    console.error("Teacher dashboard error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
