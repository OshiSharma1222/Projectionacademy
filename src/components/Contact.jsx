import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle, Instagram, Mail, MapPin, Phone, Send, Youtube } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title with 3D rotation
      gsap.fromTo(titleRef.current,
        { opacity: 0, rotationX: -90, transformOrigin: "center bottom" },
        {
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Form with slide and scale animation
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 100, scale: 0.8, rotationY: 45 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Info with slide from opposite direction
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: -100, scale: 0.8, rotationY: -45 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          },
          delay: 0.2
        }
      )

      // Floating animation for contact cards
      gsap.to(infoRef.current?.children || [], {
        y: "random(-10, 10)",
        rotation: "random(-2, 2)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('contact_forms')
        .insert([formData])

      if (error) throw error

      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-5xl font-bold text-gray-800 mb-6">
            Get In <span style={{ color: "#184691" }} className="italic">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your journey with <span style={{ color: "#184691" }} className="italic">Projection Academy </span> We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="group flex items-start space-x-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                    C7/247, Block C<br />
                    Yamuna Vihar, Shahdara<br />
                    New Delhi, Delhi, 110053
                    </p>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Phone</h4>
                    <p className="text-gray-600 text-lg">+91 9599740029 </p>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Email</h4>
                    <p className="text-gray-600 text-lg">academyprojection@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, color: 'from-pink-600 to-purple-600', hoverColor: 'hover:from-pink-700 hover:to-purple-700' },
                  { icon: Youtube, color: 'from-red-600 to-red-700', hoverColor: 'hover:from-red-700 hover:to-red-800' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-12 h-12 bg-gradient-to-br ${social.color} ${social.hoverColor} text-white rounded-xl flex items-center justify-center hover:scale-125 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"></div>
            
            <h3 className="relative text-3xl font-bold text-gray-800 mb-8 text-center">Send Us a Message</h3>
            
            <div className="relative space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all duration-300 hover:border-blue-400 focus:scale-105 backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all duration-300 hover:border-blue-400 focus:scale-105 backdrop-blur-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="group">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 resize-none backdrop-blur-sm"
                  placeholder="Tell us about your interests and goals..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-75 hover:scale-105 hover:shadow-xl transform-gpu"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    <span>Message Sent!</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact