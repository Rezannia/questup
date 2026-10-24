import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { loginSchema } from '@/lib/validators'
import {
  verifyPassword,
  createSession,
  setSessionCookie,
} from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    // پیدا کردن کاربر
    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { error: 'ایمیل یا پسورد اشتباه است' },
        { status: 401 }
      )
    }

    // تأیید پسورد
    const valid = await verifyPassword(password, user.password)
    if (!valid) {
      return NextResponse.json(
        { error: 'ایمیل یا پسورد اشتباه است' },
        { status: 401 }
      )
    }

    // ساخت session
    const token = await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
    await setSessionCookie(token)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'خطا در ورود. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    )
  }
}