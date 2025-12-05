import { motion } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Database,
  Terminal,
  Sparkles,
} from "lucide-react";

const skillGroups = [
  {
    title: "Frontend Development",
    icon: <Layout size={28} className="text-teal-600" />,
    skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Redux"],
  },
  {
    title: "Backend Development",
    icon: <Server size={28} className="text-teal-600" />,
    skills: ["Node.js", "Express.js", "REST APIs", "Authentication"],
  },
  {
    title: "Databases",
    icon: <Database size={28} className="text-teal-600" />,
    skills: ["MongoDB", "SQL", "MySQL", "Schema Design"],
  },
  {
    title: "Programming & Tools",
    icon: <Terminal size={28} className="text-teal-600" />,
    skills: ["C++", "JavaScript (ES6+)", "Git", "GitHub", "Docker", "Postman"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="w-7xl  mx-auto bg-white py-20 lg:px-8">
      <div className="w-full">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-teal-700"
        >
          Skills & Expertise
        </motion.h2>

        <div className="w-20 h-[3px] bg-teal-600 mt-2 mb-10"></div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="
                bg-white 
                border border-teal-100 
                rounded-xl 
                shadow-sm 
                p-6 
                hover:shadow-md 
                transition-all
              "
            >
              {/* Top Row (Icon + Title) */}
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-teal-50 rounded-lg">{group.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {group.title}
                </h3>
              </div>

              {/* Skills List */}
              <ul className="flex flex-wrap gap-3">
                {group.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="
                      px-3 
                      py-1 
                      text-sm 
                      bg-teal-50 
                      text-teal-700 
                      rounded-lg 
                      border border-teal-100
                    "
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>


        
      </div>
    </section>
  );
}
