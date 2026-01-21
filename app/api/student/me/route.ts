import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET() {
 const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return Response.json({}, { status: 401 });

  const student = await prisma.student.findFirst({
    where: { userId: session.user.id },
    include: {
      user: true,
      class: true,
      school: true,
    },
  });

  return Response.json({ student });
}
