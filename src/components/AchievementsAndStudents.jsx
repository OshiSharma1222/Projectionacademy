import { Award, BookOpen, Trophy, Users } from 'lucide-react';
import { InfiniteSlider } from './core/infinite-slider';
import {
  GlowingStarsBackgroundCard
} from "./ui/glowing-stars";


const AchievementsAndStudents = () => {
  const achievements = [
    {
      icon: <Trophy className="w-10 h-10" />,
      number: "200+",
      label: "Selections",
      description: "Students successfully placed in top institutions",
      color: "from-yellow-400 via-orange-500 to-red-500"
    },
    {
      icon: <Users className="w-10 h-10" />,
      number: "300+",
      label: "Currently Studying",
      description: "Students actively pursuing their dreams",
      color: "from-blue-500 via-purple-600 to-pink-500"
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      number: "10+",
      label: "Courses",
      description: "Comprehensive programs across subjects",
      color: "from-green-400 via-blue-500 to-purple-600"
    },
    {
      icon: <Award className="w-10 h-10" />,
      number: "98%",
      label: "Success Rate",
      description: "Students achieving their target goals",
      color: "from-pink-500 via-red-500 to-orange-500"
    }
    
  ];
  

  // Placeholder student images - you can replace these with actual student photos
  const studentImages = [
    { src: "/images/student1.jpg" },
    { src: "/images/student2.jpg" },
    { src: "/images/student3.jpg" },
    { src: "/images/student4.jpg"},
    { src: "/images/student5.jpg" },
    { src: "/images/student6.jpg" },
    { src: "/images/student7.jpg" },
    { src: "/images/student8.jpg" },
    { src: "/images/student9.jpg" },
    { src: "/images/student10.jpg" },
    { src: "/images/student7.jpg" },
    { src: "/images/student2.jpg" },
    { src: "/images/student3.jpg" },
    { src: "/images/student4.jpg" },
    { src: "/images/student5.jpg"},
    { src: "/images/student6.jpg" }
  ]

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#272757' }}>
      <GlowingStarsBackgroundCard className="absolute inset-0" />
      <div className="container mx-auto px-6 relative z-10">
      <h2 className="text-5xl font-bold text-center text-white mb-4">
  Where <span style={{ color: "#184691" }} className="italic">Hard Work</span> Meets <span style={{ color: "#184691" }} className="italic">Success</span>
</h2>

<p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto italic">
  Celebrating success stories and showcasing the bright minds that make Projection Academy proud
</p>


        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Left Side - Student Images with Multiple Infinite Sliders */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8">
              Students that Make Us Proud
            </h3>
            <div className="flex h-[700px] space-x-2">
              {/* First Slider - Top to Bottom */}
              <div className="h-full">
<InfiniteSlider direction="vertical" itemWidth={220} gap={8}> {/* Increased width, reduced gap */}
  {studentImages.slice(0, 6).map((student, index) => (
    <div key={index} className="text-center mb-1"> {/* Reduced margin bottom */}
      <div className="relative group">
        <div className="w-60 h-60 overflow-hidden shadow-xl border-2 border-white dark:border-gray-700 mx-auto mb-2 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"> {/* Increased size from w-48/h-48 to w-60/h-60 */}
          <img
            src={student.src}
            alt={student.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/112x112/4F46E5/FFFFFF?text=${student.name?.charAt(0) || 'S'}`
            }}
          />
        </div>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
      </div>
      <p className="text-sm font-semibold text-gray-200 group-hover:text-blue-300 transition-colors duration-300">{student.name}</p>
      <p className="text-xs text-gray-400"></p>
    </div>
  ))}
</InfiniteSlider>
</div>

              {/* Second Slider - Bottom to Top */}
              <div className="h-full">
<InfiniteSlider direction="vertical" reverse itemWidth={220} gap={8}> {/* Increased width, reduced gap */}
  {studentImages.slice(6, 12).map((student, index) => (
    <div key={index} className="text-center mb-1"> {/* Reduced margin bottom */}
      <div className="relative group">
        <div className="w-60 h-60 overflow-hidden shadow-xl border-2 border-white dark:border-gray-700 mx-auto mb-2 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"> {/* Increased size from w-48/h-48 to w-60/h-60 */}
          <img
            src={student.src}
            alt={student.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/112x112/10B981/FFFFFF?text=${student.name?.charAt(0) || 'S'}`
            }}
          />
        </div>
        <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
      </div>
      <p className="text-sm font-semibold text-gray-200 group-hover:text-green-300 transition-colors duration-300">{student.name}</p>
      <p className="text-xs text-gray-400"></p>
    </div>
  ))}
</InfiniteSlider>
</div>
            </div>
          
          </div>

          {/* Right Side - Achievements */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8">
              Achievement Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group bg-[#1f203f] rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-700 border border-[#2e2f5b] hover:border-transparent hover:-translate-y-2 relative overflow-hidden transform-gpu aspect-square flex flex-col justify-center"
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-20 transition-all duration-700 rounded-3xl`}></div>
                  
                  {/* Glowing effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700`}></div>
                  
                  {/* Number with enhanced counter animation */}
                  <h4 className="relative text-4xl font-bold text-white mb-2 group-hover:scale-105 transition-all duration-500">
                    {achievement.number}
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-ping group-hover:animate-pulse"></span>
                  </h4>
                  
                  {/* Label */}
                  <h5 className="text-xl font-semibold text-blue-300 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {achievement.label}
                  </h5>
                  
                  {/* Description */}
                  <p className="relative text-gray-300 leading-relaxed z-10 text-base">
                    {achievement.description}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-800 dark:to-purple-900 rounded-full opacity-20 group-hover:scale-150 group-hover:rotate-45 transition-all duration-700"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-800 dark:to-orange-900 rounded-full opacity-30 group-hover:scale-125 group-hover:-rotate-45 transition-all duration-700"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AchievementsAndStudents
