import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import AchievementsAndStudents from './components/AchievementsAndStudents'
import Chatbot from './components/Chatbot'
import Contact from './components/Contact'
import Hero from './components/Hero'
import LearningApproach from './components/LearningApproach'
import MenuBar from './components/MenuBar'
import Ticker from './components/Ticker'
import YouTubeSection from './components/YouTubeSection'

function App() {
  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-white">
      <MenuBar />

      <main>
        <Hero />
        <Ticker />

        <AchievementsAndStudents />
        <LearningApproach />
        <YouTubeSection />
        <Contact />
      </main>

      <footer className="bg-brand-900 text-brand-100">
        <div className="container-page grid gap-10 py-12 sm:py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <img src="/images/projection logo-01.png" alt="" className="h-11 w-11 object-contain" />
              </span>
              <span className="text-lg font-bold text-white">Projection Academy</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">
              Igniting your brighter future. Coaching for JEE Main, Science and CBSE foundation.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ['Results', 'achievements'],
                ['Our approach', 'learning'],
                ['Teaching', 'youtube'],
                ['Contact', 'contact'],
              ].map(([label, id]) => (
                <li key={id}>
                  <a href={`#${id}`} className="transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Visit or call</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>C7/247, Block C, Yamuna Vihar, Shahdara, New Delhi 110053</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+919599740029" className="hover:text-white">+91 95997 40029</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:academyprojection@gmail.com" className="break-all hover:text-white">
                  academyprojection@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="container-page py-5 text-center text-xs text-brand-300 sm:text-sm">
            © {new Date().getFullYear()} Projection Academy. All rights reserved.
          </p>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}

export default App
