'use client'

import { motion } from 'framer-motion'

const EPISODE_URL = 'https://open.spotify.com/episode/03bOMMJSROTIY7lfGLccXn'
const EMBED_URL = 'https://open.spotify.com/embed/episode/03bOMMJSROTIY7lfGLccXn?utm_source=generator&theme=0'

export function SpotifyPlayer() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* پس‌زمینه تزئینی */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1DB954]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* عنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-paper border border-line rounded-full text-xs font-semibold text-muted mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
            پادکست کوئست‌کست
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">
            همین الان <span className="text-[#1DB954]">گوش بده</span> 🎧
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
            تریلر کوئست‌کست — پادکستی که مسیر شغلیت رو گیم می‌کنه. 
            از رزومه تا آفر، همه‌چیز رو برات گفتیم.
          </p>
        </motion.div>

        {/* پلیر Spotify */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-paper rounded-3xl border-2 border-line p-4 sm:p-6 shadow-soft hover:shadow-xl transition-all"
        >
          {/* هدر پلیر */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl2 bg-[#1DB954] flex items-center justify-center text-2xl shadow-lg">
              🎙️
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted">پادکست</p>
              <p className="font-extrabold text-ink truncate">
                تریلر کوئست‌کست
              </p>
            </div>
            <a
              href={EPISODE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-[#1DB954] text-white rounded-full text-xs font-bold hover:bg-[#1aa34a] transition-all"
            >
              <span>باز کردن در Spotify</span>
              <span>↗</span>
            </a>
          </div>

          {/* iframe */}
          <div className="rounded-2xl overflow-hidden bg-bg">
            <iframe
              style={{ borderRadius: '12px' }}
              src={EMBED_URL}
              width="100%"
              height="232"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="QuestCast Trailer"
            />
          </div>

          {/* دکمه‌های پایین */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <a
              href={EPISODE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#1DB954] text-white rounded-xl2 font-bold text-sm hover:bg-[#1aa34a] transition-all text-center shadow-soft"
            >
              🎧 گوش بده در Spotify
            </a>
            <a
              href="https://castbox.fm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-paper border-2 border-line text-ink rounded-xl2 font-bold text-sm hover:border-[#1DB954]/30 transition-all text-center"
            >
              📻 Castbox (به زودی)
            </a>
          </div>
        </motion.div>

        {/* پیام پایین */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xs text-muted mt-6"
        >
          🎧 اپیزودهای جدید هر جمعه — عضو شو تا از دست ندی
        </motion.p>
      </div>
    </section>
  )
}
