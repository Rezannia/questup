'use client'

interface OfferTemplatesProps {
  onSelect: (message: string) => void
}

const TEMPLATES = [
  {
    icon: '🔥',
    title: 'دعوت به مصاحبه',
    color: 'bg-primary',
    message:
      'سلام رفیق! پروفایلت رو دیدم، خیلی خفن بود! 😎 مهارت‌هایی که اثبات کردی واقعاً گنگه. به نظر می‌رسه برای تیم ما فیت باشی. یه جلسه ۳۰ دقیقه‌ای بذاریم و بیشتر آشنا بشیم؟ بزن بریم! 🚀',
  },
  {
    icon: '💼',
    title: 'پیشنهاد شغلی',
    color: 'from-amber to-cherry',
    message:
      'سلام! وایب پروفایلت خیلی خوب بود. 😍 با توجه به مهارت‌هایی که اثبات کردی، معتقدیم که می‌تونی عضو خفنی برای تیم ما باشی. یه موقعیت شغلی دقیقاً متناسب با تو داریم. اگه علاقه‌مندی، جزئیات رو برات بفرستیم. حق بده! 🤝',
  },
  {
    icon: '🎯',
    title: 'همکاری پروژه‌ای',
    color: 'from-lime to-lime-deep',
    message:
      'سلام! یه پروژه کوتاه‌مدت داریم که فکر می‌کنیم مهارت‌هات کاملاً با نیازمون مچه. اگه پایه‌ای برای همکاری پروژه‌ای، بزن بریم جزئیات رو با هم بررسی کنیم. خیلی باحال می‌شه! 💪',
  },
  {
    icon: '🌟',
    title: 'تشویق و پیگیری',
    color: 'from-pink to-rose-500',
    message:
      'سلام! پروفایل و مدال‌هات رو دنبال می‌کنیم، داری ترکوندی! 🔥 فعلاً موقعیت فعالی نداریم، ولی دوست داریم در ارتباط بمونیم. به‌زودی یه فرصت فیت با تو خواهیم داشت. تا اون موقع، ادامه بده! 💫',
  },
  {
    icon: '💡',
    title: 'دعوت به چالش',
    color: 'from-cyan-500 to-blue-500',
    message:
      'سلام! به نظر می‌رسه مهارت‌هات با نیازهای تیم ما هماهنگه. 🎯 دوست داریم یه چالش کوچیک طراحی کنیم تا بیشتر با سبک کارت آشنا بشیم. اگه موافقی، بزن بریم جزئیات رو برات بفرستیم. خیلی کنجکاویم ببینیم چی کار می‌کنی! 😎',
  },
  {
    icon: '🤝',
    title: 'دعوت به شبکه‌سازی',
    color: 'from-indigo-500 to-purple-600',
    message:
      'سلام! ما در حال ساختن تیمی هستیم که به رشد و خلاقیت اهمیت می‌ده. پروفایل تو توجه ما رو جلب کرد. 🌟 دوست داریم یه جلسه دوستانه بذاریم و درباره فرصت‌های آینده گپ بزنیم. بزن بریم! ☕',
  },
  {
    icon: '🎮',
    title: 'حس گیمینگ',
    color: 'from-purple-500 to-pink-500',
    message:
      'سلام قهرمان! 🎮 پروفایلت رو دیدم، انگار یه لِوِل بالا رفتی! مهارت‌های اثبات‌شده‌ت خیلی خفنه. ما هم دنبال یه پلیر مثل تو هستیم که تیممون رو ببره بالا. اگه پایه‌ای، بزن بریم یه گپ بزنیم! 🚀',
  },
  {
    icon: '⚡',
    title: 'خیلی صمیمی',
    color: 'from-yellow-400 to-orange-500',
    message:
      'سلام! یه وایب خوبی از پروفایلت گرفتم. ⚡ واقعاً خفنه که این‌قدر روی خودت کار کردی. ما یه موقعیت داریم که فکر می‌کنم بهت میاد. اگه علاقه‌مندی، یه گپ بزنیم. جدی می‌گم، باحال می‌شه! 😎',
  },
]

export function OfferTemplates({ onSelect }: OfferTemplatesProps) {
  return (
    <div className="mb-3">
      <p className="text-xs font-bold text-foreground mb-2">
        🎯 متن‌های آماده (با لحن خودی!)
      </p>
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {TEMPLATES.map((template) => (
          <button
            key={template.title}
            type="button"
            onClick={() => onSelect(template.message)}
            className="text-right p-2.5 rounded-lg border border-border bg-background hover:border-primary/30 hover:bg-card transition-all group active:scale-95"
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className={`w-7 h-7 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center text-sm flex-shrink-0`}
              >
                {template.icon}
              </div>
              <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                {template.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
