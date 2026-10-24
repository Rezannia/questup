'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-9 h-9 rounded-xl2 bg-primary flex items-center justify-center text-lg"
          >
            🎮
          </motion.div>
          <span className="font-extrabold text-lg text-foreground group-hover:text-primary transition-colors">
            کوئست‌آپ
          </span>
        </Link>

        {/* دسکتاپ */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ویژگی‌ها
          </a>
          <a
            href="#how"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            چطور کار می‌کنه
          </a>
          <a
            href="#stats"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            آمار
          </a>
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            درباره ما
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              ورود
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-sm hover:shadow-lg"
            >
              شروع رایگان
            </Link>
          </div>
        </nav>

        {/* دکمه موبایل */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border hover:border-primary/30 transition-colors"
          aria-label="منو"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* منوی موبایل */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-4 space-y-3"
            >
              <a
                href="#features"
                className="block text-sm text-foreground py-2 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                ویژگی‌ها
              </a>
              <a
                href="#how"
                className="block text-sm text-foreground py-2 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                چطور کار می‌کنه
              </a>
              <a
                href="#stats"
                className="block text-sm text-foreground py-2 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                آمار
              </a>
              <Link
                href="/about"
                className="block text-sm text-foreground py-2 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                درباره ما
              </Link>

              <div className="pt-3 border-t border-border space-y-2">
                <Link
                  href="/login"
                  className="block text-center px-4 py-2.5 text-sm font-semibold text-foreground border border-border rounded-full hover:border-primary/30 transition-colors"
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  className="block text-center px-4 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:opacity-90 transition-all"
                >
                  شروع رایگان
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}