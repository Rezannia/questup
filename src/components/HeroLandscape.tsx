'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HeroLandscapeProps {
  children: ReactNode
  variant?: 'violet' | 'amber' | 'lime' | 'cherry'
}

const variants = {
  violet: {
    skyFrom: '#1e3a8a',
    skyTo: '#7c9ad9',
    mountainBack: '#3b5ba9',
    mountainMid: '#2a4a8a',
    mountainFront: '#16306e',
    sun: '#f4c95d',
  },
  amber: {
    skyFrom: '#a8324a',
    skyTo: '#f4c95d',
    mountainBack: '#c98a7a',
    mountainMid: '#a86a5a',
    mountainFront: '#8a4a3a',
    sun: '#fffdf7',
  },
  lime: {
    skyFrom: '#6f7f45',
    skyTo: '#b8c48e',
    mountainBack: '#8b9d5a',
    mountainMid: '#6f7f45',
    mountainFront: '#4a5a2a',
    sun: '#f4c95d',
  },
  cherry: {
    skyFrom: '#8a2038',
    skyTo: '#c98a7a',
    mountainBack: '#a8324a',
    mountainMid: '#8a2038',
    mountainFront: '#5a1028',
    sun: '#fffdf7',
  },
}

export function HeroLandscape({ children, variant = 'violet' }: HeroLandscapeProps) {
  const v = variants[variant]

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`sky-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={v.skyFrom} />
              <stop offset="100%" stopColor={v.skyTo} />
            </linearGradient>

            <radialGradient id={`sun-${variant}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={v.sun} stopOpacity="1" />
              <stop offset="50%" stopColor={v.sun} stopOpacity="0.5" />
              <stop offset="100%" stopColor={v.sun} stopOpacity="0" />
            </radialGradient>

            <linearGradient id={`mback-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={v.mountainBack} stopOpacity="0.9" />
              <stop offset="100%" stopColor={v.mountainBack} stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id={`mmid-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={v.mountainMid} />
              <stop offset="100%" stopColor={v.mountainMid} stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id={`mfront-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={v.mountainFront} />
              <stop offset="100%" stopColor={v.mountainFront} />
            </linearGradient>

            <linearGradient id={`fade-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="60%" stopColor="#f5f1e8" stopOpacity="0" />
              <stop offset="100%" stopColor="#f5f1e8" stopOpacity="1" />
            </linearGradient>
          </defs>

          <rect width="1440" height="800" fill={`url(#sky-${variant})`} />

          {[...Array(40)].map((_, i) => (
            <motion.circle
              key={i}
              cx={(i * 137.5) % 1440}
              cy={(i * 73.7) % 300}
              r={((i * 13) % 15) / 10 + 0.5}
              fill="#fffdf7"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: 2 + ((i * 7) % 30) / 10,
                repeat: Infinity,
                delay: ((i * 3) % 20) / 10,
              }}
            />
          ))}

          <circle cx="1100" cy="220" r="200" fill={`url(#sun-${variant})`} opacity="0.6" />
          <motion.circle
            cx="1100"
            cy="220"
            r="60"
            fill={v.sun}
            animate={{ r: [60, 65, 60], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.g
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            opacity="0.3"
          >
            <ellipse cx="300" cy="180" rx="120" ry="30" fill="#fffdf7" />
            <ellipse cx="380" cy="160" rx="90" ry="25" fill="#fffdf7" />
            <ellipse cx="220" cy="170" rx="80" ry="22" fill="#fffdf7" />
          </motion.g>

          <motion.g
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            opacity="0.25"
          >
            <ellipse cx="800" cy="140" rx="100" ry="25" fill="#fffdf7" />
            <ellipse cx="870" cy="125" rx="70" ry="20" fill="#fffdf7" />
          </motion.g>

          <path
            d="M 0 500 L 150 400 L 300 480 L 450 320 L 600 440 L 750 360 L 900 460 L 1050 340 L 1200 420 L 1350 380 L 1440 460 L 1440 800 L 0 800 Z"
            fill={`url(#mback-${variant})`}
          />

          <path
            d="M 0 600 L 200 480 L 380 560 L 550 420 L 720 540 L 900 460 L 1080 560 L 1250 480 L 1440 580 L 1440 800 L 0 800 Z"
            fill={`url(#mmid-${variant})`}
          />

          <path
            d="M 0 700 L 250 580 L 450 660 L 700 540 L 950 660 L 1200 580 L 1440 680 L 1440 800 L 0 800 Z"
            fill={`url(#mfront-${variant})`}
          />

          <rect width="1440" height="800" fill={`url(#fade-${variant})`} />
        </svg>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
