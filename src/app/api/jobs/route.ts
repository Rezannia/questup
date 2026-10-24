import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const location = searchParams.get('location') || ''
    const workMode = searchParams.get('workMode') || ''
    const companySize = searchParams.get('companySize') || ''
    const level = searchParams.get('level') || ''
    const limit = parseInt(searchParams.get('limit') || '50')

    const jobs = await db.job.findMany({
      where: {
        active: true,
        ...(location && { location: { contains: location } }),
        ...(workMode && { workMode }),
        ...(companySize && { companySize }),
        ...(level && { level }),
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            industry: true,
            size: true,
          },
        },
      },
      orderBy: [{ isStable: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    })

    return NextResponse.json({ jobs })
  } catch (error) {
    console.error('Jobs GET error:', error)
    return NextResponse.json({ error: 'خطا', jobs: [] }, { status: 500 })
  }
}