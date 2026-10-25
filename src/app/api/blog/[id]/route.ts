import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

// دریافت یک پست
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "پست یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    console.error("Get blog post error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// ویرایش پست
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const data: any = {};
    if (body.title !== undefined) data.title = body.title;
    if (body.excerpt !== undefined) data.excerpt = body.excerpt;
    if (body.content !== undefined) data.content = body.content;
    if (body.category !== undefined) data.category = body.category;
    if (body.categoryLabel !== undefined) data.categoryLabel = body.categoryLabel;
    if (body.categoryColor !== undefined) data.categoryColor = body.categoryColor;
    if (body.author !== undefined) data.author = body.author;
    if (body.authorRole !== undefined) data.authorRole = body.authorRole;
    if (body.readTime !== undefined) data.readTime = body.readTime;
    if (body.image !== undefined) data.image = body.image;
    if (body.tags !== undefined) data.tags = JSON.stringify(body.tags);
    if (body.featured !== undefined) data.featured = body.featured;
    if (body.published !== undefined) data.published = body.published;

    const post = await prisma.blogPost.update({
      where: { id },
      data,
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Update blog post error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// حذف پست
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.blogPost.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog post error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}