import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const tasksByStage: Record<number, Array<{
  title: string
  taskType?: string
  checkKey?: string
  xp: number
  actionUrl?: string
  actionLabel?: string
}>> = {
  1: [
    {
      title: 'نام و نام خانوادگی‌ت رو کامل کن',
      taskType: 'auto',
      checkKey: 'has_name',
      xp: 20,
      actionUrl: '/profile',
      actionLabel: 'برو به پروفایل',
    },
    {
      title: 'یه آواتار انتخاب کن',
      taskType: 'auto',
      checkKey: 'has_avatar',
      xp: 20,
      actionUrl: '/profile',
      actionLabel: 'انتخاب آواتار',
    },
    {
      title: 'بیوت رو بنویس (حداقل ۵۰ کاراکتر)',
      taskType: 'auto',
      checkKey: 'has_bio',
      xp: 30,
      actionUrl: '/profile',
      actionLabel: 'نوشتن بیو',
    },
    {
      title: 'حداقل ۳ مهارت اضافه کن',
      taskType: 'auto',
      checkKey: 'has_skills_3',
      xp: 30,
      actionUrl: '/profile',
      actionLabel: 'افزودن مهارت',
    },
  ],
  2: [
    {
      title: 'حداقل ۱ چالش مهارتی رو کامل کن',
      taskType: 'auto',
      checkKey: 'has_challenge_attempt',
      xp: 50,
      actionUrl: '/challenges',
      actionLabel: 'شروع چالش',
    },
    {
      title: 'یه پروژه کوچیک بساز',
      taskType: 'manual',
      xp: 40,
    },
    {
      title: '۱۰ سناریو رو جواب بده',
      taskType: 'manual',
      xp: 30,
    },
    {
  title: 'حداقل ۳ مهارت اثبات‌شده داشته باش',
  taskType: 'auto',
  checkKey: 'has_verified_skills_3',
  xp: 50,
  actionUrl: '/challenges',
  actionLabel: 'دیدن چالش‌ها',
},
  ],
  3: [
    {
      title: 'آزمون شخصیت رو کامل کن',
      taskType: 'manual',
      xp: 40,
    },
    {
      title: 'نتیجه تیپ شخصیتی رو بخون',
      taskType: 'manual',
      xp: 30,
    },
    {
      title: '۳ نقطه قوتت رو بنویس',
      taskType: 'manual',
      xp: 30,
    },
  ],
  4: [
    {
      title: 'یه چالش مهارتی سخت رو کامل کن',
      taskType: 'auto',
      checkKey: 'has_passed_challenge',
      xp: 50,
      actionUrl: '/challenges',
      actionLabel: 'شروع چالش',
    },
    {
      title: 'نتیجه رو با یه دوست به اشتراک بذار',
      taskType: 'manual',
      xp: 20,
    },
    {
      title: '۳ نقطه ضعف پیدا کن و روش کار کن',
      taskType: 'manual',
      xp: 30,
    },
  ],
  5: [
    {
      title: 'با مصاحبه‌گر AI تمرین کن',
      taskType: 'manual',
      xp: 50,
    },
    {
      title: 'به ۳ سوال رایج جواب بده',
      taskType: 'manual',
      xp: 40,
    },
    {
      title: 'فیدبک رو بخون و یادداشت کن',
      taskType: 'manual',
      xp: 30,
    },
  ],
  6: [
    {
      title: '۵ شرکت مناسب پیدا کن',
      taskType: 'manual',
      xp: 30,
    },
    {
      title: 'درباره هر شرکت تحقیق کن',
      taskType: 'manual',
      xp: 30,
    },
    {
      title: 'فرهنگ شرکت رو چک کن',
      taskType: 'manual',
      xp: 20,
    },
  ],
  7: [
    {
      title: 'حداقل ۱ پیشنهاد دریافت کن',
      taskType: 'auto',
      checkKey: 'has_application',
      xp: 50,
      actionUrl: '/applications',
      actionLabel: 'دیدن پیشنهادها',
    },
    {
      title: 'جزئیات آفر رو بررسی کن',
      taskType: 'manual',
      xp: 40,
    },
    {
      title: 'با ۲ نفر مشورت کن',
      taskType: 'manual',
      xp: 30,
    },
  ],
  8: [
    {
      title: 'حقوق پیشنهادی رو با بازار مقایسه کن',
      taskType: 'manual',
      xp: 40,
    },
    {
      title: 'مزایا رو چک کن',
      taskType: 'manual',
      xp: 30,
    },
    {
      title: 'مسیر رشد رو بررسی کن',
      taskType: 'manual',
      xp: 30,
    },
  ],
  9: [
    {
      title: 'درباره حقوق مذاکره کن',
      taskType: 'manual',
      xp: 50,
    },
    {
      title: 'حداقل ۱ درخواست بده',
      taskType: 'auto',
      checkKey: 'has_application',
      xp: 40,
      actionUrl: '/applications',
      actionLabel: 'دیدن پیشنهادها',
    },
    {
      title: 'نتیجه رو ثبت کن',
      taskType: 'manual',
      xp: 30,
    },
  ],
  10: [
    {
      title: 'قرارداد رو بخون',
      taskType: 'manual',
      xp: 30,
    },
    {
      title: 'چک‌لیست روز اول رو آماده کن',
      taskType: 'manual',
      xp: 30,
    },
    {
      title: 'تیم جدید رو بشناس',
      taskType: 'manual',
      xp: 20,
    },
  ],
}

async function main() {
  console.log('🌱 Seeding smart stage tasks...\n')

  await prisma.stageTask.deleteMany({})
  await prisma.userTask.deleteMany({})

  for (const [stageOrderStr, tasks] of Object.entries(tasksByStage)) {
    const stageOrder = parseInt(stageOrderStr)

    const stage = await prisma.stage.findUnique({
      where: { order: stageOrder },
    })

    if (!stage) {
      console.log(`⚠️  مرحله ${stageOrder} پیدا نشد`)
      continue
    }

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i]
      await prisma.stageTask.create({
        data: {
          stageId: stage.id,
          order: i + 1,
          title: task.title,
          xpReward: task.xp,
          taskType: task.taskType || 'manual',
          checkKey: task.checkKey || null,
          actionUrl: task.actionUrl || null,
          actionLabel: task.actionLabel || null,
        },
      })
    }

    console.log(`✓ مرحله ${stageOrder}: ${tasks.length} تسک`)
  }

  console.log('\n✅ همه تسک‌ها اضافه شد!')
  console.log('\n🎯 حالا برو به http://localhost:3000/map')
}

main()
  .catch((e) => {
    console.error('❌ خطا:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })