import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const JOBSEEKERS = [
  {
    name: 'سارا محمدی',
    email: 'sara@test.com',
    avatar: '👩‍💻',
    bio: 'برنامه‌نویس فرانت‌اند با علاقه به UI/UX. عاشق React و ساختن چیزهای خفن.',
    skills: ['React', 'TypeScript', 'Tailwind', 'Figma'],
    completedStages: [1, 2, 3, 4, 5],
    medals: [1, 2, 3, 4, 5],
    verifiedSkills: [
      { skillName: 'React', level: 3, score: 95 },
      { skillName: 'JavaScript', level: 2, score: 85 },
      { skillName: 'Figma', level: 2, score: 80 },
    ],
  },
  {
    name: 'امیر رضایی',
    email: 'amir@test.com',
    avatar: '👨‍🎨',
    bio: 'طراح UI/UX با ۲ سال تجربه. عاشق طراحی مینیمال و تجربه کاربری.',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'],
    completedStages: [1, 2, 3, 4],
    medals: [1, 2, 3, 4],
    verifiedSkills: [
      { skillName: 'Figma', level: 3, score: 92 },
      { skillName: 'UI Design', level: 2, score: 88 },
    ],
  },
  {
    name: 'نگار کریمی',
    email: 'negar@test.com',
    avatar: '👩‍💼',
    bio: 'مدیر محصول با تجربه استارتاپ. عاشق حل مسئله و کار تیمی.',
    skills: ['Product Management', 'Analytics', 'Leadership', 'Communication'],
    completedStages: [1, 2, 3],
    medals: [1, 2, 3],
    verifiedSkills: [
      { skillName: 'Communication', level: 2, score: 90 },
    ],
  },
  {
    name: 'علی احمدی',
    email: 'ali@test.com',
    avatar: '👨‍💻',
    bio: 'برنامه‌نویس بک‌اند. عاشق Node.js و پایگاه داده.',
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    completedStages: [1, 2, 3],
    medals: [1, 2, 3],
    verifiedSkills: [
      { skillName: 'JavaScript', level: 3, score: 90 },
      { skillName: 'Python', level: 2, score: 82 },
    ],
  },
  {
    name: 'مریم حسینی',
    email: 'maryam@test.com',
    avatar: '👩‍🎨',
    bio: 'گرافیست و طراح موشن. عاشق رنگ و خلاقیت.',
    skills: ['Photoshop', 'Illustrator', 'Motion Design', 'Brand Identity'],
    completedStages: [1, 2],
    medals: [1, 2],
    verifiedSkills: [
      { skillName: 'UI Design', level: 1, score: 75 },
    ],
  },
  {
    name: 'رضا نوری',
    email: 'reza@test.com',
    avatar: '👨‍🔬',
    bio: 'علاقه‌مند به هوش مصنوعی و داده. در حال یادگیری Python و ML.',
    skills: ['Python', 'Data Analysis', 'Machine Learning'],
    completedStages: [1],
    medals: [1],
    verifiedSkills: [
      { skillName: 'Python', level: 1, score: 78 },
    ],
  },
  {
    name: 'زهرا موسوی',
    email: 'zahra@test.com',
    avatar: '👩‍🏫',
    bio: 'معلم و علاقه‌مند به آموزش آنلاین. عاشق انتقال دانش.',
    skills: ['Teaching', 'Content Writing', 'Communication'],
    completedStages: [],
    medals: [],
    verifiedSkills: [],
  },
  {
    name: 'حسین کاظمی',
    email: 'hossein@test.com',
    avatar: '👨‍🎓',
    bio: 'دانشجوی کامپیوتر. دنبال اولین فرصت شغلی.',
    skills: ['JavaScript', 'HTML', 'CSS'],
    completedStages: [],
    medals: [],
    verifiedSkills: [],
  },
]

const COMPANIES = [
  {
    name: 'دیجی‌کالا',
    email: 'company-digikala@test.com',
    industry: 'فروشگاه اینترنتی',
    logo: '🛒',
    website: 'https://digikala.com',
    description: 'بزرگترین فروشگاه اینترنتی ایران با فرهنگ کاری مدرن',
    size: '1000+',
    featured: true,
    foundedYear: 1385,
    story:
      'از یه اتاق کوچیک شروع کردیم و حالا بزرگترین فروشگاه اینترنتی ایرانیم. باور داریم که فناوری می‌تونه زندگی آدم‌ها رو بهتر کنه.',
    whyGenZ:
      'اینجا می‌تونی روی محصولی کار کنی که میلیون‌ها نفر ازش استفاده می‌کنن. یادگیری واقعی، تیم جوون و پروژه‌های چالشی.',
    employeeQuote:
      'وقتی اومدم دیجی‌کالا، فکر نمی‌کردم این‌قدر سریع رشد کنم. اینجا به ایده‌هام گوش می‌دن و اجازه می‌دن اشتباه کنم و یاد بگیرم.',
    employeeName: 'سارا محمدی',
    employeeRole: 'برنامه‌نویس Frontend',
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
    email: 'company-snapp@test.com',
    industry: 'حمل و نقل',
    logo: '🚗',
    website: 'https://snapp.ir',
    description: 'سوپراپلیکیشن اسنپ — محیطی برای رشد و نوآوری',
    size: '1000+',
    featured: true,
    foundedYear: 1393,
    story:
      'با یه ایده ساده شروع کردیم: جابه‌جایی آدم‌ها راحت‌تر بشه. حالا سوپراپلیکیشن هستیم که همه‌چیز از سفر تا غذا و پرداخت رو پوشش می‌ده.',
    whyGenZ:
      'اینکه هر روز یه چالش جدید داری و می‌تونی روی محصولی کار کنی که میلیون‌ها کاربر داره، هیجان‌انگیزه. اینجا سرعت یادگیری بالاست.',
    employeeQuote:
      'من اینجا یاد گرفتم چطور توی فشار کار کنم و تصمیم بگیرم. تیمم همیشه پشتم بوده.',
    employeeName: 'علی احمدی',
    employeeRole: 'Backend Developer',
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
    email: 'company-tapsi@test.com',
    industry: 'حمل و نقل',
    logo: '🚕',
    website: 'https://tapsi.ir',
    description: 'سرویس تاکسی اینترنتی با تیم صمیمی',
    size: '500+',
    featured: true,
    foundedYear: 1395,
    story:
      'تپسی با یه تیم کوچیک شروع شد و حالا یکی از بزرگترین سرویس‌های حمل و نقل ایرانه. باور داریم که سفر باید امن و راحت باشه.',
    whyGenZ:
      'اینجا واقعاً بهت اهمیت می‌دن. ساعات منعطف، دورکاری و یه تیم جوون که باهات دوست می‌شن.',
    employeeQuote:
      'بهترین چیز تپسی برای من اینه که می‌تونم از خونه کار کنم و وقت بیشتری با خانواده‌ام بگذرونم.',
    employeeName: 'امیر رضایی',
    employeeRole: 'طراح UI/UX',
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
    email: 'company-cafebazaar@test.com',
    industry: 'فناوری',
    logo: '📱',
    website: 'https://cafebazaar.ir',
    description: 'بزرگترین بازار اندروید ایران',
    size: '200+',
    featured: true,
    foundedYear: 1389,
    story:
      'کافه‌بازار از یه ایده ساده شروع شد: یه جایی که توسعه‌دهنده‌های ایرانی بتونن اپ‌هاشون رو منتشر کنن. حالا بزرگترین بازار اندروید ایرانیم.',
    whyGenZ:
      'اینجا با آدم‌های خلاق و باهوش کار می‌کنی. هر روز با چالش‌های جدید فنی روبه‌رو می‌شی و یاد می‌گیری.',
    employeeQuote:
      'کافه‌بازار به من یاد داد که چطور توی یه تیم بزرگ کار کنم و از همکارام یاد بگیرم.',
    employeeName: 'رضا نوری',
    employeeRole: 'DevOps Engineer',
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
    name: 'دیوار',
    email: 'company-divar@test.com',
    industry: 'آگهی آنلاین',
    logo: '📋',
    website: 'https://divar.ir',
    description: 'بزرگترین سایت آگهی ایران',
    size: '500+',
    featured: true,
    foundedYear: 1391,
    story:
      'دیوار با هدف ساده‌ای شروع شد: خرید و فروش راحت‌تر بشه. حالا بزرگترین سایت آگهی ایرانیم و میلیون‌ها آگهی روزانه داریم.',
    whyGenZ:
      'فرهنگ دیوار واقعاً مدرنه. ساعات منعطف، دورکاری، حقوق شفاف و یه تیم که بهت اهمیت می‌ده.',
    employeeQuote:
      'من توی دیوار یاد گرفتم که چطور با داده‌ها تصمیم بگیرم و به نتیجه برسم.',
    employeeName: 'مریم حسینی',
    employeeRole: 'طراح UI/UX',
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
    name: 'فیلیمو',
    email: 'company-filimo@test.com',
    industry: 'سرگرمی',
    logo: '🎬',
    website: 'https://filimo.com',
    description: 'سرویس ویدیو آنلاین با تیم خلاق',
    size: '200+',
    featured: false,
    foundedYear: 1393,
    story:
      'فیلیمو با یه ایده ساده شروع شد: سرگرمی با کیفیت برای همه. حالا یکی از بزرگترین سرویس‌های ویدیو آنلاین ایرانیم.',
    whyGenZ:
      'اینجا خلاقیت ارزش داره. می‌تونی روی محتوایی کار کنی که میلیون‌ها نفر می‌بینن.',
    employeeQuote:
      'فیلیمو به من اجازه داد خلاقیتم رو بروز بدم و روی پروژه‌های باحال کار کنم.',
    employeeName: 'زهرا موسوی',
    employeeRole: 'تدوینگر ویدیو',
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
]

const JOBS = [
  {
    companyName: 'دیجی‌کالا',
    title: 'برنامه‌نویس Frontend',
    description:
      'دنبال یه برنامه‌نویس React با تجربه هستیم. کار روی پروژه‌های جدید و تیم پویا.',
    location: 'تهران',
    type: 'full-time',
    level: 'mid',
    salary: '۲۵-۳۵ میلیون تومان',
    skills: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    companyName: 'دیجی‌کالا',
    title: 'طراح UI/UX',
    description:
      'طراح خلاق با تجربه Figma و طراحی محصول. کار روی اپلیکیشن موبایل.',
    location: 'تهران',
    type: 'full-time',
    level: 'senior',
    salary: '۳۰-۴۵ میلیون تومان',
    skills: ['Figma', 'UI Design', 'UX Research'],
  },
  {
    companyName: 'اسنپ',
    title: 'Backend Developer',
    description: 'Node.js و PostgreSQL. کار روی API و زیرساخت.',
    location: 'دورکاری',
    type: 'remote',
    level: 'mid',
    salary: '۲۸-۴۰ میلیون تومان',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    companyName: 'اسنپ',
    title: 'کارآموز بازاریابی دیجیتال',
    description:
      'فرصت یادگیری بازاریابی دیجیتال و شبکه‌های اجتماعی. مناسب دانشجو.',
    location: 'تهران',
    type: 'part-time',
    level: 'junior',
    salary: '۸-۱۲ میلیون تومان',
    skills: ['Instagram', 'Content', 'SEO'],
  },
  {
    companyName: 'تپسی',
    title: 'مدیر محصول',
    description: 'مدیر محصول با تجربه در استارتاپ. کار روی استراتژی محصول.',
    location: 'تهران',
    type: 'full-time',
    level: 'senior',
    salary: '۴۰-۶۰ میلیون تومان',
    skills: ['Product Strategy', 'Analytics', 'Roadmap'],
  },
  {
    companyName: 'کافه‌بازار',
    title: 'DevOps Engineer',
    description: 'AWS، Kubernetes، CI/CD. کار روی زیرساخت ابری.',
    location: 'دورکاری',
    type: 'remote',
    level: 'mid',
    salary: '۳۵-۵۰ میلیون تومان',
    skills: ['AWS', 'Kubernetes', 'Terraform'],
  },
  {
    companyName: 'دیوار',
    title: 'برنامه‌نویس موبایل',
    description: 'React Native یا Flutter. کار روی اپلیکیشن موبایل.',
    location: 'تهران',
    type: 'full-time',
    level: 'mid',
    salary: '۳۰-۴۵ میلیون تومان',
    skills: ['React Native', 'Flutter', 'TypeScript'],
  },
  {
    companyName: 'فیلیمو',
    title: 'تدوینگر ویدیو',
    description: 'تدوین ویدیو با Premiere Pro. کار روی محتوای سرگرمی.',
    location: 'تهران',
    type: 'full-time',
    level: 'mid',
    salary: '۲۰-۳۰ میلیون تومان',
    skills: ['Premiere Pro', 'After Effects', 'Video Editing'],
  },
]

async function clearAll() {
  console.log('🗑  پاک کردن داده‌های قبلی...')
  await prisma.application.deleteMany({})
  await prisma.userTask.deleteMany({})
  await prisma.userProgress.deleteMany({})
  await prisma.userMedal.deleteMany({})
  await prisma.userChallengeAttempt.deleteMany({})
  await prisma.userSkill.deleteMany({})
  await prisma.job.deleteMany({})
  await prisma.company.deleteMany({})
  await prisma.user.deleteMany({
    where: { role: { in: ['JOBSEEKER', 'COMPANY'] } },
  })
  console.log('✅ تمام داده‌ها پاک شد\n')
}

async function main() {
  console.log('🚀 شروع Seed جامع...\n')

  await clearAll()

  const hashedPassword = await bcrypt.hash('password123', 10)

  // ═══════════════════════════════════════════════
  // ۱. ساخت کارجوها
  // ═══════════════════════════════════════════════

  console.log('👥 ساخت کارجوها...\n')

  const createdJobseekers: Record<string, any> = {}

  for (const j of JOBSEEKERS) {
    const user = await prisma.user.create({
      data: {
        name: j.name,
        email: j.email,
        password: hashedPassword,
        role: 'JOBSEEKER',
        avatar: j.avatar,
        bio: j.bio,
        skills: JSON.stringify(j.skills),
      },
    })

    createdJobseekers[j.email] = user

    for (const stageOrder of j.completedStages) {
      const stage = await prisma.stage.findUnique({
        where: { order: stageOrder },
      })
      if (stage) {
        await prisma.userProgress.create({
          data: {
            userId: user.id,
            stageId: stage.id,
            completed: true,
            completedAt: new Date(),
          },
        })
      }
    }

    for (const stageOrder of j.medals) {
      const stage = await prisma.stage.findUnique({
        where: { order: stageOrder },
      })
      if (stage) {
        await prisma.userMedal.create({
          data: {
            userId: user.id,
            stageId: stage.id,
          },
        })
      }
    }

    for (const stageOrder of j.completedStages) {
      const stage = await prisma.stage.findUnique({
        where: { order: stageOrder },
        include: { tasks: true },
      })
      if (stage) {
        for (const task of stage.tasks) {
          await prisma.userTask.create({
            data: {
              userId: user.id,
              taskId: task.id,
              completed: true,
              completedAt: new Date(),
            },
          })
        }
      }
    }

    for (const skill of j.verifiedSkills) {
      await prisma.userSkill.create({
        data: {
          userId: user.id,
          skillName: skill.skillName,
          level: skill.level,
          score: skill.score,
          verified: true,
        },
      })
    }

    const allChallenges = await prisma.skillChallenge.findMany()
    for (const vs of j.verifiedSkills) {
      const challenge = allChallenges.find(
        (c) => c.skillName === vs.skillName
      )
      if (challenge) {
        await prisma.userChallengeAttempt.create({
          data: {
            userId: user.id,
            challengeId: challenge.id,
            score: vs.score,
            passed: true,
            answers: '[]',
          },
        })
      }
    }

    console.log(`  ✓ ${j.name} (${j.email})`)
  }

  // ═══════════════════════════════════════════════
  // ۲. ساخت شرکت‌ها
  // ═══════════════════════════════════════════════

  console.log('\n🏢 ساخت شرکت‌ها...\n')

  const createdCompanies: Record<string, any> = {}

  for (const c of COMPANIES) {
    const user = await prisma.user.create({
      data: {
        name: c.name,
        email: c.email,
        password: hashedPassword,
        role: 'COMPANY',
        avatar: c.logo,
      },
    })

    const company = await prisma.company.create({
      data: {
        userId: user.id,
        name: c.name,
        industry: c.industry,
        logo: c.logo,
        website: c.website,
        description: c.description,
        size: c.size,
        verified: true,
        featured: c.featured,
        foundedYear: (c as any).foundedYear,
        story: (c as any).story,
        whyGenZ: (c as any).whyGenZ,
        employeeQuote: (c as any).employeeQuote,
        employeeName: (c as any).employeeName,
        employeeRole: (c as any).employeeRole,
        ...c.perks,
      },
    })

    createdCompanies[c.name] = { user, company }

    console.log(`  ✓ ${c.name} (${c.email})`)
  }

  // ═══════════════════════════════════════════════
  // ۳. ساخت مشاغل
  // ═══════════════════════════════════════════════

  console.log('\n💼 ساخت مشاغل...\n')

  for (const j of JOBS) {
    const companyData = createdCompanies[j.companyName]
    if (!companyData) continue

    await prisma.job.create({
      data: {
        companyId: companyData.company.id,
        title: j.title,
        description: j.description,
        location: j.location,
        type: j.type,
        level: j.level,
        salary: j.salary,
        skills: JSON.stringify(j.skills),
        active: true,
      },
    })

    console.log(`  ✓ ${j.companyName}: ${j.title}`)
  }

  // ═══════════════════════════════════════════════
  // ۴. ساخت پیشنهادها
  // ═══════════════════════════════════════════════

  console.log('\n📨 ساخت پیشنهادها...\n')

  const applications = [
    {
      jobseekerEmail: 'sara@test.com',
      companyName: 'دیجی‌کالا',
      status: 'accepted',
      message:
        'سلام سارا! پروفایل و مهارت‌های اثبات‌شده‌ت خیلی خفن بود. به نظر می‌رسه برای تیم ما فیت باشی. دوست داریم بیشتر آشنا بشیم! 🚀',
    },
    {
      jobseekerEmail: 'sara@test.com',
      companyName: 'اسنپ',
      status: 'pending',
      message:
        'سلام! پروفایلت رو دیدم، وایب خوبی داشت. یه موقعیت شغلی متناسب با تو داریم. اگه علاقه‌مندی، جزئیات رو بفرستیم.',
    },
    {
      jobseekerEmail: 'amir@test.com',
      companyName: 'تپسی',
      status: 'accepted',
      message:
        'سلام امیر! طراحی‌هات رو دیدیم، خیلی باحال بودن. تیم ما دنبال یه طراح خلاق مثل توئه. بزن بریم! 🎨',
    },
    {
      jobseekerEmail: 'amir@test.com',
      companyName: 'دیجی‌کالا',
      status: 'pending',
      message:
        'سلام! پروفایل و مهارت‌های اثبات‌شده‌ت رو دیدیم. برای نقش UI/UX مناسب به نظر می‌رسی.',
    },
    {
      jobseekerEmail: 'ali@test.com',
      companyName: 'اسنپ',
      status: 'pending',
      message:
        'سلام علی! مهارت‌هات توی Node.js و PostgreSQL خیلی خوبه. یه موقعیت بک‌اند داریم که فکر می‌کنم بهت بیاد.',
    },
    {
      jobseekerEmail: 'negar@test.com',
      companyName: 'دیجی‌کالا',
      status: 'rejected',
      message:
        'سلام نگار! از اینکه به تیم ما علاقه نشون دادی ممنونیم، ولی فعلاً موقعیت متناسبی با پروفایل شما نداریم.',
    },
  ]

  for (const app of applications) {
    const jobseeker = createdJobseekers[app.jobseekerEmail]
    const companyData = createdCompanies[app.companyName]

    if (!jobseeker || !companyData) continue

    await prisma.application.create({
      data: {
        userId: jobseeker.id,
        companyId: companyData.company.id,
        status: app.status,
        message: app.message,
      },
    })

    console.log(
      `  ✓ ${jobseeker.name} ← ${app.companyName} (${app.status})`
    )
  }

  console.log('\n' + '═'.repeat(60))
  console.log('🎉 Seed جامع با موفقیت انجام شد!')
  console.log('═'.repeat(60))
  console.log('\n📊 آمار:')
  console.log(`   👥 ${JOBSEEKERS.length} کارجو`)
  console.log(`   🏢 ${COMPANIES.length} شرکت`)
  console.log(`   💼 ${JOBS.length} شغل`)
  console.log(`   📨 ${applications.length} پیشنهاد`)

  console.log('\n🔑 اطلاعات ورود:')
  console.log('   ─────────────────────────────────────────')
  console.log('   👩‍💻 کارجویان: sara@test.com / password123')
  console.log('   🏢 شرکت‌ها: company-digikala@test.com / password123')
  console.log('   ─────────────────────────────────────────')
  console.log('\n🎯 حالا برو به http://localhost:3000')
}

main()
  .catch((e) => {
    console.error('❌ خطا:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })