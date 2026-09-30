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
  Terminal,
  Briefcase,
  BookOpen,
  ArrowRight,
  Sparkles
} from "lucide-react";
import AboutBottom from "../Components/AboutBottom";
import Spotlight3DCard from "../Components/Spotlight3DCard";
import GlowBadge from "../Components/GlowBadge";
import { TextScramble, TextWordCycler } from "../Components/AnimatedText";
import ThreeBackground3D from "../Components/ThreeBackground3D";
import HeroImage3D from "../Components/HeroImage3D";

// Fallback Mock Data for Experience
const workFallback = [
  {
    title: "Software Developer",
    company: "Management & Computer Consultants (MCC)",
    year: "Sept 2026 – Present",
    desc: "Undergoing intensive software development training in C#, .NET framework, and SQL database management while building scalable enterprise applications.",
    type: "work",
  },
  {
    title: "MERN Stack Developer Intern",
    company: "Hansraj Ventures",
    year: "May 2026 – Sept 2026",
    desc: "Developed scalable MERN stack web applications using MongoDB, Express.js, React.js, and Node.js. Built secure RESTful APIs and managed deployments on AWS, GCP, VPS, Docker, Nginx, and PM2.",
    type: "work",
  },
  {
    title: "Full-Stack Developer",
    company: "Personal Projects & Freelance",
    year: "2025",
    desc: "Engineered production-level SaaS applications including Nirman AI, TrackForge & FitForWork with scalable architecture and responsive design.",
    type: "work",
  }
];

const educationFallback = [
  {
    title: "B.Tech in CSE",
    school: "JIS College of Engineering",
    year: "2022 – 2026",
    desc: "Specializing in Computer Science & Engineering. Active member of coding club and technical fest organizing committees.",
  },
  {
    title: "Higher Secondary (PCM)",
    school: "Science Stream",
    year: "2021 – 2023",
    desc: "Focused on Physics, Chemistry, and Mathematics with 91.2% aggregate. Built strong logic and analytical skills.",
  },
  {
    title: "Matriculation",
    school: "Secondary Education",
    year: "2019 – 2020",
    desc: "Graduated with distinction. Developed an early passion for computer science and web development.",
  }
];

export default function AboutPage() {
  const experiences = useSelector((state) => state.portfolio.experience);
  const settings = useSelector((state) => state.portfolio.settings);
  const skills = useSelector((state) => state.portfolio.skills);

  // Group work experiences from DB
  const dbWork = experiences
    .filter((e) => e.type === "work")
    .sort((a, b) => (b.displayOrder || 0) - (a.displayOrder || 0))
    .map((w) => ({
      title: w.title,
      company: w.company,
      year: w.year,
      desc: w.desc,
    }));

  const workList = dbWork.length > 0 ? dbWork : workFallback;

  // Group education from DB
  const dbEducation = experiences
    .filter((e) => e.type === "education")
    .sort((a, b) => (b.displayOrder || 0) - (a.displayOrder || 0))
    .map((edu) => ({
      title: edu.title,
      school: edu.company,
      year: edu.year,
      desc: edu.desc,
    }));

  const educationList = dbEducation.length > 0 ? dbEducation : educationFallback;

  // Group skills into category blocks
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
    <main className="w-full bg-[#050315] text-[#fbfbfe] transition-colors duration-300 overflow-hidden selection:bg-[#433bff] selection:text-white">
      
      {/* ================= HERO SECTION WITH 3D CANVAS ================= */}
      <section className="relative pt-28 pb-20 px-6 lg:px-8 bg-[#050315] border-b border-slate-800/80">
        
        {/* 3D Interactive Particle Background Canvas */}
        <ThreeBackground3D />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-20">
          
          {/* LEFT: TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <GlowBadge variant="cyan">
                <span className="relative flex h-2 w-2 mr-1 inline-block align-middle">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]"></span>
                </span>
                <TextScramble text="Full-Stack Engineer & Software Dev @ MCC" />
              </GlowBadge>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-[#fbfbfe] leading-[1.15] mb-6 tracking-tight">
              Crafting Scalable <br />
              <TextWordCycler 
                words={[
                  "Digital Products.",
                  "SaaS Platforms.",
                  "Web Applications.",
                  "Enterprise APIs."
                ]}
              />
            </h1>

            <p className="text-lg text-[#dedcff]/80 leading-relaxed mb-8">
              Hi, I'm <span className="font-bold text-[#fbfbfe]">Anubhaw Gupta</span>. 
              I am a Full-Stack Developer driven by the belief that software should not just work—it should feel effortless and performant. 
              Currently building enterprise applications at MCC and specializing in MERN stack & C# / .NET development.
            </p>

            {/* Quick Stats / Info */}
            <div className="flex flex-wrap gap-6 text-sm font-semibold text-[#dedcff]/80 mb-8">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#38bdf8]" /> {settings?.location || "Kolkata, India"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#38bdf8]" /> Born in 2004
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-[#38bdf8]" /> {settings?.email || "anubhawg.cse.jisu22@gmail.com"}
              </div>
            </div>

            {/* Resume Dropdown Component & Hire Action */}
            <div className="flex flex-wrap items-center gap-4">
              <ResumeDropDown />
              <Link
                to="/hire"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#433bff] to-[#2f27ce] text-white rounded-xl font-bold hover:from-[#38bdf8] hover:to-[#433bff] transition-all shadow-lg shadow-[#433bff]/25 hover:shadow-[#38bdf8]/40"
              >
                Hire Me <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: 3D PORTRAIT FRAME */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center relative z-20"
          >
            <HeroImage3D />
          </motion.div>
        </div>
      </section>


      {/* ================= BIO / PHILOSOPHY ================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center bg-[#050315]">
        <div className="mb-4">
          <GlowBadge variant="indigo" icon={Sparkles}>Engineering Vision</GlowBadge>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#fbfbfe] mb-4">My Development Philosophy</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#433bff] to-[#38bdf8] mx-auto rounded-full mb-8" />
        
        <p className="text-xl md:text-2xl text-[#dedcff] leading-relaxed font-light max-w-4xl mx-auto">
          "I believe that <span className="font-semibold text-[#38bdf8]">great software</span> is the intersection of logic and user experience. 
          It's not enough to write code that compiles; the goal is to write code that scales, 
          interfaces that delight, and architectures that endure."
        </p>
      </section>


      {/* ================= 1. PROFESSIONAL EXPERIENCE (3D SPOTLIGHT CARDS) ================= */}
      <section className="bg-[#050315] py-20 px-6 lg:px-8 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-[#433bff]/20 text-[#38bdf8] rounded-xl border border-[#433bff]/30">
              <Briefcase size={26} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#fbfbfe]">Professional Experience</h2>
              <p className="text-[#dedcff]/70 text-sm mt-1">My past and current software engineering roles.</p>
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
              >
                <Spotlight3DCard
                  glowColor="rgba(67, 59, 255, 0.25)"
                  spotlightColor="rgba(56, 189, 248, 0.15)"
                  className="bg-[#0b0f19]/90 backdrop-blur-xl p-8 border border-slate-800/80 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <GlowBadge variant="cyan">{work.year}</GlowBadge>
                      {i === 0 && (
                        <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#433bff] to-[#2f27ce] px-2.5 py-0.5 rounded-full shadow-sm">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#fbfbfe] mb-1">{work.title}</h3>
                    <p className="text-[#38bdf8] font-semibold text-sm mb-4">{work.company}</p>
                    <p className="text-[#dedcff]/80 text-sm leading-relaxed">{work.desc}</p>
                  </div>
                </Spotlight3DCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= 2. EDUCATION JOURNEY ================= */}
      <section className="py-20 px-6 lg:px-8 bg-[#050315]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-[#433bff]/20 text-[#38bdf8] rounded-xl border border-[#433bff]/30">
              <BookOpen size={26} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#fbfbfe]">Education Journey</h2>
              <p className="text-[#dedcff]/70 text-sm mt-1">Academic foundation and core qualifications.</p>
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
              >
                <Spotlight3DCard
                  glowColor="rgba(56, 189, 248, 0.2)"
                  spotlightColor="rgba(67, 59, 255, 0.15)"
                  className="bg-[#0b0f19]/90 backdrop-blur-xl p-8 border border-slate-800/80 h-full"
                >
                  <span className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider block mb-2">{edu.year}</span>
                  <h3 className="text-xl font-bold text-[#fbfbfe] mb-1">{edu.title}</h3>
                  <p className="text-[#a78bfa] font-semibold text-sm mb-3">{edu.school}</p>
                  <p className="text-[#dedcff]/80 text-sm leading-relaxed">{edu.desc}</p>
                </Spotlight3DCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= 3. TECHNICAL ARSENAL ================= */}
      <section className="bg-[#050315] py-20 px-6 lg:px-8 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-[#433bff]/20 text-[#38bdf8] rounded-xl border border-[#433bff]/30">
              <Terminal size={26} />
            </div>
            <h2 className="text-3xl font-extrabold text-[#fbfbfe]">Technical Arsenal</h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* FRONTEND */}
            <motion.div variants={itemVariants}>
              <Spotlight3DCard
                glowColor="rgba(56, 189, 248, 0.25)"
                spotlightColor="rgba(67, 59, 255, 0.15)"
                className="p-8 bg-[#0b0f19]/90 backdrop-blur-xl border border-slate-800/80 h-full"
              >
                <div className="w-12 h-12 bg-[#050315] border border-slate-800/80 rounded-xl flex items-center justify-center text-[#38bdf8] mb-6">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#fbfbfe] mb-4">Frontend Engineering</h3>
                <div className="flex flex-wrap gap-2">
                  {(frontendSkills.length > 0 ? frontendSkills : ["React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "HTML5/CSS3"]).map(skill => (
                    <GlowBadge key={skill} variant="cyan">{skill}</GlowBadge>
                  ))}
                </div>
              </Spotlight3DCard>
            </motion.div>

            {/* BACKEND */}
            <motion.div variants={itemVariants}>
              <Spotlight3DCard
                glowColor="rgba(67, 59, 255, 0.25)"
                spotlightColor="rgba(56, 189, 248, 0.15)"
                className="p-8 bg-[#0b0f19]/90 backdrop-blur-xl border border-slate-800/80 h-full"
              >
                <div className="w-12 h-12 bg-[#050315] border border-slate-800/80 rounded-xl flex items-center justify-center text-[#433bff] mb-6">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#fbfbfe] mb-4">Backend &amp; APIs</h3>
                <div className="flex flex-wrap gap-2">
                  {(backendSkills.length > 0 ? backendSkills : ["Node.js", "Express.js", "MongoDB", "C# / .NET", "SQL / MySQL", "REST APIs", "JWT Auth"]).map(skill => (
                    <GlowBadge key={skill} variant="indigo">{skill}</GlowBadge>
                  ))}
                </div>
              </Spotlight3DCard>
            </motion.div>

            {/* TOOLS & DEVOPS */}
            <motion.div variants={itemVariants}>
              <Spotlight3DCard
                glowColor="rgba(167, 139, 250, 0.25)"
                spotlightColor="rgba(56, 189, 248, 0.15)"
                className="p-8 bg-[#0b0f19]/90 backdrop-blur-xl border border-slate-800/80 h-full"
              >
                <div className="w-12 h-12 bg-[#050315] border border-slate-800/80 rounded-xl flex items-center justify-center text-[#a78bfa] mb-6">
                  <Code2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#fbfbfe] mb-4">Tools &amp; Cloud Deployments</h3>
                <div className="flex flex-wrap gap-2">
                  {(toolsSkills.length > 0 ? toolsSkills : ["Docker", "AWS", "GCP", "VPS / Nginx", "Git & GitHub", "PM2", "Postman"]).map(skill => (
                    <GlowBadge key={skill} variant="purple">{skill}</GlowBadge>
                  ))}
                </div>
              </Spotlight3DCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <AboutBottom />

      {/* FINAL CTA */}
      <section className="py-20 px-6 text-center bg-[#050315]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Spotlight3DCard
            glowColor="rgba(67, 59, 255, 0.35)"
            spotlightColor="rgba(56, 189, 248, 0.2)"
            className="p-10 md:p-12 bg-[#0b0f19]/95 backdrop-blur-2xl border border-slate-800/90 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#38bdf8] via-[#433bff] to-[#a78bfa]" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#fbfbfe] mb-4">
              Interested in working together?
            </h2>
            <p className="text-[#dedcff]/80 mb-8 max-w-lg mx-auto text-base md:text-lg">
              I’m available for full-time roles, software contracts, and exciting project collaborations.
            </p>

            <Link
              to="/hire"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#433bff] to-[#2f27ce] text-white rounded-xl font-bold hover:from-[#38bdf8] hover:to-[#433bff] transition-all duration-300 shadow-lg shadow-[#433bff]/25 hover:shadow-[#38bdf8]/40"
            >
              Start a Conversation <ArrowRight size={18} />
            </Link>
          </Spotlight3DCard>
        </motion.div>
      </section>
    </main>
  );
}