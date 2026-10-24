import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 جستجوی شرکت‌ها...')
  const companies = await prisma.company.findMany()

  if (companies.length === 0) {
    console.log('❌ هیچ شرکتی پیدا نشد!')
    console.log('')
    console.log('📋 قدم‌های لازم:')
    console.log('1. npm run dev رو اجرا کن')
    console.log('2. برو به http://localhost:3000/register')
    console.log('3. نقش «شرکت» انتخاب کن')
    console.log('4. نام: شرکت تست، ایمیل: company@test.com، پسورد: password123')
    console.log('5. ثبت‌نام کن')
    console.log('6. Ctrl+C بزن (dev رو ببند)')
    console.log('7. دوباره این دستور رو بزن: npx tsx prisma/seed-jobs.ts')
    return
  }

  const company = companies[0]
  console.log(`✓ استفاده از شرکت: ${company.name} (${company.id})`)

  const jobs = [
    {
      title: 'برنامه‌نویس Frontend',
      description: 'دنبال یه برنامه‌نویس React با تجربه هستیم. کار روی پروژه‌های جدید و تیم پویا.',
      location: 'تهران',
      type: 'full-time',
      level: 'mid',
      salary: '۲۵-۳۵ میلیون تومان',
      skills: JSON.stringify(['React', 'TypeScript', 'Tailwind']),
    },
    {
      title: 'طراح UI/UX',
      description: 'طراح خلاق با تجربه Figma و طراحی محصول. کار روی اپلیکیشن موبایل.',
      location: 'تهران',
      type: 'full-time',
      level: 'senior',
      salary: '۳۰-۴۵ میلیون تومان',
      skills: JSON.stringify(['Figma', 'UI Design', 'UX Research']),
    },
    {
      title: 'Backend Developer',
      description: 'Node.js و PostgreSQL. کار روی API و زیرساخت.',
      location: 'دورکاری',
      type: 'remote',
      level: 'mid',
      salary: '۲۸-۴۰ میلیون تومان',
      skills: JSON.stringify(['Node.js', 'PostgreSQL', 'Docker']),
    },
    {
      title: 'کارآموز بازاریابی دیجیتال',
      description: 'فرصت یادگیری بازاریابی دیجیتال و شبکه‌های اجتماعی. مناسب دانشجو.',
      location: 'تهران',
      type: 'part-time',
      level: 'junior',
      salary: '۸-۱۲ میلیون تومان',
      skills: JSON.stringify(['Instagram', 'Content', 'SEO']),
    },
    {
      title: 'مدیر محصول',
      description: 'مدیر محصول با تجربه در استارتاپ. کار روی استراتژی محصول.',
      location: 'تهران',
      type: 'full-time',
      level: 'senior',
      salary: '۴۰-۶۰ میلیون تومان',
      skills: JSON.stringify(['Product Strategy', 'Analytics', 'Roadmap']),
    },
    {
      title: 'DevOps Engineer',
      description: 'AWS، Kubernetes، CI/CD. کار روی زیرساخت ابری.',
      location: 'دورکاری',
      type: 'remote',
      level: 'mid',
      salary: '۳۵-۵۰ میلیون تومان',
      skills: JSON.stringify(['AWS', 'Kubernetes', 'Terraform']),
    },
  ]

  console.log(`🌱 ایجاد ${jobs.length} شغل...`)
  for (const job of jobs) {
    await prisma.job.create({
      data: {
        companyId: company.id,
        ...job,
      },
    })
    console.log(`  ✓ ${job.title}`)
  }

  console.log('')
  console.log(`✅ ${jobs.length} شغل با موفقیت اضافه شد!`)
  console.log('')
  console.log('🎯 حالا برو به http://localhost:3000 و بخش «جدیدترین فرصت‌ها» رو ببین')
}

main()
  .catch((e) => {
    console.error('❌ خطا:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })