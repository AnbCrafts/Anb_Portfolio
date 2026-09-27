import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import ResumeDropDown from "../Components/ResumeDropDown";
import { 
  Mail, 
  MapPin, 
  Calendar, 
  Code2, 
  Cpu, 
  Globe, 
  Award, 
  BookOpen, 
  Terminal,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles
} from "lucide-react";
import AboutBottom from "../Components/AboutBottom";

// Fallback Mock Data for Experience
const workFallback = [
  {
    title: "Software Developer",
    company: "Management & Computer Consultants (MCC)",
    year: "Sept 2026 – Present",
    desc: "Undergoing intensive software development training in C#, .NET framework, and SQL database management while building scalable enterprise applications.",
    type: "work",
    color: "border-teal-500",
  },
  {
    title: "MERN Stack Developer Intern",
    company: "Hansraj Ventures",
    year: "May 2026 – Sept 2026",
    desc: "Developed scalable MERN stack web applications using MongoDB, Express.js, React.js, and Node.js. Built secure RESTful APIs and managed deployments on AWS, GCP, VPS, Docker, Nginx, and PM2.",
    type: "work",
    color: "border-blue-500",
  },
  {
    title: "Full-Stack Developer",
    company: "Personal Projects & Freelance",
    year: "2025",
    desc: "Engineered production-level SaaS applications including Nirman AI, TrackForge & FitForWork with scalable architecture and responsive design.",
    type: "work",
    color: "border-purple-500",
  }
];

const educationFallback = [
  {
    title: "B.Tech in CSE",
    school: "JIS College of Engineering",
    year: "2022 – 2026",
    desc: "Specializing in Computer Science & Engineering. Active member of coding club and technical fest organizing committees.",
    color: "border-teal-500"
  },
  {
    title: "Higher Secondary (PCM)",
    school: "Science Stream",
    year: "2021 – 2023",
    desc: "Focused on Physics, Chemistry, and Mathematics with 91.2% aggregate. Built strong logic and analytical skills.",
    color: "border-blue-500"
  },
  {
    title: "Matriculation",
    school: "Secondary Education",
    year: "2019 – 2020",
    desc: "Graduated with distinction. Developed an early passion for computer science and web development.",
    color: "border-purple-500"
  }
];

const borderColors = ["border-teal-500", "border-blue-500", "border-purple-500", "border-orange-500"];

export default function AboutPage() {
  const experiences = useSelector((state) => state.portfolio.experience);
  const settings = useSelector((state) => state.portfolio.settings);
  const skills = useSelector((state) => state.portfolio.skills);

  // Group work experiences from DB
  const dbWork = experiences
    .filter((e) => e.type === "work")
    .sort((a, b) => (b.displayOrder || 0) - (a.displayOrder || 0))
    .map((w, idx) => ({
      title: w.title,
      company: w.company,
      year: w.year,
      desc: w.desc,
      color: borderColors[idx % borderColors.length],
    }));

  const workList = dbWork.length > 0 ? dbWork : workFallback;

  // Group education from DB
  const dbEducation = experiences
    .filter((e) => e.type === "education")
    .sort((a, b) => (b.displayOrder || 0) - (a.displayOrder || 0))
    .map((edu, idx) => ({
      title: edu.title,
      school: edu.company,
      year: edu.year,
      desc: edu.desc,
      color: borderColors[idx % borderColors.length],
    }));

  const educationList = dbEducation.length > 0 ? dbEducation : educationFallback;

  // Group skills into category-like blocks for technical arsenal section
  const frontendSkills = skills.filter(s => s.category === 'Frontend' || s.category === 'frontend').map(s => s.name);
  const backendSkills = skills.filter(s => s.category === 'Backend' || s.category === 'backend').map(s => s.name);
  const toolsSkills = skills.filter(s => s.category === 'DevOps & Tools' || s.category === 'Database' || s.category === 'tools').map(s => s.name);

  // Animation Stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* ===========================
          HERO SECTION
      ============================ */}
      <section className="relative pt-28 pb-20 px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* LEFT: TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Software Developer
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              Crafting scalable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 dark:from-teal-400 dark:via-teal-300 dark:to-blue-400">
                digital products.
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Hi, I'm <span className="font-bold text-slate-900 dark:text-white">Anubhaw Gupta</span>. 
              I am a Full-Stack Developer driven by the belief that software should not just work—it should feel effortless and performant. 
              Currently building enterprise applications at MCC and specializing in MERN stack & C# / .NET development.
            </p>

            {/* Quick Stats / Info */}
            <div className="flex flex-wrap gap-6 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-8">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-teal-600 dark:text-teal-400" /> {settings?.location || "Kolkata, India"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-teal-600 dark:text-teal-400" /> Born in 2004
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-teal-600 dark:text-teal-400" /> {settings?.email || "anubhawgupta664@gmail.com"}
              </div>
            </div>

            {/* Resume Dropdown Component & Hire Action */}
            <div className="flex flex-wrap items-center gap-4">
              <ResumeDropDown />
              <Link
                to="/hire"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 rounded-xl font-semibold hover:bg-teal-600 dark:hover:bg-teal-400 transition-all shadow-md shadow-slate-900/20 dark:shadow-teal-500/20"
              >
                Hire Me <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: PORTRAIT IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="absolute top-10 right-10 w-64 h-64 bg-teal-200/50 dark:bg-teal-900/30 rounded-full blur-[80px] opacity-40 -z-10" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-200/50 dark:bg-blue-900/30 rounded-full blur-[80px] opacity-40 -z-10" />

            <div className="relative w-[320px] md:w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white dark:border-slate-800 bg-white dark:bg-slate-900">
              <img
                src={assets.anbPortfolio}
                alt="Anubhaw Gupta Profile"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===========================
          BIO / PHILOSOPHY
      ============================ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center bg-white dark:bg-slate-950">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">My Development Philosophy</h2>
        <div className="w-16 h-1 bg-teal-600 dark:bg-teal-400 mx-auto rounded-full mb-8" />
        
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light max-w-4xl mx-auto">
          "I believe that <span className="font-semibold text-teal-700 dark:text-teal-400">great software</span> is the intersection of logic and user experience. 
          It's not enough to write code that compiles; the goal is to write code that scales, 
          interfaces that delight, and architectures that endure."
        </p>
      </section>

      {/* ===========================
          1. PROFESSIONAL EXPERIENCE (PAST & CURRENT) - PLACED BEFORE EDUCATION
      ============================ */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20 px-6 lg:px-8 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2.5 bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 rounded-xl">
              <Briefcase size={26} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Professional Experience</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">My past and current software engineering roles.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workList.map((work, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm hover:shadow-xl border-t-4 ${work.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-md uppercase tracking-wider">{work.year}</span>
                    {i === 0 && <span className="text-[10px] font-bold text-white bg-slate-900 dark:bg-teal-500 dark:text-slate-950 px-2 py-0.5 rounded-full">Current</span>}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{work.title}</h3>
                  <p className="text-teal-700 dark:text-teal-400 font-semibold text-sm mb-4">{work.company}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{work.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          2. EDUCATION JOURNEY
      ============================ */}
      <section className="py-20 px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2.5 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-xl">
              <BookOpen size={26} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Education Journey</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Academic foundation and core qualifications.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {educationList.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-md border-t-4 ${edu.color}`}
              >
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">{edu.year}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.title}</h3>
                <p className="text-teal-700 dark:text-teal-400 font-semibold text-sm mb-3">{edu.school}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          3. TECHNICAL ARSENAL
      ============================ */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20 px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2.5 bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 rounded-xl">
              <Terminal size={26} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Technical Arsenal</h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* FRONTEND */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 border border-blue-100 dark:border-blue-900/60">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Frontend Engineering</h3>
              <div className="flex flex-wrap gap-2">
                {(frontendSkills.length > 0 ? frontendSkills : ["React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "HTML5/CSS3"]).map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* BACKEND */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-100 dark:border-emerald-900/60">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Backend & APIs</h3>
              <div className="flex flex-wrap gap-2">
                {(backendSkills.length > 0 ? backendSkills : ["Node.js", "Express.js", "MongoDB", "C# / .NET", "SQL / MySQL", "REST APIs", "JWT Auth"]).map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* TOOLS & DEVOPS */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/60 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 border border-purple-100 dark:border-purple-900/60">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Tools & Cloud Deployments</h3>
              <div className="flex flex-wrap gap-2">
                {(toolsSkills.length > 0 ? toolsSkills : ["Docker", "AWS", "GCP", "VPS / Nginx", "Git & GitHub", "PM2", "Postman"]).map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <AboutBottom />

      {/* FINAL CTA */}
      <section className="py-20 px-6 text-center bg-white dark:bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-slate-900 dark:bg-slate-900 text-white rounded-3xl p-10 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-teal-400" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interested in working together?
          </h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto text-base md:text-lg">
            I’m available for full-time roles, software contracts, and exciting project collaborations.
          </p>

          <Link
            to="/hire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 rounded-xl font-bold hover:bg-teal-500 dark:hover:bg-teal-400 transition-all shadow-lg shadow-teal-600/30"
          >
            Start a Conversation <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}