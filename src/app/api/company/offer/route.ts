import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { offerSchema } from "@/lib/validators";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "COMPANY") {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const body = await request.json();
    const result = offerSchema.safeParse(body);

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

    const application = await prisma.application.create({
      data: {
        userId: result.data.jobseekerId,
        companyId: company.id,
        message: result.data.message,
        status: "pending",
      },
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("Send offer error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}