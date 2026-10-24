import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد').max(50),
  email: z.string().email('ایمیل نامعتبر است'),
  subject: z.string().min(3, 'موضوع باید حداقل ۳ کاراکتر باشد').max(100),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد').max(1000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    // در production، اینجا ایمیل ارسال می‌شه یا در دیتابیس ذخیره می‌شه
    console.log('📧 پیام تماس جدید:', parsed.data)

    // شبیه‌سازی تأخیر
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: 'پیام شما دریافت شد. به زودی پاسخ می‌دیم.',
    })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json(
      { error: 'خطا در ارسال پیام' },
      { status: 500 }
    )
  }
}