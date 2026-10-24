import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const companies = [
  {
    name: 'دیجی‌کالا',
    industry: 'فروشگاه اینترنتی',
    logo: '🛒',
    website: 'https://digikala.com',
    description: 'بزرگترین فروشگاه اینترنتی ایران با فرهنگ کاری مدرن',
    featured: true,
    perks: {
      flexibleHours: true,
      remoteWork: true,
      learningBudget: true,
      transparentSalary: true,
      jobSecurity: true,
      goodManager: true,
      realValues: true,
      meaningfulWork: true,
      clearCareerPath: true,
    },
  },
  {
    name: 'اسنپ',
    industry: 'حمل و نقل',
    logo: '🚗',
    website: 'https://snapp.ir',
    description: 'سوپراپلیکیشن اسنپ — محیطی برای رشد و نوآوری',
    featured: true,
    perks: {
      flexibleHours: true,
      remoteWork: true,
      learningBudget: true,
      transparentSalary: true,
      jobSecurity: true,
      goodManager: true,
      realValues: true,
      meaningfulWork: true,
      clearCareerPath: true,
    },
  },
  {
    name: 'تپسی',
    industry: 'حمل و نقل',
    logo: '🚕',
    website: 'https://tapsi.ir',
    description: 'سرویس تاکسی اینترنتی با تیم صمیمی',
    featured: true,
    perks: {
      flexibleHours: true,
      remoteWork: true,
      learningBudget: true,
      transparentSalary: true,
      jobSecurity: false,
      goodManager: true,
      realValues: true,
      meaningfulWork: true,
      clearCareerPath: true,
    },
  },
  {
    name: 'کافه‌بازار',
    industry: 'فناوری',
    logo: '📱',
    website: 'https://cafebazaar.ir',
    description: 'بزرگترین بازار اندروید ایران',
    featured: true,
    perks: {
      flexibleHours: true,
      remoteWork: true,
      learningBudget: true,
      transparentSalary: false,
      jobSecurity: true,
      goodManager: true,
      realValues: true,
      meaningfulWork: true,
      clearCareerPath: true,
    },
  },
  {
    name: 'فیلیمو',
    industry: 'سرگرمی',
    logo: '🎬',
    website: 'https://filimo.com',
    description: 'سرویس ویدیو آنلاین با تیم خلاق',
    featured: false,
    perks: {
      flexibleHours: true,
      remoteWork: true,
      learningBudget: true,
      transparentSalary: false,
      jobSecurity: true,
      goodManager: false,
      realValues: true,
      meaningfulWork: true,
      clearCareerPath: false,
    },
  },
  {
    name: 'دیوار',
    industry: 'آگهی آنلاین',
    logo: '📋',
    website: 'https://divar.ir',
    description: 'بزرگترین سایت آگهی ایران',
    featured: true,
    perks: {
      flexibleHours: true,
      remoteWork: true,
      learningBudget: true,
      transparentSalary: true,
      jobSecurity: true,
      goodManager: true,
      realValues: true,
      meaningfulWork: true,
      clearCareerPath: true,
    },
  },
]

async function main() {
  console.log('🌱 Seeding verified companies with evidence-based perks...\n')

  const hashedPassword = await bcrypt.hash('password123', 10)

  for (const companyData of companies) {
    const email = `company-${companyData.name.replace(/\s/g, '')}@test.com`

    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      await prisma.company.updateMany({
        where: { userId: existing.id },
        data: {
          verified: true,
          featured: companyData.featured,
          ...companyData.perks,
        },
      })
      console.log(`♻️  ${companyData.name} آپدیت شد`)
      continue
    }

    const user = await prisma.user.create({
      data: {
        name: companyData.name,
        email,
        password: hashedPassword,
        role: 'COMPANY',
      },
    })

    await prisma.company.create({
      data: {
        userId: user.id,
        name: companyData.name,
        industry: companyData.industry,
        logo: companyData.logo,
        website: companyData.website,
        description: companyData.description,
        verified: true,
        featured: companyData.featured,
        ...companyData.perks,
      },
    })

    console.log(`✅ ${companyData.name}`)
  }

  console.log('\n🎉 تمام!')
  console.log('\n📋 اطلاعات ورود نمونه:')
  console.log('   ایمیل: company-دیجی‌کالا@test.com')
  console.log('   پسورد: password123')
}

main()
  .catch((e) => {
    console.error('❌ خطا:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })