'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80  border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🎮</span>
          <span className="font-bold text-lg text-foreground">کوئست‌آپ</span>
        </Link>

        {/* دسکتاپ */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">ویژگی‌ها</a>
          <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition-colors">چطور کار می‌کنه</a>
          <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">آمار</a>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">درباره ما</Link>
          <div className="flex items-center gap-3 pr-8 border-r border-border">
            <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">ورود</Link>
            <Link href="/register" className="px-5 py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:opacity-90 transition-opacity">شروع رایگان</Link>
          </div>
        </nav>

        {/* دکمه موبایل */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center"
          aria-label="منو"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* منوی موبایل */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-4">
            <a href="#features" className="block text-sm text-foreground" onClick={() => setMenuOpen(false)}>ویژگی‌ها</a>
            <a href="#how" className="block text-sm text-foreground" onClick={() => setMenuOpen(false)}>چطور کار می‌کنه</a>
            <a href="#stats" className="block text-sm text-foreground" onClick={() => setMenuOpen(false)}>آمار</a>
            <Link href="/about" className="block text-sm text-foreground" onClick={() => setMenuOpen(false)}>درباره ما</Link>
            <div className="pt-4 border-t border-border space-y-3">
              <Link href="/login" className="block text-center py-2.5 text-sm font-medium text-foreground border border-border rounded-md">ورود</Link>
              <Link href="/register" className="block text-center py-2.5 bg-primary text-primary-foreground rounded-md font-medium text-sm">شروع رایگان</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}