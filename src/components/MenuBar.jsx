import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const menuItems = [
  { name: 'Results', id: 'achievements' },
  { name: 'Our Approach', id: 'learning' },
  { name: 'Teaching', id: 'youtube' },
  { name: 'Contact', id: 'contact' },
]

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Highlight the menu item for the section currently in view
  useEffect(() => {
    const ids = ['hero', ...menuItems.map((m) => m.id)]
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === 'hero' ? null : entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const close = () => mq.matches && setIsOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur transition-[border-color,box-shadow] duration-500 ${
        scrolled || isOpen ? 'border-slate-200 shadow-sm' : 'border-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <img
            src="/images/projection logo-01.png"
            alt=""
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
          />
          <span className="truncate text-base font-bold tracking-tight text-brand-800 sm:text-lg">
            Projection Academy
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative py-1 text-[15px] font-medium transition-colors duration-300 hover:text-brand-700 ${
                active === item.id ? 'text-brand-700' : 'text-slate-600'
              }`}
            >
              {item.name}
              {active === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a href="#contact" className="btn-primary !px-4 !py-2 !text-sm transition-[background-color,transform] hover:-translate-y-0.5">
            Enquire now
          </a>
        </div>

        <button
          onClick={() => setIsOpen((open) => !open)}
          className="-mr-2 rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-brand-700 to-accent"
        style={{ scaleX: progress }}
      />

      {isOpen && (
        <div className="animate-fade-in-up border-t border-slate-200 bg-white md:hidden">
          <div className="container-page flex flex-col py-3">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium hover:bg-brand-50 hover:text-brand-800 ${
                  active === item.id ? 'bg-brand-50 text-brand-800' : 'text-slate-700'
                }`}
              >
                {item.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary mt-2 w-full">
              Enquire now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default MenuBar
