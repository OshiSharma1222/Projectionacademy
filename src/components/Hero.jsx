import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import React from 'react'
import FloatingIcons from './FloatingIcons'
import { EASE } from './ui/reveal'

const HEADLINE = 'JEE Main, Class 11–12 Science and Class 9–10 CBSE coaching'

const Hero = () => {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  // Hero content drifts down slightly slower than the page as you scroll away,
  // and the image eases back from its top edge (so it never covers the text).
  const contentY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 60])
  const imageScale = useTransform(scrollY, [0, 700], [1, reduce ? 1 : 0.95])

  const enter = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, ease: EASE, delay },
        }

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 to-white pb-14 pt-20 sm:pb-20 sm:pt-24 lg:pt-28">
      {/* Slow-drifting soft shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-300/50 blur-3xl sm:h-96 sm:w-96" />
        <div className="hero-blob hero-blob--alt absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-accent/30 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="hero-blob absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-brand-200/50 blur-3xl [animation-duration:14s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(24,70,145,0.09)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
        <FloatingIcons />
      </div>

      <motion.div className="container-page relative" style={{ y: contentY }}>
        <motion.div
          className="origin-top"
          style={{ scale: imageScale }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <img
            src="/images/HEROSECTION.png"
            fetchpriority="high"
            alt="Projection Academy: from small sparks to big futures"
            className="h-auto w-full rounded-xl border border-white shadow-[0_30px_60px_-30px_rgba(24,70,145,0.45)] sm:rounded-2xl"
          />
        </motion.div>

        <div className="relative mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[2.1rem]">
              {HEADLINE.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="mr-[0.25em] inline-block"
                  initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.35 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p {...enter(1.0)} className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
              Weekly tests, one-on-one mentorship and clear concepts, in Yamuna Vihar, Delhi.
            </motion.p>
          </div>
          <motion.div {...enter(1.15)} className="flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary group">
              Contact us
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a href="tel:+919599740029" className="btn-secondary group">
              <Phone className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12" />
              +91 95997 40029
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
