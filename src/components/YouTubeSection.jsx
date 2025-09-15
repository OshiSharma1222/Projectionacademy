import { Award, BookOpen, ExternalLink, Play, Target, Users } from 'lucide-react'
import React, { useRef } from 'react'
import { GlowingStarsBackgroundCard } from './ui/glowing-stars'

const YouTubeSection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const rowRef = useRef(null)

  const scrollRight = () => {
    if (!rowRef.current) return
    rowRef.current.scrollBy({ left: 400, behavior: 'smooth' })
  }

  const openVideo = (videoId) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`
    window.open(url, '_blank', 'noopener')
  }

  const videoSections = [
    {
      title: "Mathematics Mastery",
      description: "Advanced problem-solving techniques and conceptual clarity",
      videoId: "6nrbp0eodHE",
      icon: <Target className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      features: ["Algebra & Calculus", "Geometry Solutions", "Statistical Analysis"]
    },
    {
      title: "Physics Fundamentals",
      description: "Making complex physics concepts simple and understandable",
      videoId: "NPpCbXj2mfA",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      features: ["Mechanics", "Thermodynamics", "Electromagnetism"]
    },
    {
      title: "Easy Concepts Explained",
      description: "Understand rotational motion with real-world examples and clear explanations.",
      videoId: "F_CJe_YNvn4",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
      features: ["Basics of Rotational Dynamics", "Applications in Daily Life", "Numerical Problem-Solving"]
    },
    {
      title: "Exam Strategies",
      description: "Proven techniques for exam preparation and time management",
      videoId: "QpSzHlCqfkw",
      icon: <Award className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      features: ["Time Management", "Question Analysis", "Stress Management"]
    }
  ]

  return (
    <section id="youtube" ref={sectionRef} className="py-24 relative overflow-hidden" style={{ backgroundColor: '#272757' }}>
      <GlowingStarsBackgroundCard className="absolute inset-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-5xl font-bold text-white mb-6">
            Experience Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">Teaching</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our unique teaching methodology through these demonstrations. 
            See how our expert instructors make complex concepts simple and engaging.
          </p>
        </div>
        
        {/* Horizontal video row */}
        <div className="relative">
          <div ref={rowRef} className="flex gap-6 overflow-x-auto pb-4 max-w-7xl mx-auto snap-x snap-mandatory">
            {videoSections.map((section, index) => (
              <div
                key={index}
                className="min-w-[320px] md:min-w-[520px] snap-start group relative bg-[#1f203f] rounded-3xl p-6 shadow-xl border border-[#2e2f5b] overflow-hidden"
              >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-all duration-700 rounded-3xl`}></div>
              
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative mb-6 group/video">
                <div className={`relative bg-gradient-to-br ${section.color} rounded-2xl p-1 shadow-lg overflow-hidden`}>
                  <div className="bg-gray-900 rounded-2xl overflow-hidden relative">
                    {/* Video Thumbnail/Placeholder */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover/video:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <button onClick={() => openVideo(section.videoId)} className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover/video:bg-white group-hover/video:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                          <Play className="w-6 h-6 text-gray-800 ml-1" />
                        </button>
                      </div>
                      
                      {/* YouTube Embed */}
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${section.videoId}`}
                        title={section.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6 relative z-10">
                {section.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color}`}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 relative z-10">
                <button onClick={() => openVideo(section.videoId)} className={`flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r ${section.color} text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                  <Play className="w-4 h-4" />
                  <span>Watch</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 group-hover:rotate-45 transition-all duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-100/40 to-orange-100/40 dark:from-yellow-800/40 dark:to-orange-800/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 group-hover:-rotate-45 transition-all duration-700"></div>
              </div>
            ))}
          </div>
          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            className="hidden md:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

export default YouTubeSection