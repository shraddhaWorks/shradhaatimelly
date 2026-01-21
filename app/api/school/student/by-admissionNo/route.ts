import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const admissionNo = searchParams.get("admissionNo");
  const academicYear = searchParams.get("academicYear");

  if (!admissionNo) {
    return NextResponse.json(
      { error: "AdmissionNo is required" },
      { status: 400 }
    );
  }

  const student = await prisma.student.findUnique({
    where: { AdmissionNo: admissionNo },
    include: {
      user: true,
      class: true,
      school: true,

      marks: {
        include: { exam: true },

        where: academicYear
          ? {
            exam: {
              name: {
                contains: academicYear, // or map year properly later
              },
            },
          }
          : undefined,
      },

      attendances: academicYear
        ? {
          where: {
            date: {
              gte: new Date(`${academicYear.split("-")[0]}-06-01`),
              lte: new Date(`${academicYear.split("-")[1]}-03-31`),
            },
          },
        }
        : true,

      fee: true,
      payments: true,
      certificates: true,
      transferCertificates: true,
    },
  });

  if (!student) {
    return NextResponse.json(
      { error: "Student not found" },
      { status: 404 }
    );
  }

  const total = student.attendances.length;
  const present = student.attendances.filter(
    (a) => a.status === "PRESENT"
  ).length;

  return NextResponse.json({
    student,
    attendance: {
      percent: total ? Math.round((present / total) * 100) : 0,
      present,
      absent: total - present,
    },
  });
}


export async function PATCH(req: Request) {
  const body = await req.json();
  const { admissionNo, updates } = body;

  if (!admissionNo || !updates) {
    return NextResponse.json(
      { error: "admissionNo and updates are required" },
      { status: 400 }
    );
  }

  const allowedUpdates: any = {};

  if (typeof updates.fatherName === "string") {
    allowedUpdates.fatherName = updates.fatherName;
  }

  if (typeof updates.phoneNo === "string") {
    allowedUpdates.phoneNo = updates.phoneNo;
  }

  if (typeof updates.address === "string") {
    allowedUpdates.address = updates.address;
  }

  // Rare edits (optional, admin-only in future)
  if (updates.rollNo !== undefined) {
    allowedUpdates.rollNo = updates.rollNo;
  }

  if (typeof updates.dob === "string") {
    const parsedDate = new Date(updates.dob);

    if (!isNaN(parsedDate.getTime())) {
      allowedUpdates.dob = parsedDate;
    }
  }

  if (Object.keys(allowedUpdates).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update" },
      { status: 400 }
    );
  }

  const student = await prisma.student.update({
  where: { AdmissionNo: admissionNo },
  data: allowedUpdates,
  include: {
    user: true,
    class: true,
    school: true,
    marks: {
      include: { exam: true },
    },
    attendances: true,
    fee: true,
    payments: true,
    certificates: true,
    transferCertificates: true,
  },
});


  return NextResponse.json({ student });
}


