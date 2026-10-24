import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QuestUp — مسیر شغلی، ولی با حال‌وهوای خودت',
  description: 'مسیر شغلی تعاملی با گیم‌فیکیشن. مرحله به مرحله پیش برو، مدال بگیر و به شرکت‌های خفن وصل شو.',
}

export const viewport: Viewport = {
  themeColor: '#1e3a8a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  )
}
