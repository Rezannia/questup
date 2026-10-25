import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@questup.ir";
  const password = "admin123456";
  const name = "ادمین کوئست‌آپ";

  // بررسی وجود کاربر
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    // به‌روزرسانی رمز و نقش
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        role: "ADMIN",
        name,
      },
    });
    console.log(`✅ کاربر ${user.email} به‌روزرسانی شد.`);
    console.log(`نقش: ${user.role}`);
    console.log(`رمز جدید: ${password}`);
  } else {
    // ساخت کاربر جدید
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "ADMIN",
      },
    });
    console.log(`✅ کاربر ${user.email} ساخته شد.`);
    console.log(`نقش: ${user.role}`);
    console.log(`رمز: ${password}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());