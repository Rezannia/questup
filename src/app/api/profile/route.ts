import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { profileSchema } from "@/lib/validators";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        skills: true,
        website: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const body = await request.json();
    const result = profileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.issues },
        { status: 400 }
      );
    }

    const data: Record<string, unknown> = {};
    if (result.data.name !== undefined) data.name = result.data.name;
    if (result.data.bio !== undefined) data.bio = result.data.bio;
    if (result.data.avatar !== undefined) data.avatar = result.data.avatar;
    if (result.data.skills !== undefined)
      data.skills = JSON.stringify(result.data.skills);

    const user = await prisma.user.update({
      where: { id: session.userId },
      data,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        skills: user.skills,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}