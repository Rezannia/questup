import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jobSchema } from "@/lib/validators";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "COMPANY") {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const company = await prisma.company.findUnique({
      where: { userId: session.userId },
    });

    if (!company) {
      return NextResponse.json({ error: "پروفایل شرکت یافت نشد" }, { status: 404 });
    }

    const jobs = await prisma.job.findMany({
      where: { companyId: company.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Get jobs error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "COMPANY") {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const body = await request.json();
    const result = jobSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.issues },
        { status: 400 }
      );
    }

    const company = await prisma.company.findUnique({
      where: { userId: session.userId },
    });

    if (!company) {
      return NextResponse.json({ error: "پروفایل شرکت یافت نشد" }, { status: 404 });
    }

    const job = await prisma.job.create({
      data: {
        companyId: company.id,
        title: result.data.title,
        description: result.data.description,
        location: result.data.location,
        type: result.data.type,
        level: result.data.level,
        salary: result.data.salary,
        skills: result.data.skills ? JSON.stringify(result.data.skills) : null,
      },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("Create job error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}