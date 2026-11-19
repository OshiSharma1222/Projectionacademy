import { Atom, BookOpen, Calculator, FlaskConical, GraduationCap, Lightbulb, Pi, Sigma } from 'lucide-react'
import React from 'react'

// Subject icons that bob gently in the side margins of the hero (wide screens only,
// where there is empty space beside the image).
const icons = [
  { Icon: Atom, pos: 'left-[2%] top-[16%]', size: 'h-12 w-12', dur: 7, delay: 0 },
  { Icon: Sigma, pos: 'left-[4%] top-[64%]', size: 'h-10 w-10', dur: 9, delay: 1.2 },
  { Icon: FlaskConical, pos: 'right-[4%] top-[14%]', size: 'h-11 w-11', dur: 8, delay: 0.6 },
  { Icon: Pi, pos: 'right-[2.5%] top-[52%]', size: 'h-10 w-10', dur: 10, delay: 2 },
  { Icon: Lightbulb, pos: 'right-[1.5%] bottom-[14%]', size: 'h-11 w-11', dur: 7.5, delay: 1.6 },
  { Icon: Calculator, pos: 'left-[1.5%] bottom-[12%]', size: 'h-10 w-10', dur: 8.5, delay: 0.3 },
  { Icon: BookOpen, pos: 'left-[2%] top-[40%]', size: 'h-9 w-9', dur: 9.5, delay: 2.4 },
  { Icon: GraduationCap, pos: 'right-[3%] top-[33%]', size: 'h-10 w-10', dur: 8, delay: 1 },
]

const FloatingIcons = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    {icons.map(({ Icon, pos, size, dur, delay }, i) => (
      <span
        key={i}
        className={`float-icon absolute ${pos} hidden min-[1360px]:flex items-center justify-center rounded-2xl border border-white/80 bg-white/70 p-2.5 text-brand-600 shadow-[0_10px_30px_-12px_rgba(24,70,145,0.35)] backdrop-blur-sm`}
        style={{ animationDuration: `${dur}s`, animationDelay: `-${delay}s` }}
      >
        <Icon className={`${size} p-1.5`} strokeWidth={1.6} />
      </span>
    ))}
  </div>
)

export default FloatingIcons
