import { CheckCircle, Instagram, Loader2, Mail, MapPin, Phone, Send, Youtube } from 'lucide-react'
import React, { useState } from 'react'
import { Accent, Reveal, SectionHeader } from './ui/reveal'

const contactItems = [
  {
    icon: MapPin,
    label: 'Address',
    content: (
      <>
        C7/247, Block C, Yamuna Vihar
        <br />
        Shahdara, New Delhi 110053
      </>
    ),
  },
  {
    icon: Phone,
    label: 'Phone',
    content: (
      <a href="tel:+919599740029" className="hover:text-brand-700">
        +91 95997 40029
      </a>
    ),
  },
  {
    icon: Mail,
    label: 'Email',
    content: (
      <a href="mailto:academyprojection@gmail.com" className="break-all hover:text-brand-700">
        academyprojection@gmail.com
      </a>
    ),
  },
]

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Request failed')

      setStatus('sent')
      setFormData({ name: '', email: '', message: '', company: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage(error.message && error.message !== 'Failed to fetch' && error.message !== 'Request failed' ? error.message : '')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section bg-white">
      <div className="container-page">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Get in <Accent>touch</Accent>
            </>
          }
          lead="Ready to start your journey with Projection Academy? Send us a message or give us a call."
        />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-5 lg:gap-12">
          {/* Contact info */}
          <Reveal className="lg:col-span-2">
            <ul className="space-y-3">
              {contactItems.map(({ icon: Icon, label, content }) => (
                <li key={label} className="card group flex items-start gap-4 p-4 sm:p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                    <p className="mt-1 leading-relaxed text-slate-600">{content}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-900">Follow us</p>
              <div className="mt-3 flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-[transform,background-color,border-color,color] duration-500 hover:-translate-y-1 hover:border-brand-700 hover:bg-brand-700 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.12} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(24,70,145,0.3)] sm:p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">Send us a message</h3>
              <p className="mt-1 text-sm text-slate-600">Tell us a little about the student and we'll get back to you.</p>

              {/* Honeypot for bots: hidden from people and screen readers */}
              <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="field"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="field resize-none"
                    placeholder="Which class or course are you interested in?"
                  />
                </div>
              </div>

              {status === 'error' && (
                <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {errorMessage || 'Something went wrong sending your message.'} You can also call us on +91 95997
                  40029.
                </p>
              )}

              {status === 'sent' && (
                <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
                  Thanks! Your message has reached us and we'll get back to you soon.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'sent'}
                className="btn-primary group mt-6 w-full"
              >
                {status === 'sent' ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Message sent
                  </>
                ) : status === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    Send message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
