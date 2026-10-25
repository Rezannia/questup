import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "co@example.com"; // ← ایمیل خود را وارد کنید
  const newPassword = "123456"; // ← رمز جدید

  const hashedPassword = await hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword, role: "ADMIN" },
  });

  console.log(`✅ کاربر ${user.email} به‌روزرسانی شد.`);
  console.log(`نقش: ${user.role}`);
  console.log(`رمز جدید: ${newPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });