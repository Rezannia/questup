import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

// لیست پست‌ها
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const category = searchParams.get("category");

    const where: any = {};
    if (published !== null) where.published = published === "true";
    if (category) where.category = category;

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Get blog posts error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// ساخت پست جدید
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const body = await request.json();
    const {
      slug,
      title,
      excerpt,
      content,
      category,
      categoryLabel,
      categoryColor,
      author,
      authorRole,
      readTime,
      image,
      tags,
      featured,
      published,
    } = body;

    // بررسی slug یکتا
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "این slug قبلاً استفاده شده" },
        { status: 409 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        category,
        categoryLabel,
        categoryColor,
        author: author || "تیم کوئست‌آپ",
        authorRole: authorRole || "تولید محتوا",
        readTime: readTime || 5,
        image: image || null,
        tags: JSON.stringify(tags || []),
        featured: featured || false,
        published: published !== false,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create blog post error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}