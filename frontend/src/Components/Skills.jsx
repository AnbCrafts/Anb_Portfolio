import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { 
  Code, 
  Server, 
  Database, 
  Wrench, 
  Cpu, 
  Cloud, 
  Layers, 
  Terminal, 
  CheckCircle2 
} from "lucide-react";
import { TextScramble } from "./AnimatedText";
import Spotlight3DCard from "./Spotlight3DCard";

// Mock Fallback Skills mapped by category
const skillGroupsFallback = [
  {
    category: "Frontend Development",
    icon: Code,
    color: "from-[#38bdf8] to-[#433bff]",
    skills: [
      { name: "React.js", level: 92 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS v4", level: 95 },
      { name: "Redux Toolkit", level: 88 },
      { name: "HTML5 / CSS3", level: 95 }
    ]
  },
  {
    category: "Backend & Systems",
    icon: Server,
    color: "from-[#433bff] to-[#2f27ce]",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 90 },
      { name: "C# / .NET 8", level: 82 },
      { name: "RESTful APIs", level: 92 },
      { name: "JWT & Multi-Factor Auth", level: 88 },
      { name: "Microservices Logic", level: 80 }
    ]
  },
  {
    category: "Database & Storage",
    icon: Database,
    color: "from-[#10b981] to-[#059669]",
    skills: [
      { name: "MongoDB & Mongoose", level: 90 },
      { name: "PostgreSQL & SQL", level: 82 },
      { name: "Redis Caching", level: 75 },
      { name: "Cloudinary CDN", level: 88 }
    ]
  },
  {
    category: "DevOps & Tools",
    icon: Wrench,
    color: "from-[#a78bfa] to-[#8b5cf6]",
    skills: [
      { name: "Git / GitHub Actions", level: 90 },
      { name: "Docker Containerization", level: 78 },
      { name: "Vercel & Render Deployments", level: 92 },
      { name: "Monaco IDE & Postman", level: 88 }
    ]
  }
];

export default function SkillsSection() {
  const dbSkills = useSelector((state) => state.portfolio.skills);

  // Map database skills into categories if available
  const categoriesMap = {};
  if (dbSkills.length > 0) {
    dbSkills.forEach((s) => {
      const cat = s.category || "Other Core Skills";
      if (!categoriesMap[cat]) {
        categoriesMap[cat] = {
          category: cat,
          icon: Cpu,
          color: "from-[#38bdf8] to-[#433bff]",
          skills: []
        };
      }
      categoriesMap[cat].skills.push({
        name: s.name,
        level: s.proficiency || s.level || 85
      });
    });
  }

  const groupedDbSkills = Object.values(categoriesMap);
  const skillGroups = groupedDbSkills.length > 0 ? groupedDbSkills : skillGroupsFallback;

  return (
    <section id="skills" className="relative w-full py-20 px-6 overflow-hidden bg-[#050315] text-[#fbfbfe] transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#433bff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#38bdf8]/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-[#fbfbfe] tracking-tight"
          >
            Technical <span className="bg-gradient-to-r from-[#38bdf8] via-[#433bff] to-[#a78bfa] bg-clip-text text-transparent"><TextScramble text="Expertise" /></span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="mt-4 text-[#dedcff]/80 max-w-2xl mx-auto text-lg"
          >
            A comprehensive toolset for building scalable, high-performance web applications from concept to deployment.
          </motion.p>
        </div>

        {/* GRID LAYOUT WITH 3D SPOTLIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {skillGroups.map((group, idx) => {
            const IconComponent = group.icon || Layers;
            return (
              <Spotlight3DCard
                key={idx}
                glowColor="rgba(67, 59, 255, 0.25)"
                spotlightColor="rgba(56, 189, 248, 0.15)"
                className="bg-[#0b0f19]/90 backdrop-blur-xl border border-slate-800/80 p-8 shadow-xl shadow-black/70"
              >
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${group.color} text-white shadow-lg`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#fbfbfe]">{group.category}</h3>
                    <p className="text-xs font-semibold text-[#38bdf8]">{group.skills.length} Core Competencies</p>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-800/80 mb-6" />

                {/* Skills List Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#050315]/60 border border-slate-800/60">
                      <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                      <span className="text-sm font-semibold text-[#dedcff]">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </Spotlight3DCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}