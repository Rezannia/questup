import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const challenges = [
  // ═══════════════════════════════════════════════
  // React
  // ═══════════════════════════════════════════════
  {
    skillName: 'React',
    title: 'چالش React: useState',
    description: 'کامپوننت ساده با useState بنویس',
    type: 'quiz',
    difficulty: 'easy',
    xpReward: 50,
    questions: [
      {
        question: 'کدوم هوک برای مدیریت state استفاده می‌شه؟',
        options: ['useEffect', 'useState', 'useContext', 'useRef'],
        correct: 1,
      },
      {
        question: 'useState چی برمی‌گردونه؟',
        options: [
          'فقط مقدار',
          'فقط setter',
          'آرایه [مقدار, setter]',
          'شیء { value, set }',
        ],
        correct: 2,
      },
      {
        question: 'state رو چطور آپدیت می‌کنیم؟',
        options: [
          'state = newValue',
          'setState(newValue)',
          'this.state = newValue',
          'updateState(newValue)',
        ],
        correct: 1,
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // JavaScript
  // ═══════════════════════════════════════════════
  {
    skillName: 'JavaScript',
    title: 'چالش JavaScript: Array Methods',
    description: 'متدهای آرایه رو بشناس',
    type: 'quiz',
    difficulty: 'easy',
    xpReward: 50,
    questions: [
      {
        question: 'کدوم متد یه آرایه جدید برمی‌گردونه؟',
        options: ['forEach', 'map', 'for', 'while'],
        correct: 1,
      },
      {
        question: 'filter چه کاری می‌کنه؟',
        options: [
          'همه رو نگه می‌داره',
          'فقط شرط رو نگه می‌داره',
          'مرتب می‌کنه',
          'حذف می‌کنه',
        ],
        correct: 1,
      },
      {
        question: 'reduce چه کاری می‌کنه؟',
        options: [
          'آرایه رو کوتاه می‌کنه',
          'به یه مقدار تبدیل می‌کنه',
          'مرتب می‌کنه',
          'کپی می‌کنه',
        ],
        correct: 1,
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // Figma
  // ═══════════════════════════════════════════════
  {
    skillName: 'Figma',
    title: 'چالش Figma: Auto Layout',
    description: 'Auto Layout رو بشناس',
    type: 'quiz',
    difficulty: 'easy',
    xpReward: 50,
    questions: [
      {
        question: 'Auto Layout چه کاری می‌کنه؟',
        options: [
          'رنگ عوض می‌کنه',
          'عناصر رو خودکار مرتب می‌کنه',
          'فونت عوض می‌کنه',
          'عکس اضافه می‌کنه',
        ],
        correct: 1,
      },
      {
        question: 'کلید میانبر Auto Layout چیه؟',
        options: ['Ctrl+A', 'Shift+A', 'Alt+A', 'Ctrl+Shift+A'],
        correct: 1,
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // UI Design
  // ═══════════════════════════════════════════════
  {
    skillName: 'UI Design',
    title: 'چالش UI: اصول طراحی',
    description: 'اصول پایه طراحی رابط کاربری',
    type: 'quiz',
    difficulty: 'medium',
    xpReward: 70,
    questions: [
      {
        question: 'کدوم اصل طراحی مهم‌تره؟',
        options: ['زیبایی', 'خوانایی', 'پیچیدگی', 'رنگ'],
        correct: 1,
      },
      {
        question: 'whitespace چیه؟',
        options: [
          'فضای خالی',
          'رنگ سفید',
          'فونت سفید',
          'پس‌زمینه سفید',
        ],
        correct: 0,
      },
      {
        question: 'کنتراست رنگ برای چیه؟',
        options: ['زیبایی', 'خوانایی', 'سرگرمی', 'تنوع'],
        correct: 1,
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // Python
  // ═══════════════════════════════════════════════
  {
    skillName: 'Python',
    title: 'چالش Python: List Comprehension',
    description: 'List Comprehension رو بشناس',
    type: 'quiz',
    difficulty: 'medium',
    xpReward: 70,
    questions: [
      {
        question: 'خروجی [x*2 for x in range(3)] چیه؟',
        options: ['[2, 4, 6]', '[0, 2, 4]', '[0, 1, 2]', '[1, 2, 3]'],
        correct: 1,
      },
      {
        question: 'کدوم برای فیلتر استفاده می‌شه؟',
        options: [
          '[x for x in nums]',
          '[x for x in nums if x > 0]',
          '[x, for x in nums]',
          '[x if nums]',
        ],
        correct: 1,
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // Instagram Marketing
  // ═══════════════════════════════════════════════
  {
    skillName: 'Instagram Marketing',
    title: 'چالش مارکتینگ: اینستاگرام',
    description: 'اصول مارکتینگ در اینستاگرام',
    type: 'quiz',
    difficulty: 'easy',
    xpReward: 50,
    questions: [
      {
        question: 'بهترین زمان پست چیه؟',
        options: [
          'صبح زود',
          'وقتی مخاطب فعاله',
          'نصف شب',
          'تصادفی',
        ],
        correct: 1,
      },
      {
        question: 'هشتگ چقدر مهمه؟',
        options: [
          'خیلی مهم',
          'اصلاً مهم نیست',
          'فقط برای زیبایی',
          'برای گزارش',
        ],
        correct: 0,
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // Communication (Soft Skill)
  // ═══════════════════════════════════════════════
  {
    skillName: 'Communication',
    title: 'چالش ارتباط: گوش دادن فعال',
    description: 'مهارت گوش دادن فعال',
    type: 'scenario',
    difficulty: 'easy',
    xpReward: 40,
    questions: [
      {
        question:
          'همکارت داره از یه مشکل کاری می‌گه. بهترین واکنش چیه؟',
        options: [
          'وسط حرفش بپر و راه‌حل بده',
          'گوش کن و سوال بپرس',
          'بگو وقت ندارم',
          'موبایلت رو چک کن',
        ],
        correct: 1,
      },
      {
        question:
          'توی جلسه، اگه چیزی رو نفهمیدی چی می‌کنی؟',
        options: [
          'سکوت می‌کنی',
          'می‌پرسی "می‌شه بیشتر توضیح بدی؟"',
          'می‌ری بیرون',
          'به دوستت پیام می‌دی',
        ],
        correct: 1,
      },
    ],
  },
]

async function main() {
  console.log('🌱 Seeding skill challenges...\n')

  // پاک کردن قبلی‌ها
  await prisma.userChallengeAttempt.deleteMany({})
  await prisma.skillChallenge.deleteMany({})

  for (const challenge of challenges) {
    await prisma.skillChallenge.create({
      data: {
        skillName: challenge.skillName,
        title: challenge.title,
        description: challenge.description,
        type: challenge.type,
        difficulty: challenge.difficulty,
        xpReward: challenge.xpReward,
        questions: JSON.stringify(challenge.questions),
      },
    })
    console.log(`  ✓ ${challenge.title}`)
  }

  console.log(`\n✅ ${challenges.length} چالش اضافه شد!`)
  console.log('\n🎯 حالا برو به http://localhost:3000/challenges')
}

main()
  .catch((e) => {
    console.error('❌ خطا:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })