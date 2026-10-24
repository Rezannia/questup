import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 بررسی کاربران COMPANY...\n')

  const companyUsers = await prisma.user.findMany({
    where: { role: 'COMPANY' },
    include: { company: true },
  })

  if (companyUsers.length === 0) {
    console.log('❌ هیچ کاربر COMPANY پیدا نشد.')
    console.log('\n📋 اول ثبت‌نام کن:')
    console.log('1. npm run dev')
    console.log('2. برو به http://localhost:3000/register')
    console.log('3. نقش «شرکت» انتخاب کن')
    console.log('4. نام: شرکت تست، ایمیل: company@test.com، پسورد: password123')
    return
  }

  for (const user of companyUsers) {
    if (user.company) {
      console.log(`✅ ${user.email} — پروفایل Company داره (${user.company.name})`)
    } else {
      console.log(`⚠️  ${user.email} — پروفایل Company نداره. ساخت...`)

      const company = await prisma.company.create({
        data: {
          userId: user.id,
          name: user.name,
          industry: 'فناوری اطلاعات',
        },
      })

      console.log(`✅ پروفایل Company ساخته شد: ${company.name}`)
    }
  }

  console.log('\n🎉 تمام!')
}

main()
  .catch((e) => {
    console.error('❌ خطا:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })