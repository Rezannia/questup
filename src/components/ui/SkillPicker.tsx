'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SkillPickerProps {
  value: string[]
  onChange: (skills: string[]) => void
  maxSkills?: number
}

const SKILL_CATEGORIES = [
  {
    title: 'برنامه‌نویسی و فناوری',
    emoji: '💻',
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Vue', 'Next.js',
      'Node.js', 'Python', 'Django', 'PHP', 'Laravel',
      'Java', 'Spring', 'C#', '.NET', 'Go', 'Rust',
      'HTML', 'CSS', 'Tailwind', 'Sass',
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
      'Git', 'Docker', 'Kubernetes', 'AWS', 'Linux',
      'React Native', 'Flutter', 'Swift', 'Kotlin',
    ],
  },
  {
    title: 'طراحی و خلاقیت',
    emoji: '🎨',
    skills: [
      'Figma', 'Adobe XD', 'Sketch',
      'Photoshop', 'Illustrator', 'InDesign',
      'UI Design', 'UX Design', 'UX Research',
      'Motion Design', 'After Effects',
      '3D Modeling', 'Blender',
      'Brand Identity', 'Typography', 'Color Theory',
      'Product Design', 'Design System', 'Prototyping',
    ],
  },
  {
    title: 'بازاریابی و فروش',
    emoji: '📣',
    skills: [
      'SEO', 'SEM', 'Google Ads',
      'Instagram Marketing', 'Content Marketing',
      'Email Marketing', 'Copywriting',
      'Social Media Management', 'Influencer Marketing',
      'Analytics', 'Google Analytics', 'Hotjar',
      'CRM', 'Sales', 'Negotiation',
      'Email Campaigns', 'Growth Hacking',
      'Marketing Strategy', 'Brand Management',
    ],
  },
  {
    title: 'مدیریت و کسب‌وکار',
    emoji: '💼',
    skills: [
      'Product Management', 'Project Management',
      'Agile', 'Scrum', 'Kanban', 'Jira',
      'Leadership', 'Team Management',
      'Business Strategy', 'Business Analytics',
      'Data Analysis', 'Excel', 'SQL',
      'Finance', 'Accounting', 'Budgeting',
      'HR Management', 'Recruiting', 'Coaching',
      'Negotiation', 'Communication',
    ],
  },
  {
    title: 'محتوا و رسانه',
    emoji: '🎬',
    skills: [
      'Video Editing', 'Premiere Pro', 'Final Cut',
      'Photography', 'Lightroom',
      'Podcasting', 'Audio Editing',
      'Content Writing', 'Blog Writing',
      'Storytelling', 'Scriptwriting',
      'Youtube', 'TikTok', 'Instagram',
      'Live Streaming', 'Twitch',
    ],
  },
  {
    title: 'مهارت‌های نرم',
    emoji: '🧠',
    skills: [
      'Communication', 'Teamwork', 'Problem Solving',
      'Critical Thinking', 'Time Management',
      'Adaptability', 'Creativity', 'Empathy',
      'Public Speaking', 'Presentation',
      'Emotional Intelligence', 'Leadership',
      'Resilience', 'Self-Motivation',
      'Learning Agility', 'Curiosity',
    ],
  },
]

export function SkillPicker({
  value,
  onChange,
  maxSkills = 10,
}: SkillPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  function toggleSkill(skill: string) {
    if (value.includes(skill)) {
      onChange(value.filter((s) => s !== skill))
    } else {
      if (value.length >= maxSkills) return
      onChange([...value, skill])
    }
  }

  const allFilteredSkills = SKILL_CATEGORIES.map((cat) => ({
    ...cat,
    skills: cat.skills.filter((s) =>
      s.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.skills.length > 0)

  return (
    <div>
      {/* مهارت‌های انتخاب‌شده */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((skill) => (
            <motion.span
              key={skill}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/30 rounded-full text-xs font-bold"
            >
              {skill}
              <button
                type="button"
                onClick={() => toggleSkill(skill)}
                className="hover:text-destructive transition-colors"
              >
                ✕
              </button>
            </motion.span>
          ))}
        </div>
      )}

      {/* دکمه افزودن */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={value.length >= maxSkills}
        className="w-full py-2.5 bg-background border-2 border-dashed border-border rounded-lg text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span className="text-lg">+</span>
        <span>
          {value.length >= maxSkills
            ? `حداکثر ${maxSkills} مهارت`
            : 'افزودن مهارت'}
        </span>
      </button>

      <p className="text-xs text-muted-foreground mt-1.5">
        {value.length} / {maxSkills} مهارت انتخاب شده
      </p>

      {/* مودال انتخاب */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50  z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-card rounded-lg border border-border shadow-lg max-w-2xl w-full max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* هدر */}
              <div className="p-5 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-foreground">
                      مهارت‌هات رو انتخاب کن 🎯
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {value.length} / {maxSkills} انتخاب شده
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-line transition-all"
                  >
                    ✕
                  </button>
                </div>

                {/* جستجو */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="🔍 جستجوی مهارت..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* لیست مهارت‌ها */}
              <div className="flex-1 overflow-y-auto p-5">
                {allFilteredSkills.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-3">🔍</div>
                    <p className="text-sm text-muted-foreground">
                      مهارتی با «{search}» پیدا نشد
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {allFilteredSkills.map((cat) => (
                      <div key={cat.title}>
                        <h4 className="text-sm font-extrabold text-foreground mb-2 flex items-center gap-2">
                          <span>{cat.emoji}</span>
                          <span>{cat.title}</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((skill) => {
                            const isSelected = value.includes(skill)
                            const isDisabled =
                              !isSelected && value.length >= maxSkills

                            return (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => toggleSkill(skill)}
                                disabled={isDisabled}
                                className={`
                                  px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2
                                  ${
                                    isSelected
                                      ? 'bg-primary text-white border-primary'
                                      : isDisabled
                                      ? 'bg-background text-muted-foreground border-border opacity-40 cursor-not-allowed'
                                      : 'bg-background text-foreground border-border hover:border-primary hover:text-primary'
                                  }
                                `}
                              >
                                {isSelected && '✓ '}
                                {skill}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* فوتر */}
              <div className="p-4 border-t border-border bg-background/50">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    {value.length === 0
                      ? 'هنوز مهارتی انتخاب نکردی'
                      : `${value.length} مهارت انتخاب شده`}
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-all"
                  >
                    ✅ تایید و بستن
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
