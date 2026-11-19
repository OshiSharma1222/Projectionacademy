import { Award, BookOpen, GraduationCap, Trophy } from 'lucide-react'
import { InfiniteSlider } from './core/infinite-slider'
import { Accent, CountUp, Reveal, SectionHeader } from './ui/reveal'

const achievements = [
  { icon: Trophy, number: '200+', label: 'Selections', description: 'Students placed in top institutions' },
  { icon: GraduationCap, number: '300+', label: 'Students enrolled', description: 'Currently preparing with us' },
  { icon: BookOpen, number: '10+', label: 'Courses', description: 'Programs across classes and subjects' },
  { icon: Award, number: '98%', label: 'Success rate', description: 'Students reaching their target goals' },
]

const columnA = [1, 2, 3, 4, 5].map((n) => `/images/student${n}.jpg`)
const columnB = [6, 7, 8, 9, 10].map((n) => `/images/student${n}.jpg`)

const StudentCard = ({ src }) => (
  <img
    src={src}
    alt="Projection Academy student result"
    loading="lazy"
    className="aspect-square w-full rounded-lg border border-slate-200 object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
  />
)

const AchievementsAndStudents = () => {
  return (
    <section id="achievements" className="section border-t border-slate-100 bg-slate-50/70">
      <div className="container-page">
        <SectionHeader
          eyebrow="Results"
          title={
            <>
              Where hard work meets <Accent>success</Accent>
            </>
          }
          lead="The numbers behind Projection Academy, and the students who made them happen."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-12">
          {/* Stats */}
          <div>
            <Reveal as="h3" className="text-xl font-bold text-slate-900 sm:text-2xl">
              Achievement highlights
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              {achievements.map(({ icon: Icon, number, label, description }, i) => (
                <Reveal key={label} delay={i * 0.1}>
                  <div className="card group h-full p-4 sm:p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white sm:h-10 sm:w-10">
                    <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                  </span>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight text-brand-700 sm:mt-5 sm:text-4xl">
                    <CountUp value={number} />
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">{label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Student results */}
          <div>
            <Reveal as="h3" className="text-xl font-bold text-slate-900 sm:text-2xl">
              Students who make us proud
            </Reveal>
            <Reveal delay={0.1} className="mt-6 grid h-[420px] grid-cols-2 gap-3 sm:h-[560px] sm:gap-4 lg:h-[600px]">
              <InfiniteSlider duration={40}>
                {columnA.map((src) => (
                  <StudentCard key={src} src={src} />
                ))}
              </InfiniteSlider>
              <InfiniteSlider duration={48} reverse>
                {columnB.map((src) => (
                  <StudentCard key={src} src={src} />
                ))}
              </InfiniteSlider>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AchievementsAndStudents
