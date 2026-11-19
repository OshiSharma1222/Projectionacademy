import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { Accent, Reveal, SectionHeader } from './ui/reveal'

const videos = [
  {
    title: 'Mathematics mastery',
    description: 'Problem-solving techniques and conceptual clarity.',
    videoId: '6nrbp0eodHE',
    topics: ['Algebra & calculus', 'Geometry', 'Statistics'],
  },
  {
    title: 'Physics fundamentals',
    description: 'Complex physics concepts made simple and understandable.',
    videoId: 'NPpCbXj2mfA',
    topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
  },
  {
    title: 'Rotational motion explained',
    description: 'Rotational motion with real-world examples and clear explanations.',
    videoId: 'F_CJe_YNvn4',
    topics: ['Rotational dynamics', 'Everyday applications', 'Numericals'],
  },
  {
    title: 'Exam strategies',
    description: 'Proven techniques for exam preparation and time management.',
    videoId: 'QpSzHlCqfkw',
    topics: ['Time management', 'Question analysis', 'Handling stress'],
  },
]

const YouTubeSection = () => {
  return (
    <section id="youtube" className="section border-t border-slate-100 bg-slate-50/70">
      <div className="container-page">
        <SectionHeader
          eyebrow="Teaching"
          title={
            <>
              See how we <Accent>teach</Accent>
            </>
          }
          lead="Watch a few of our lessons and see how our instructors make difficult concepts simple."
        />

        <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 lg:mt-16">
          {videos.map((video, i) => (
            <Reveal key={video.videoId} delay={(i % 2) * 0.15}>
              <div className="card group h-full overflow-hidden">
              <div className="aspect-video bg-slate-100">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-slate-900">{video.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-base">{video.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {video.topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
                >
                  Watch on YouTube
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default YouTubeSection
