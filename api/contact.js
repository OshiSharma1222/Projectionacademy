// Vercel serverless function: POST /api/contact
// Sends the enquiry to the academy inbox and a confirmation to the student via Resend.
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables,
// and in a local .env for `npm run dev`):
//   RESEND_API_KEY     required  Resend API key (re_...)
//   RESEND_FROM_EMAIL  optional  Sender, e.g. "Projection Academy <hello@yourdomain.com>".
//                                Must be on a domain verified in Resend. Defaults to Resend's
//                                test sender, which can only deliver to your own Resend account
//                                email and cannot send the student confirmation.
//   CONTACT_TO_EMAIL   optional  Where enquiries go. Defaults to academyprojection@gmail.com.

import { Resend } from 'resend'

const DEFAULT_FROM = 'Projection Academy <onboarding@resend.dev>'
const DEFAULT_TO = 'academyprojection@gmail.com'
const PHONE = '+91 95997 40029'

const LIMITS = { name: 100, email: 254, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const parseBody = (body) => {
  if (!body) return {}
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return body
}

export function validate(input) {
  const name = String(input.name ?? '').trim()
  const email = String(input.email ?? '').trim()
  const message = String(input.message ?? '').trim()

  if (!name || !email || !message) return { error: 'Please fill in your name, email and message.' }
  if (name.length > LIMITS.name) return { error: 'Name is too long.' }
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) return { error: 'Please enter a valid email address.' }
  if (message.length > LIMITS.message) return { error: 'Message is too long (5000 characters max).' }

  return { data: { name: name.replace(/[\r\n]+/g, ' '), email, message } }
}

const layout = (title, bodyHtml) => `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#1e293b">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
    <tr><td style="background:#184691;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:bold">${title}</td></tr>
    <tr><td style="padding:28px;font-size:15px;line-height:1.6">${bodyHtml}</td></tr>
    <tr><td style="padding:16px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b">
      Projection Academy · C7/247, Block C, Yamuna Vihar, Shahdara, New Delhi 110053 · ${PHONE}
    </td></tr>
  </table>
</body></html>`

function enquiryEmail({ name, email, message }) {
  const html = layout(
    'New enquiry from the website',
    `<p style="margin:0 0 16px"><strong>Name:</strong> ${escapeHtml(name)}<br>
     <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color:#184691">${escapeHtml(email)}</a></p>
     <p style="margin:0 0 6px"><strong>Message:</strong></p>
     <div style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px">${escapeHtml(message)}</div>
     <p style="margin:16px 0 0;color:#64748b;font-size:13px">Reply to this email to answer ${escapeHtml(name)} directly.</p>`
  )
  const text = `New enquiry from the website\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
  return { subject: `New enquiry from ${name}`, html, text }
}

function confirmationEmail({ name, message }) {
  const html = layout(
    'We have received your message',
    `<p style="margin:0 0 14px">Hi ${escapeHtml(name)},</p>
     <p style="margin:0 0 14px">Thank you for contacting Projection Academy. Our team will get back to you soon.
     If it's urgent, you can call us on <a href="tel:+919599740029" style="color:#184691">${PHONE}</a>.</p>
     <p style="margin:0 0 6px;color:#64748b;font-size:13px">Your message:</p>
     <div style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;color:#475569">${escapeHtml(message)}</div>
     <p style="margin:18px 0 0">Regards,<br>Projection Academy</p>`
  )
  const text = `Hi ${name},\n\nThank you for contacting Projection Academy. Our team will get back to you soon. If it's urgent, call us on ${PHONE}.\n\nYour message:\n${message}\n\nRegards,\nProjection Academy\n`
  return { subject: 'We received your message – Projection Academy', html, text }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = parseBody(req.body)

  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (body.company) return res.status(200).json({ ok: true })

  const { data, error } = validate(body)
  if (error) return res.status(400).json({ error })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Email is not configured on the server.' })
  }

  const resend = new Resend(apiKey)
  const from = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO

  // 1) Enquiry to the academy. This one must succeed.
  const enquiry = enquiryEmail(data)
  const sent = await resend.emails.send({ from, to, replyTo: data.email, ...enquiry })
  if (sent.error) {
    console.error('Resend enquiry email failed:', sent.error)
    return res.status(502).json({ error: 'Could not send your message right now. Please try again or call us.' })
  }

  // 2) Confirmation to the student. Only possible from a verified domain; a failure
  //    here shouldn't fail the request because the academy already has the enquiry.
  if (!from.includes('@resend.dev')) {
    const confirmation = confirmationEmail(data)
    const ack = await resend.emails.send({ from, to: data.email, replyTo: to, ...confirmation })
    if (ack.error) console.error('Resend confirmation email failed:', ack.error)
  }

  return res.status(200).json({ ok: true })
}
