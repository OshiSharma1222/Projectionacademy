import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { CanvasRevealEffect } from './ui/canvas-reveal-effect'

const LearningApproach = () => {
  const approaches = [
    {
      icon: "",
      title: "One-on-One Mentorship",
      description: "Personalized guidance tailored to each student's unique learning style and goals",
      canvasConfig: {
        animationSpeed: 5.1,
        containerClassName: "bg-emerald-900"
      }
    },
    {
      icon: "",
      title: "Weekly Tests",
      description: "Regular assessments to track progress and identify areas for improvement",
      canvasConfig: {
        animationSpeed: 3,
        containerClassName: "bg-gradient-to-b from-yellow-900 via-yellow-950 to-yellow-900",
        colors: [[236, 0, 153], [232, 0, 249]],
        dotSize: 2
      }
    },
    {
      icon: "",
      title: "Goal-Oriented Learning",
      description: "Structured curriculum designed to achieve specific academic and career objectives",
      canvasConfig: {
        animationSpeed: 3,
        containerClassName: "bg-sky-600",
        colors: [[125, 211, 252]]
      }
    }
  ]

  return (
    <section id="learning" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-6">
  <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
    The <span style={{ color: "#184691" }} className="italic">Environment</span> We Provide
  
</h2>

<p className="italic text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">          Experience a revolutionary approach to education with our proven methodologies and personalized attention
        </p>
        
        <div className="py-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4 mx-auto px-8">
          {approaches.map((approach, index) => (
            <Card key={index} title={approach.title} icon={approach.icon}>
              <CanvasRevealEffect
                animationSpeed={approach.canvasConfig.animationSpeed}
                containerClassName={approach.canvasConfig.containerClassName}
                colors={approach.canvasConfig.colors}
                dotSize={approach.canvasConfig.dotSize}
              />
              {/* Radial gradient for the cute fade */}
              <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const Card = ({ title, icon, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] relative">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
          <span className="text-4xl">{icon}</span>
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};

const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default LearningApproach