import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const companies = await db.company.findMany({
      where: { verified: true },
      select: {
        id: true,
        name: true,
        logo: true,
        industry: true,
        description: true,
        featured: true,
        foundedYear: true,
        story: true,
        whyGenZ: true,
        employeeQuote: true,
        employeeName: true,
        employeeRole: true,
        flexibleHours: true,
        remoteWork: true,
        learningBudget: true,
        transparentSalary: true,
        jobSecurity: true,
        goodManager: true,
        realValues: true,
        meaningfulWork: true,
        clearCareerPath: true,
        _count: { select: { jobs: true } },
      },
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      take: 12,
    })

    return NextResponse.json({ companies })
  } catch (error) {
    console.error('Verified companies error:', error)
    return NextResponse.json({ companies: [] }, { status: 500 })
  }
}