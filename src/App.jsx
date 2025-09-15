import React from 'react'
import AchievementsAndStudents from './components/AchievementsAndStudents'
import Chatbot from './components/Chatbot'
import Contact from './components/Contact'
import LearningApproach from './components/LearningApproach'
import MenuBar from './components/MenuBar'
import { GlowingStarsBackgroundCard } from './components/ui/glowing-stars'
import YouTubeSection from './components/YouTubeSection'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 relative overflow-hidden" style={{ backgroundColor: '#272757' }}>
        <GlowingStarsBackgroundCard className="absolute inset-0" />
        <MenuBar />
        
        {/* Hero Section Image */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 px-2" 
  style={{ backgroundColor: '#272757' }}
>
  <img
    src="/images/HEROSECTION.png"
    alt="Hero Section"
    className="w-[90%] h-auto object-contain rounded-lg"
  />


          {/* Removed color overlay for true image colors */}
          <div className="absolute bottom-10 w-full flex justify-center z-10">
            <a href="#contact" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 hover:border-white/40">
              Contact Us
            </a>
          </div>
        </section>
        
        <AchievementsAndStudents />
        <LearningApproach />
        <YouTubeSection />
        <Contact />
        <Chatbot />
        
        {/* Footer */}
        <footer className="text-white py-16 relative overflow-hidden border-t border-[#2e2f5b]" style={{ backgroundColor: '#1f203f' }}>
          <GlowingStarsBackgroundCard className="absolute inset-0" />
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              Projection Academy
            </h3>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              Transforming Dreams into Reality Through Excellence in Education
            </p>
            <div className="text-sm text-blue-200 border-t border-blue-600 pt-8">
              © 2024 Projection Academy. All rights reserved. | Empowering Future Leaders
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App