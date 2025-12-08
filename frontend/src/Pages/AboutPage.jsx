// AboutPage.jsx
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { 
  Download, 
  Mail, 
  MapPin, 
  Calendar, 
  Code2, 
  Cpu, 
  Globe, 
  Award, 
  BookOpen, 
  Terminal 
} from "lucide-react";
import AboutBottom from "../Components/AboutBottom";

export default function AboutPage() {
  
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
    <main className="w-full bg-white overflow-hidden">
      
      {/* ===========================
          HERO SECTION
      ============================ */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 bg-slate-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* LEFT: TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Who I Am
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
              More than just <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                lines of code.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Hi, I'm <span className="font-bold text-slate-900">Anubhaw Gupta</span>. 
              I am a Full-Stack Developer driven by the idea that software should not just work—it should feel seamless.
              I combine engineering precision with a love for clean design to build applications that solve real problems.
            </p>

            {/* Quick Stats / Info */}
            <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500 mb-8">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-teal-500" /> Kolkata, India
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-teal-500" /> Born in 2004
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-teal-500" /> Open to Work
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-600 transition-all shadow-lg shadow-slate-900/20"
              >
                <Download size={18} /> Download CV
              </a>
              <Link
                to="/hire" // Changed from /contact to /hire to match previous route
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-white hover:border-teal-300 hover:text-teal-700 transition-all"
              >
                Hire Me
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Abstract blobs behind image */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-teal-200 rounded-full blur-[80px] opacity-40 -z-10" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-200 rounded-full blur-[80px] opacity-40 -z-10" />

            <div className="relative w-[340px] md:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src={assets.hero3}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      
      {/* ===========================
          BIO / PHILOSOPHY
      ============================ */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">My Philosophy</h2>
        <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full mb-8" />
        
        <p className="text-xl text-slate-600 leading-relaxed font-light">
          "I believe that <span className="font-semibold text-teal-700">great software</span> is the intersection of logic and creativity. 
          It's not enough to write code that compiles; the goal is to write code that scales, 
          interfaces that delight, and architectures that endure."
        </p>
      </section>


      {/* ===========================
          EDUCATION
      ============================ */}
      <section className="bg-slate-50 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <BookOpen className="text-teal-600" size={28} />
            <h2 className="text-3xl font-bold text-slate-900">Education Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "B.Tech in CSE",
                school: "JIS College of Engineering",
                year: "2022 – 2026",
                desc: "Specializing in Computer Science. Active member of the coding club and tech fest committee.",
                color: "border-teal-500"
              },
              {
                title: "Higher Secondary (PCM)",
                school: "DR. BR Ambedkar College",
                year: "2021 – 2023",
                desc: "Focused on Physics, Chemistry, and Mathematics. Built strong logic and analytical skills.",
                color: "border-blue-500"
              },
              {
                title: "Matriculation",
                school: "Roy Academy",
                year: "2019 – 2020",
                desc: "Graduated with distinction. Developed an early interest in computer applications.",
                color: "border-purple-500"
              }
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border-t-4 ${edu.color}`}
              >
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{edu.year}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{edu.title}</h3>
                <p className="text-teal-700 font-medium mb-4">{edu.school}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ===========================
          SKILLS MATRIX
      ============================ */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Terminal className="text-teal-600" size={28} />
            <h2 className="text-3xl font-bold text-slate-900">Technical Arsenal</h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* FRONTEND */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Redux", "HTML5/CSS3"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-sm rounded-md shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* BACKEND */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-6">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express", "MongoDB", "Mongoose", "JWT Auth", "REST APIs"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-sm rounded-md shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* TOOLS */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Tools & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {["Git & GitHub", "Docker", "Postman", "VS Code", "Figma", "Vercel"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-sm rounded-md shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ===========================
          ACHIEVEMENTS
      ============================ */}
      <section className="bg-slate-900 text-white py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Award className="text-teal-400" size={28} />
            <h2 className="text-3xl font-bold">Key Milestones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Hack-o-Nova Hackathon",
                desc: "Built and deployed an AI-powered study planner in 36 hours. Secured position among top finalists.",
                icon: "🏆"
              },
              {
                title: "NPTEL Certification",
                desc: "Elite Silver certification in Java Programming. Scored in the top 5% of candidates nationwide.",
                icon: "📜"
              },
              {
                title: "MERN Training",
                desc: "Completed intensive industrial training at Ardent Computech. Built 3 production-ready apps.",
                icon: "🎓"
              }
            ].map((ach, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-teal-500 transition-colors"
              >
                <div className="text-4xl mb-4">{ach.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{ach.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{ach.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ===========================
          BOTTOM COMPONENT
      ============================ */}
      <AboutBottom />


      {/* ===========================
          FINAL CTA
      ============================ */}
      <section className="py-24 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-teal-50 rounded-3xl p-12 border border-teal-100"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to start a project?
          </h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg">
            I’m always open to freelance work, full-time roles, and interesting collaborations. Let's create something amazing.
          </p>

          <Link
            to="/hire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-600/30"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </section>

    </main>
  );
}