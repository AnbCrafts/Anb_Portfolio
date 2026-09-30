import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ResumeDropDown from "./ResumeDropDown";
import { ArrowRight, Code2, Sparkles, BookOpen } from "lucide-react";
import { TextScramble, TextWordCycler } from "./AnimatedText";
import ThreeBackground3D from "./ThreeBackground3D";
import HeroImage3D from "./HeroImage3D";
import GlowBadge from "./GlowBadge";

// Animation Variants
const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9, rotate: -2 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: "backOut" } },
};

const techPills = [
  "React.js", "Node.js", "Express.js", "MongoDB", "C# / .NET", "SQL", "TypeScript", "Tailwind CSS", "Docker", "Vercel"
];

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative w-full bg-[#050315] dark:bg-[#050315] text-[#fbfbfe] z-30 pt-28 pb-32 md:pt-36 md:pb-40 min-h-[calc(100vh-70px)] flex flex-col justify-center transition-colors duration-300 overflow-hidden">
      
      {/* 1. INTERACTIVE THREE.JS 3D PARTICLE & WIREFRAME CONSTELLATION CANVAS */}
      <ThreeBackground3D />

      {/* 2. BACKGROUND: Tech Grid Pattern */}
      <div className="absolute inset-0 w-full h-full bg-[#050315] dark:bg-[#050315] bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>
      
      {/* Gradient Atmosphere Beams */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] bg-[#433bff]/20 rounded-full blur-[110px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-[#38bdf8]/15 rounded-full blur-[110px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full flex-1 flex items-start z-20">
        <div className="flex flex-col-reverse md:flex-row items-start gap-12 lg:gap-16 w-full">

          {/* LEFT: Rich Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative z-30"
          >
            {/* Premium Glow Badge Status Tags */}
            <motion.div variants={textVariant} className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-5">
              <GlowBadge variant="cyan">
                <span className="relative flex h-2 w-2 mr-1.5 inline-block align-middle">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]"></span>
                </span>
                <TextScramble text="Software Developer @ MCC • MERN & C# / .NET" />
              </GlowBadge>

              <Link to="/blogs">
                <GlowBadge variant="amber" icon={Sparkles}>
                  <span>Read Devlog &amp; Articles</span> <ArrowRight size={12} className="inline ml-0.5" />
                </GlowBadge>
              </Link>
            </motion.div>

            {/* Main Headline with Motion Primitives Word Cycler (Locked Layout) */}
            <motion.h1 variants={textVariant} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#fbfbfe] leading-[1.15] tracking-tight mb-5 min-h-[135px] sm:min-h-[155px] lg:min-h-[175px] flex flex-col justify-start">
              <span>Crafting High-Impact</span>
              <TextWordCycler 
                words={[
                  "Full-Stack Apps.",
                  "Autonomous AI.",
                  "Scalable Web APIs.",
                  "Modern SaaS Apps."
                ]}
              />
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p variants={textVariant} className="text-base sm:text-lg text-[#dedcff]/80 max-w-xl leading-relaxed mb-6">
              Hi, I’m <span className="font-bold text-[#fbfbfe]">Anubhaw Gupta</span>. A Full-Stack Developer specializing in high-performance MERN stack apps, C# / .NET services, and modern UI engineering. Turning complex ideas into sleek digital products.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={textVariant} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToProjects}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#433bff] to-[#2f27ce] text-white px-7 py-3.5 rounded-xl font-bold hover:from-[#38bdf8] hover:to-[#433bff] transition-all shadow-lg shadow-[#433bff]/25 cursor-pointer"
              >
                View My Work <ArrowRight size={18} />
              </motion.button>

              <Link
                to="/blogs"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0b0f19]/90 text-[#dedcff] border border-slate-800 px-5 py-3.5 rounded-xl font-bold hover:bg-slate-800/80 hover:border-[#38bdf8] transition-all"
              >
                <BookOpen size={18} className="text-[#38bdf8]" /> Read Devlog
              </Link>

              <ResumeDropDown />
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div variants={textVariant} className="w-full">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-3">
                <Code2 size={14} /> Primary Tech Stack &amp; Skills
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {techPills.map((tech, i) => (
                  <GlowBadge key={i} variant="indigo">
                    {tech}
                  </GlowBadge>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Interactive 3D Developer Portrait Component (Top Anchored) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageVariant}
            className="w-full md:w-1/2 flex justify-center relative z-20 self-start pt-2"
          >
            <HeroImage3D />
          </motion.div>

        </div>
      </div>
    </section>
  );
}