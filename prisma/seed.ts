import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const stages = [
  { order: 1, title: 'پروفایلت رو بچین', description: 'بگو چی بلدی، چی دوست داری و دنبال چه فضایی هستی.', icon: '🛡️', badgeName: 'سپر محافظ', medalIcon: '🛡️', x: 22, y: 32, xpReward: 100 },
  { order: 2, title: 'رزومه‌ات رو آپدیت کن', description: 'رزومه‌ات رو جوری بچین که دستاوردات حرف بزنن.', icon: '📜', badgeName: 'طومار مهارت', medalIcon: '📜', x: 40, y: 28, xpReward: 100 },
  { order: 3, title: 'کشف سوپرپاورها', description: 'بفهم کجاها می‌درخشی و چه مسیرهایی بهت میاد.', icon: '🧭', badgeName: 'قطبانما', medalIcon: '🧭', x: 56, y: 30, xpReward: 150 },
  { order: 4, title: 'چک مهارت‌ها', description: 'ببین برای نقش دلخواهت چه مهارت‌هایی داری و کدوم‌ها نیاز به آپدیت دارن.', icon: '⚔️', badgeName: 'شمشیر تخصص', medalIcon: '⚔️', x: 72, y: 40, xpReward: 150 },
  { order: 5, title: 'مصاحبه رو تمرین کن', description: 'قبل از مصاحبه اصلی، جواب‌ها و معرفی خودت رو تمرین کن.', icon: '🤖', badgeName: 'ربات همراه', medalIcon: '🤖', x: 78, y: 58, xpReward: 200 },
  { order: 6, title: 'شرکت‌ها رو زیرورو کن', description: 'فقط اسم شرکت مهم نیست؛ فرهنگ و وایب تیم رو هم چک کن.', icon: '🎯', badgeName: 'هدف‌گیر', medalIcon: '🎯', x: 62, y: 78, xpReward: 150 },
  { order: 7, title: 'آفر بگیر', description: 'وقتی آفر رسید، جزئیات نقش و شرایط رو دقیق ببین.', icon: '💼', badgeName: 'کیف فرصت', medalIcon: '💼', x: 42, y: 76, xpReward: 200 },
  { order: 8, title: 'آفر رو سبک‌سنگین کن', description: 'حقوق تنها معیار نیست؛ رشد، تیم و تعادل کار و زندگی رو هم بسنج.', icon: '🔍', badgeName: 'ذره‌بین', medalIcon: '🔍', x: 24, y: 62, xpReward: 150 },
  { order: 9, title: 'مذاکره کن', description: 'محترمانه و شفاف درباره حقوق، مزایا و مسیر رشد حرف بزن.', icon: '🤝', badgeName: 'دست تفاهم', medalIcon: '🤝', x: 18, y: 46, xpReward: 200 },
  { order: 10, title: 'شروع فصل جدید', description: 'با برنامه وارد نقش جدید شو و از همون اول برای رشدت قدم بردار.', icon: '👑', badgeName: 'تاج قهرمان', medalIcon: '👑', x: 50, y: 50, xpReward: 300 },
]

async function main() {
  console.log('🌱 Seeding stages...')
  for (const stage of stages) {
    await prisma.stage.upsert({
      where: { order: stage.order },
      update: stage,
      create: stage,
    })
  }
  console.log(`✅ ${stages.length} stages seeded`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })