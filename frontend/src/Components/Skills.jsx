import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  Layout,
  Server,
  Database,
  Terminal,
} from "lucide-react";

const skillGroupsFallback = [
  {
    title: "Frontend Development",
    icon: <Layout size={24} className="text-blue-500" />,
    description: "Building responsive, accessible UIs",
    skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Redux"],
    color: "blue",
  },
  {
    title: "Backend Architecture",
    icon: <Server size={24} className="text-emerald-500" />,
    description: "Scalable APIs & server-side logic",
    skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "WebSockets"],
    color: "emerald",
  },
  {
    title: "Database Management",
    icon: <Database size={24} className="text-purple-500" />,
    description: "Optimized data storage & schemas",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Redis"],
    color: "purple",
  },
  {
    title: "DevOps & Tools",
    icon: <Terminal size={24} className="text-orange-500" />,
    description: "Version control & deployment",
    skills: ["Docker", "Git/GitHub", "AWS EC2", "CI/CD", "Postman"],
    color: "orange",
  },
];

const categoryConfigs = {
  'Frontend': {
    title: "Frontend Development",
    icon: <Layout size={24} className="text-blue-500" />,
    description: "Building responsive, accessible UIs",
    color: "blue",
  },
  'Backend': {
    title: "Backend Architecture",
    icon: <Server size={24} className="text-emerald-500" />,
    description: "Scalable APIs & server-side logic",
    color: "emerald",
  },
  'Database': {
    title: "Database Management",
    icon: <Database size={24} className="text-purple-500" />,
    description: "Optimized data storage & schemas",
    color: "purple",
  },
  'DevOps & Tools': {
    title: "DevOps & Tools",
    icon: <Terminal size={24} className="text-orange-500" />,
    description: "Version control & deployment",
    color: "orange",
  },
};

const colorMap = {
  blue: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
  purple: "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100",
  orange: "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100",
};

export default function SkillsSection() {
  const dbSkills = useSelector((state) => state.portfolio.skills);

  // Group dynamic database skills
  const groupedDbSkills = Object.keys(categoryConfigs).map((cat) => {
    const catSkills = dbSkills
      .filter((s) => s.category === cat)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      .map((s) => s.name);
    return {
      ...categoryConfigs[cat],
      skills: catSkills,
    };
  }).filter((g) => g.skills.length > 0);

  // Choose dynamic list or mock fallback
  const skillGroups = groupedDbSkills.length > 0 ? groupedDbSkills : skillGroupsFallback;

  return (
    <section id="skills" className="relative w-full py-24 px-6 overflow-hidden bg-white">
      {/* Subtle Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Technical <span className="text-teal-600">Expertise</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg"
          >
            A comprehensive toolset for building scalable, high-performance web applications from concept to deployment.
          </motion.p>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              {/* Header inside Card */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-white group-hover:shadow-md transition-all duration-300 ring-1 ring-slate-100">
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {group.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {group.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-slate-100 mb-6 group-hover:bg-slate-200 transition-colors" />

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`
                      px-3.5 py-1.5 text-sm font-medium rounded-full border transition-colors cursor-default
                      ${colorMap[group.color]}
                    `}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}