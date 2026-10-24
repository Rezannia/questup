'use client'

interface RoleSelectorProps {
  value: 'JOBSEEKER' | 'COMPANY'
  onChange: (role: 'JOBSEEKER' | 'COMPANY') => void
}

const roles = [
  {
    value: 'JOBSEEKER' as const,
    title: 'کارجو',
    description: 'دنبال فرصت شغلی می‌گردم',
    icon: '🎯',
  },
  {
    value: 'COMPANY' as const,
    title: 'شرکت',
    description: 'دنبال استعداد می‌گردم',
    icon: '🏢',
  },
]

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {roles.map((role) => {
        const selected = value === role.value
        return (
          <button
            key={role.value}
            type="button"
            onClick={() => onChange(role.value)}
            className={`
              relative p-4 rounded-xl2 border text-right transition-all duration-200
              ${
                selected
                  ? 'border-violet bg-violet/5 shadow-soft'
                  : 'border-line bg-paper hover:border-violet/30 hover:bg-bg'
              }
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{role.icon}</span>
              {selected && (
                <div className="w-5 h-5 rounded-full bg-violet flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
            <p className="font-bold text-ink mb-1">{role.title}</p>
            <p className="text-xs text-muted">{role.description}</p>
          </button>
        )
      })}
    </div>
  )
}
