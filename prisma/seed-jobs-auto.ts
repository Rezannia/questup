import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 شروع ساخت خودکار...\n')

  // ═══════════════════════════════════════════════
  // ۱. چک کن کاربر COMPANY هست
  // ═══════════════════════════════════════════════

  let companyUser = await prisma.user.findFirst({
    where: { role: 'COMPANY' },
  })

  // اگه نبود، بسازش
  if (!companyUser) {
    console.log('⚠️  هیچ کاربر COMPANY پیدا نشد. ساخت...')

    const hashedPassword = await bcrypt.hash('password123', 10)

    companyUser = await prisma.user.create({
      data: {
        name: 'شرکت تست',
        email: 'company@test.com',
        password: hashedPassword,
        role: 'COMPANY',
      },
    })

    console.log(`✅ کاربر COMPANY ساخته شد: ${companyUser.email}`)
  } else {
    console.log(`✅ کاربر COMPANY پیدا شد: ${companyUser.email}`)
  }

  // ═══════════════════════════════════════════════
  // ۲. چک کن پروفایل Company هست
  // ═══════════════════════════════════════════════

  let company = await prisma.company.findUnique({
    where: { userId: companyUser.id },
  })

  // اگه نبود، بسازش
  if (!company) {
    console.log('⚠️  پروفایل Company پیدا نشد. ساخت...')

    company = await prisma.company.create({
      data: {
        userId: companyUser.id,
        name: 'شرکت تست',
        industry: 'فناوری اطلاعات',
        website: 'https://example.com',
        description: 'یه شرکت نمونه برای تست',
      },
    })

    console.log(`✅ پروفایل Company ساخته شد: ${company.name}`)
  } else {
    console.log(`✅ پروفایل Company پیدا شد: ${company.name}`)
  }

  console.log('')

  // ═══════════════════════════════════════════════
  // ۳. چک کن قبلاً شغلی ساخته نشده
  // ═══════════════════════════════════════════════

  const existingJobs = await prisma.job.count()
  if (existingJobs > 0) {
    console.log(`ℹ️  ${existingJobs} شغل قبلاً وجود داره.`)
    console.log('   اگه می‌خوای دوباره بسازی، اول پاک کن:')
    console.log('   npx prisma studio → جدول Job → همه رو پاک کن')
    console.log('')
    console.log('   یا این رو بزن:')
    console.log('   npx tsx prisma/seed-jobs-auto.ts --reset')
    console.log('')

    if (!process.argv.includes('--reset')) {
      console.log('⏹  متوقف شد. (برای بازسازی از --reset استفاده کن)')
      return
    }

    // پاک کردن همه
    await prisma.job.deleteMany({})
    console.log('🗑  همه شغل‌های قبلی پاک شد.\n')
  }

  // ═══════════════════════════════════════════════
  // ۴. ساخت ۶ شغل
  // ═══════════════════════════════════════════════

  const jobs = [
    {
      title: 'برنامه‌نویس Frontend',
      description: 'دنبال یه برنامه‌نویس React با تجربه هستیم. کار روی پروژه‌های جدید و تیم پویا.',
      location: 'تهران',
      type: 'full-time',
      level: 'mid',
      salary: '۲۵-۳۵ میلیون تومان',
      skills: ['React', 'TypeScript', 'Tailwind'],
    },
    {
      title: 'طراح UI/UX',
      description: 'طراح خلاق با تجربه Figma و طراحی محصول. کار روی اپلیکیشن موبایل.',
      location: 'تهران',
      type: 'full-time',
      level: 'senior',
      salary: '۳۰-۴۵ میلیون تومان',
      skills: ['Figma', 'UI Design', 'UX Research'],
    },
    {
      title: 'Backend Developer',
      description: 'Node.js و PostgreSQL. کار روی API و زیرساخت.',
      location: 'دورکاری',
      type: 'remote',
      level: 'mid',
      salary: '۲۸-۴۰ میلیون تومان',
      skills: ['Node.js', 'PostgreSQL', 'Docker'],
    },
    {
      title: 'کارآموز بازاریابی دیجیتال',
      description: 'فرصت یادگیری بازاریابی دیجیتال و شبکه‌های اجتماعی. مناسب دانشجو.',
      location: 'تهران',
      type: 'part-time',
      level: 'junior',
      salary: '۸-۱۲ میلیون تومان',
      skills: ['Instagram', 'Content', 'SEO'],
    },
    {
      title: 'مدیر محصول',
      description: 'مدیر محصول با تجربه در استارتاپ. کار روی استراتژی محصول.',
      location: 'تهران',
      type: 'full-time',
      level: 'senior',
      salary: '۴۰-۶۰ میلیون تومان',
      skills: ['Product Strategy', 'Analytics', 'Roadmap'],
    },
    {
      title: 'DevOps Engineer',
      description: 'AWS، Kubernetes، CI/CD. کار روی زیرساخت ابری.',
      location: 'دورکاری',
      type: 'remote',
      level: 'mid',
      salary: '۳۵-۵۰ میلیون تومان',
      skills: ['AWS', 'Kubernetes', 'Terraform'],
    },
  ]

  console.log(`🌱 ایجاد ${jobs.length} شغل...`)
  for (const job of jobs) {
    await prisma.job.create({
      data: {
        companyId: company.id,
        title: job.title,
        description: job.description,
        location: job.location,
        type: job.type,
        level: job.level,
        salary: job.salary,
        skills: JSON.stringify(job.skills),
        active: true,
      },
    })
    console.log(`  ✓ ${job.title}`)
  }

  console.log('')
  console.log(`✅ ${jobs.length} شغل با موفقیت اضافه شد!`)
  console.log('')
  console.log('📋 اطلاعات کاربر COMPANY:')
  console.log(`   ایمیل: ${companyUser.email}`)
  console.log(`   پسورد: password123`)
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