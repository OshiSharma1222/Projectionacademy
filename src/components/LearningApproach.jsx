import { ClipboardCheck, Target, UserRound } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'
import { Accent, EASE, Reveal, SectionHeader } from './ui/reveal'

const approaches = [
  {
    icon: UserRound,
    title: 'One-on-one mentorship',
    description: "Personal guidance tailored to each student's learning style and goals.",
  },
  {
    icon: ClipboardCheck,
    title: 'Weekly tests',
    description: 'Regular assessments to track progress and spot the topics that need more work.',
  },
  {
    icon: Target,
    title: 'Goal-oriented learning',
    description: 'A structured curriculum built around specific academic and career objectives.',
  },
]

const LearningApproach = () => {
  const reduce = useReducedMotion()
  return (
    <section id="learning" className="section bg-white">
      <div className="container-page">
        <SectionHeader
          eyebrow="Our approach"
          title={
            <>
              The <Accent>environment</Accent> we provide
            </>
          }
          lead="Proven methods and personal attention, so every student knows where they stand and what to do next."
        />

        <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-3 lg:mt-16">
          {approaches.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.15}>
              <div className="card group relative h-full overflow-hidden p-6 sm:p-8">
              <motion.span
                className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-brand-700 to-accent"
                aria-hidden
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.4 + i * 0.15 }}
              />
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                  <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="text-sm font-semibold text-slate-300 transition-colors duration-500 group-hover:text-accent">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900 sm:text-xl">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LearningApproach
