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
    description: "A comprehensive bug tracking and project management tool designed for agile teams. Features include real-time analytics, role-based access control (RBAC), and intuitive kanban workflows.",
    keywords: ["React", "Tailwind", "Node.js", "RBAC", "Recharts"],
    meta: "SaaS Productivity Tool",
    image: assets.trackForge,
    video: assets.demo,
    previewLink: null,
    codeLink: "https://github.com/AnbCrafts/TrackForge.git",
  },
  {
    title: "FitForWork",
    description: "A streamlined hiring platform connecting recruiters with top talent. Includes a dual-dashboard system, resume parsing, and advanced candidate filtering algorithms.",
    keywords: ["MERN Stack", "Redux", "JWT Auth", "Responsive UI"],
    meta: "Recruitment Platform",
    image: assets.fitForWork,
    video: null,
    previewLink: null,
    codeLink: "https://github.com/AnbCrafts/FitFor-Work-updated.git",
  },
  {
    title: "CodeSage",
    description: "An AI-powered developer assistant that explains complex code snippets in plain English. Leverages Large Language Models (LLMs) to parse logic and optimize syntax in real-time.",
    keywords: ["OpenAI API", "Express", "React", "Prompt Engineering"],
    meta: "AI & Developer Tools",
    image: assets.codeSage,
    video: null,
    previewLink: "https://codesage-client.onrender.com/",
    codeLink: "#",
  },
];

export default function ProjectsSection() {
  const dbProjects = useSelector((state) => state.portfolio.projects);

  // Filter featured projects from DB
  const featuredDbProjects = dbProjects.filter((p) => p.featured || p.status === 'active');

  const projectsList = featuredDbProjects.length > 0 ? featuredDbProjects : projectsDataFallback;

  return (
    <section id="projects" className="relative w-full py-24 px-6 lg:px-8 bg-slate-50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none" 
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
            <span className="inline-block py-1 px-3 rounded-full bg-teal-100 text-teal-700 text-sm font-bold tracking-wide border border-teal-200 mb-4">
              PORTFOLIO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Featured <span className="text-teal-600">Projects</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
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
              video={project.demoVideo || project.video}
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
            className="group flex items-center gap-2 text-slate-500 font-medium text-lg hover:text-teal-600 transition-colors"
          >
            View complete project archive 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}