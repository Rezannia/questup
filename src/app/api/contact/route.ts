import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.issues },
        { status: 400 }
      );
    }

    // TODO: ذخیره در دیتابیس یا ارسال ایمیل
    console.log("Contact form:", result.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}