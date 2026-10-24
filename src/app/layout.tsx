import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "کوئست‌آپ | مسیر شغلی با حال‌وهوای خودت",
  description: "پلتفرم گیم‌فای‌شده کاریابی برای نسل Z",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="bg-bg text-ink font-vazir antialiased">
        {children}
      </body>
    </html>
  );
}