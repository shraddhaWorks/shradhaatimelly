import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const userId = session.user.id;

    // Fetch user + student + class + school in ONE query chain
    const student = await prisma.student.findUnique({
        where: { userId },
        select: {
            id: true,
            AdmissionNo: true,
            rollNo: true,
            dob: true,

            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },

            class: {
                select: {
                    id: true,
                    name: true,
                    section: true,
                },
            },

            school: {
                select: {
                    id: true,
                    name: true,
                    icon: true,
                    city: true,
                    state: true,
                    district: true,
                },
            },
        },
    });

    if (!student) {
        return NextResponse.json(
            { message: "Student not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        {
            me: {
                user: {
                    id: student.user.id,
                    name: student.user.name,
                    email: student.user.email,
                    role: student.user.role,
                },

                student: {
                    id: student.id,
                    admissionNo: student.AdmissionNo,
                    rollNo: student.rollNo,
                    dob: student.dob,
                },

                class: student.class
                    ? {
                        id: student.class.id,
                        name: student.class.name,
                        section: student.class.section,
                    }
                    : null,

                school: {
                    id: student.school.id,
                    name: student.school.name,
                    icon: student.school.icon,
                    city: student.school.city,
                    state: student.school.state,
                    district: student.school.district,
                },
            }
        },
        { status: 200 }
    );
}
