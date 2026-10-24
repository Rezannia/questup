import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session || session.role !== 'COMPANY') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const { id } = await params

  const company = await db.company.findUnique({
    where: { userId: session.userId },
  })

  if (!company) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const job = await db.job.findUnique({ where: { id } })
  if (!job || job.companyId !== company.id) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  try {
    const body = await req.json()
    const updated = await db.job.update({
      where: { id },
      data: { active: body.active },
    })
    return NextResponse.json({ job: updated })
  } catch (error) {
    return NextResponse.json({ error: 'خطا' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session || session.role !== 'COMPANY') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const { id } = await params

  const company = await db.company.findUnique({
    where: { userId: session.userId },
  })

  if (!company) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const job = await db.job.findUnique({ where: { id } })
  if (!job || job.companyId !== company.id) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  await db.job.delete({ where: { id } })
  return NextResponse.json({ success: true })
}