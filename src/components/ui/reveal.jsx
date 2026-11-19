import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export const EASE = [0.22, 1, 0.36, 1]

// Fade-up when an element scrolls into view. Runs once.
export function Reveal({ children, delay = 0, className, as = 'div', y = 40 }) {
  const reduce = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Component>
  )
}

// Brand-blue word with an underline that draws in from the left.
export function Accent({ children }) {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-block text-brand-700">
      {children}
      <motion.span
        aria-hidden
        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-accent"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
      />
    </span>
  )
}

// Counts "200+" / "98%" up from zero the first time it's seen.
export function CountUp({ value, duration = 2.2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotion()
  const match = String(value).match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const [n, setN] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!inView || reduce || !match) return
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span>{value}</span>
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {match[2]}
    </span>
  )
}

function Eyebrow({ children, centered }) {
  const reduce = useReducedMotion()
  const line = (
    <motion.span
      aria-hidden
      className={`h-px w-8 bg-accent ${centered ? '' : 'origin-left'}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
    />
  )
  return (
    <Reveal as="p" className={`eyebrow flex items-center gap-3 ${centered ? 'justify-center' : ''}`} y={12}>
      {centered && <span className="flex origin-right">{line}</span>}
      {children}
      {line}
    </Reveal>
  )
}

export function SectionHeader({ eyebrow, title, lead, align = 'center' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <Eyebrow centered={align === 'center'}>{eyebrow}</Eyebrow>}
      <Reveal as="h2" className="section-title" delay={0.08}>
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" className="section-lead" delay={0.16}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}
