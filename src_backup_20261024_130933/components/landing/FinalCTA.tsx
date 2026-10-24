'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-primary via-[#008A8A] to-[#004D4D] rounded-3xl p-8 sm:p-12 text-center overflow-hidden shadow-2xl"
        >
          {/* تزئینات */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-8 left-12 text-4xl opacity-30 animate-bounce">✨</div>
          <div className="absolute bottom-8 right-12 text-4xl opacity-30 animate-pulse">🎮</div>

          <div className="relative z-10">
            <div className="text-5xl mb-4">👑</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-4">
              آماده‌ای قهرمان مسیر خودت باشی؟
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-lg mx-auto">
              همین حالا شروع کن، اولین مدالت رو بگیر و مسیرت رو به سمت شغل رویایی
              لِتس‌گو کن.
            </p>
            
            <Link href="/register">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 shadow-xl hover:scale-105 transition-transform"
              >
                🎯 شروع ماجراجویی
              </Button>
            </Link>
            
            <p className="text-primary-foreground/60 text-xs mt-4">
              رایگان، بدون کارت بانکی، همین الان!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}