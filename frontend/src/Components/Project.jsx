import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { assets } from "../assets/assets";
import ProjectCard from "./ProjectCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock Fallback Data
const projectsDataFallback = [
  {
    title: "TrackForge",
    description: "A complete bug tracking & sprint management platform featuring Groq Llama 3.3 AI code analysis, multi-role access control (RBAC), real-time collaborative workspace rooms, sprint analytics, and customizable kanban status workflows.",
    keywords: ["MERN Stack", "Groq Llama 3.3 AI", "Socket.io", "Recharts", "Tailwind CSS", "JWT Auth"],
    meta: "AI & Sprint Management SaaS",
    image: assets.trackForge,
    video: assets.demo,
    previewLink: "https://trackforge-client-qpdy.onrender.com/",
    codeLink: "https://github.com/AnbCrafts/TrackForge.git",
  },
  {
    title: "Nirman.AI (Website Builder)",
    description: "An autonomous multi-agent AI website generator powered by Google Gemini. Features a 4-stage AI architecture (Plan, Code, Refine, Audit), in-browser Monaco Studio IDE, real-time iframe preview staging, and full-stack web application compilation.",
    keywords: ["React", "Node.js", "Express", "Google Gemini AI", "Monaco Editor", "Tailwind CSS"],
    meta: "Multi-Agent AI Builder & IDE",
    image: assets.nirman,
    video: assets.demo,
    previewLink: "https://website-builder-client-r1q9.onrender.com",
    codeLink: "https://github.com/AnbCrafts/Website-Builder-Client.git",
  },
  {
    title: "CodeSage AI",
    description: "An AI-powered developer assistant powered by Llama 3 70B models. Features automated code explanation, line-by-line syntax breakdown, Big O complexity analysis, multi-language code translation, and unit test generation.",
    keywords: ["MERN Stack", "Llama 3 70B", "Groq AI API", "Monaco Editor", "Tailwind CSS"],
    meta: "AI Developer Assistant",
    image: assets.codeSage,
    video: assets.demo,
    previewLink: "https://codesage-client.onrender.com/",
    codeLink: "https://github.com/AnbCrafts/CodeSage.git",
  },
];

export default function ProjectsSection() {
  const dbProjects = useSelector((state) => state.portfolio.projects);

  // Filter strictly featured projects from DB, limiting to the 3 main flagship projects for homepage
  const featuredDbProjects = dbProjects.filter((p) => p.featured === true);
  const projectsList = dbProjects.length > 0
    ? (featuredDbProjects.length > 0 ? featuredDbProjects.slice(0, 3) : dbProjects.slice(0, 3))
    : projectsDataFallback;

  return (
    <section id="projects" className="relative w-full py-16 md:py-20 px-6 lg:px-8 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 dark:opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 text-sm font-bold tracking-wide border border-teal-200 dark:border-teal-900 mb-4">
              PORTFOLIO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Featured <span className="text-teal-600 dark:text-teal-400">Projects</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              A collection of meaningful products focused on clean user experience, 
              scalable architecture, and real-world problem solving.
            </p>
          </motion.div>
        </div>

        {/* --- PROJECT CARDS MAPPING --- */}
        <div className="flex flex-col gap-8">
          {projectsList.map((project, index) => (
            <ProjectCard 
              key={index} 
              title={project.title}
              description={project.description || project.desc}
              keywords={project.techStack || project.keywords}
              meta={project.meta || (project.category === 'fullstack' ? 'Full Stack Project' : project.category === 'frontend' ? 'Frontend Project' : 'Featured Project')}
              image={project.thumbnail || project.image}
              video={project.demoVideo && project.demoVideo !== assets.demo ? project.demoVideo : null}
              previewLink={project.liveUrl || project.previewLink}
              codeLink={project.githubUrl || project.codeLink}
            />
          ))}
        </div>

        {/* --- BOTTOM CTA --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <Link
            to="/project-details"
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-lg hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            View complete project archive 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}