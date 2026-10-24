import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { registerSchema } from '@/lib/validators'
import {
  hashPassword,
  createSession,
  setSessionCookie,
} from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, email, password, role } = parsed.data

    // چک تکراری بودن ایمیل
    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: 'این ایمیل قبلاً ثبت شده است' },
        { status: 409 }
      )
    }

    // هش پسورد
    const hashedPassword = await hashPassword(password)

    // ساخت کاربر
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    // ساخت session
    const token = await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
    await setSessionCookie(token)

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    )
  }
}