import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Code2, Calendar, ArrowDown } from "lucide-react";
import JourneyGallery from "./JourneyGallery";

// Data remains the same
const journey = [
  {
    year: "2025 - Present",
    title: "Full-Stack Developer",
    company: "Personal Projects & Freelance",
    desc: "Building production-grade apps including TrackForge & FitForWork. Focusing on scalable MERN architecture, advanced UI engineering, and system design patterns.",
    icon: <Code2 size={18} />,
    type: "work",
  },
  {
    year: "2024",
    title: "Hack-O-Nova Finalist",
    company: "Adamas University",
    desc: "Led a team in a 36-hour hackathon to build an AI study planner. Handled frontend architecture and pitched the final prototype to a panel of judges.",
    icon: <Trophy size={18} />,
    type: "achievement",
  },
  {
    year: "2024",
    title: "Full-Stack Trainee",
    company: "Ardent Computech",
    desc: "Intensive industrial training covering the MERN stack. Mastered REST APIs, Docker containerization, Authentication (JWT), and database schema design.",
    icon: <Briefcase size={18} />,
    type: "education",
  },
  {
    year: "2024",
    title: "NPTEL Java Certification",
    company: "Elite + Silver Award",
    desc: "Achieved top 5% score. Strengthened core programming concepts including OOP, Multithreading, and Data Structures in Java.",
    icon: <AwardIcon />, 
    type: "education",
  },
  {
    year: "2022",
    title: "Higher Secondary (PCM)",
    company: "Science Stream",
    desc: "Built a strong foundation in Logic, Mathematics, and Computer Science fundamentals with a 91.2% aggregate.",
    icon: <GraduationCap size={18} />,
    type: "education",
  }
];

function AwardIcon() {
    return <Trophy size={18} />
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full bg-slate-50 py-24 px-6 lg:px-8 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* --- PART 1: HEADER & TIMELINE (Centered) --- */}
        <div className="max-w-4xl mx-auto mb-24">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-teal-100 text-teal-700 text-sm font-bold tracking-wide border border-teal-200 mb-4">
                MY PATH
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Education & <span className="text-teal-600">Experience</span>
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                A timeline of my professional growth, technical milestones, and the key events that shaped my career.
              </p>
            </motion.div>
          </div>

          {/* Timeline List */}
          <div className="relative pl-8 border-l-2 border-slate-200 space-y-12 ml-4 md:ml-0">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Connector Dot */}
                <div className={`
                    absolute -left-[41px] top-0 
                    w-10 h-10 rounded-full border-4 border-slate-50 
                    flex items-center justify-center
                    transition-all duration-300
                    ${index === 0 ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110' : 'bg-white text-slate-400 border-slate-200 group-hover:border-teal-400 group-hover:text-teal-600'}
                `}>
                    {index === 0 && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-20 animate-ping"></span>
                    )}
                    {item.icon}
                </div>

                {/* Content Card */}
                <div className="flex flex-col items-start bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow w-full">
                   <div className="flex flex-wrap justify-between w-full mb-2">
                       <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                          {item.title}
                       </h3>
                       <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded">
                          <Calendar size={12} /> {item.year}
                       </span>
                   </div>
                   
                   <span className="text-sm font-semibold text-teal-600 mb-3">
                      {item.company}
                   </span>
                   
                   <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      {item.desc}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* --- PART 2: VISUAL GALLERY (Full Width) --- */}
        <div className="relative w-full border-t border-slate-200 pt-16">
            
            {/* Transition Title */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm border border-slate-100 mb-4 text-teal-600">
                    <ArrowDown size={20} className="animate-bounce" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                    Visual Highlights
                </h3>
                <p className="text-slate-500 mt-2">
                    A closer look at my hackathons, certifications, and training.
                </p>
            </div>

            {/* The Gallery Component - Now has full width to breathe */}
            <div className="w-full">
                <JourneyGallery />
            </div>

            {/* Background Blob for the Gallery Area */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] bg-teal-50/50 blur-[100px] -z-10 rounded-full mix-blend-multiply pointer-events-none" />
        </div>

      </div>
    </section>
  );
}