import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Code, 
  Smartphone, 
  Database, 
  Layout, 
  Server, 
  Zap,
  Clock,
  Briefcase,
  Layers,
  Loader2,
  Sparkles
} from "lucide-react";
import { assets } from "../assets/assets";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import Spotlight3DCard from "../Components/Spotlight3DCard";
import GlowBadge from "../Components/GlowBadge";
import { TextScramble, TextWordCycler } from "../Components/AnimatedText";
import ThreeBackground3D from "../Components/ThreeBackground3D";
import HeroImage3D from "../Components/HeroImage3D";

export default function HireMe() {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);

  // --- MAIL LOGIC ---
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    const sendNotification = emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    const sendAutoReply = emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_AUTOREPLY_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    Promise.all([sendNotification, sendAutoReply])
      .then(() => {
        setIsSending(false);
        toast.success("Inquiry sent! Check your inbox for confirmation.", {
          style: {
            background: "#0b0f19",
            color: "#38bdf8",
            border: "1px solid #433bff",
          },
        });
        e.target.reset();
      })
      .catch((error) => {
        setIsSending(false);
        toast.error("Failed to send. Please try again or email directly.", {
          style: {
            background: "#0b0f19",
            color: "#f87171",
            border: "1px solid #ef4444",
          },
        });
        console.error("EmailJS Error:", error);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full bg-[#050315] text-[#fbfbfe] font-sans selection:bg-[#433bff] selection:text-white transition-colors duration-300">
      
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* ================= HERO SECTION WITH 3D CANVAS ================= */}
      <section className="relative py-28 px-6 lg:px-8 bg-[#050315] overflow-hidden border-b border-slate-800/80">
        
        {/* 3D Interactive Particle Background Canvas */}
        <ThreeBackground3D />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-20">
          
          {/* LEFT: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <GlowBadge variant="emerald">
                <span className="relative flex h-2 w-2 mr-1 inline-block align-middle">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
                </span>
                <TextScramble text="Available for New Projects & Consultations" />
              </GlowBadge>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-[#fbfbfe] leading-[1.15] mb-6 tracking-tight">
              Let’s build something <br />
              <TextWordCycler 
                words={[
                  "Meaningful.",
                  "Scalable.",
                  "High-Impact.",
                  "Production-Grade."
                ]}
              />
            </h1>

            <p className="text-lg text-[#dedcff]/80 leading-relaxed mb-8 max-w-lg">
              I help founders and engineering teams turn complex ideas into elegant, 
              scalable web applications. From clean frontends to robust backends, 
              I deliver production-ready code that drives results.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#hire-form"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#433bff] to-[#2f27ce] text-white px-8 py-3.5 rounded-xl font-bold hover:from-[#38bdf8] hover:to-[#433bff] transition-all duration-300 shadow-lg shadow-[#433bff]/25 hover:shadow-[#38bdf8]/40"
              >
                Start a Project <ArrowRight size={18} />
              </a>
              <a
                href="mailto:anubhawg.cse.jisu22@gmail.com"
                className="inline-flex items-center gap-2 bg-[#0b0f19]/90 text-[#dedcff] border border-slate-800 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800/80 hover:border-[#38bdf8] transition-all"
              >
                <Mail size={18} className="text-[#38bdf8]" /> Email Me
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Interactive 3D Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center relative z-20"
          >
            <HeroImage3D />
          </motion.div>
        </div>
      </section>


      {/* ================= TECHNICAL CAPABILITIES GRID (3D SPOTLIGHT CARDS) ================= */}
      <section className="py-24 px-6 lg:px-8 bg-[#050315] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 text-[#38bdf8] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles size={14} className="animate-pulse" /> Engineering Expertise
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#fbfbfe]">
              Technical <span className="bg-gradient-to-r from-[#38bdf8] via-[#433bff] to-[#a78bfa] bg-clip-text text-transparent">Capabilities</span>
            </h2>
            <p className="mt-4 text-[#dedcff]/80 text-lg">
              I don't just write code; I build solutions. Here is how I can contribute to your success.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: <Layout className="text-[#38bdf8]" />, title: "Full-Stack Web Apps", desc: "End-to-end MERN applications with authentication, databases, and responsive UI." },
              { icon: <Code className="text-[#433bff]" />, title: "Frontend Development", desc: "Pixel-perfect implementations using React 19, Tailwind CSS v4, and Framer Motion." },
              { icon: <Server className="text-[#a78bfa]" />, title: "Backend API Design", desc: "Scalable Node.js/Express & C# .NET APIs with secure MFA authentication and optimized queries." },
              { icon: <Zap className="text-amber-400" />, title: "Performance Tuning", desc: "Optimizing load times, fixing bugs, and refactoring legacy code for maximum speed." },
              { icon: <Database className="text-[#34d399]" />, title: "Database Architecture", desc: "Designing efficient schemas in MongoDB or SQL for scalable data management." },
              { icon: <Smartphone className="text-[#c084fc]" />, title: "Responsive Design", desc: "Ensuring your product looks and works perfectly on every device, from mobile to desktop." },
            ].map((s, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Spotlight3DCard
                  glowColor="rgba(67, 59, 255, 0.25)"
                  spotlightColor="rgba(56, 189, 248, 0.15)"
                  className="p-8 bg-[#0b0f19]/90 backdrop-blur-xl border border-slate-800/80 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-[#050315] border border-slate-800/80 rounded-xl flex items-center justify-center mb-6 shadow-md">
                      {s.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#fbfbfe] mb-3">
                      {s.title}
                    </h3>
                    <p className="text-[#dedcff]/80 leading-relaxed text-sm">
                      {s.desc}
                    </p>
                  </div>
                </Spotlight3DCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ================= ENGAGEMENT MODELS SECTION ================= */}
      <section className="py-24 px-6 lg:px-8 bg-[#0b0f19]/60 text-white border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Why Me */}
            <div>
               <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Why partner with me?</h2>
               <p className="text-[#dedcff]/80 text-lg mb-10 leading-relaxed">
                 I bridge the gap between complex engineering and intuitive user experience. 
                 When you hire me, you get transparency, speed, and code that scales.
               </p>

               <div className="space-y-5">
                 {["Direct communication & daily updates", "Clean, documented, and maintainable code", "Focus on business metrics & performance", "Post-launch support & reliability"].map((item, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className="p-1.5 rounded-xl bg-[#433bff]/20 text-[#38bdf8] border border-[#433bff]/30"><CheckCircle2 size={20} /></div>
                      <span className="text-base font-semibold text-[#fbfbfe]">{item}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Right: Engagement Models with 3D Spotlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               {[
                 { title: "Project Based", icon: <Layers className="text-[#38bdf8]" />, desc: "Fixed scope, clear timeline." },
                 { title: "Hourly / Retainer", icon: <Clock className="text-[#433bff]" />, desc: "Ongoing support & updates." },
                 { title: "Consulting", icon: <Briefcase className="text-[#a78bfa]" />, desc: "Architecture & tech strategy." },
                 { title: "Team Augmentation", icon: <Zap className="text-amber-400" />, desc: "Join your existing team." },
               ].map((m, i) => (
                 <Spotlight3DCard
                   key={i}
                   glowColor="rgba(56, 189, 248, 0.2)"
                   spotlightColor="rgba(67, 59, 255, 0.15)"
                   className="p-6 bg-[#050315]/90 backdrop-blur-xl border border-slate-800/80"
                 >
                    <div className="mb-4">{m.icon}</div>
                    <h3 className="font-bold text-lg text-[#fbfbfe] mb-1">{m.title}</h3>
                    <p className="text-[#dedcff]/70 text-sm">{m.desc}</p>
                 </Spotlight3DCard>
               ))}
            </div>
        </div>
      </section>


      {/* ================= CONTACT FORM AREA WITH 3D SPOTLIGHT ================= */}
      <section id="hire-form" className="py-24 px-6 lg:px-8 bg-[#050315]">
        <div className="max-w-5xl mx-auto">
          <Spotlight3DCard
            glowColor="rgba(67, 59, 255, 0.35)"
            spotlightColor="rgba(56, 189, 248, 0.2)"
            className="bg-[#0b0f19]/95 backdrop-blur-2xl border border-slate-800/90 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
               
               {/* Left: Info Panel */}
               <div className="bg-[#050315]/90 p-10 text-white flex flex-col justify-between border-r border-slate-800/80">
                  <div>
                    <h3 className="text-2xl font-extrabold mb-4 text-[#fbfbfe]">Let's Talk</h3>
                    <p className="text-[#dedcff]/80 mb-8 text-sm leading-relaxed">Fill out the form and I'll get back to you within 24 hours.</p>
                  </div>
                  
                  <div className="space-y-6 text-sm">
                     <div>
                       <p className="text-[#38bdf8] uppercase text-xs font-bold tracking-wider mb-1">Email</p>
                       <p className="font-semibold text-[#fbfbfe]">anubhawg.cse.jisu22@gmail.com</p>
                     </div>
                     <div>
                       <p className="text-[#38bdf8] uppercase text-xs font-bold tracking-wider mb-1">Location</p>
                       <p className="font-semibold text-[#fbfbfe]">Kolkata, India (Open to Remote)</p>
                     </div>
                  </div>
               </div>

               {/* Right: The Form */}
               <div className="p-8 lg:p-12">
                 <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">Name</label>
                        <input name="user_name" type="text" required className="w-full px-4 py-3.5 rounded-xl bg-[#050315]/80 border border-slate-800/80 text-[#fbfbfe] placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] focus:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">Email</label>
                        <input name="user_email" type="email" required className="w-full px-4 py-3.5 rounded-xl bg-[#050315]/80 border border-slate-800/80 text-[#fbfbfe] placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] focus:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300" placeholder="john@company.com" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">Project Type</label>
                      <select name="project_type" className="w-full px-4 py-3.5 rounded-xl bg-[#050315]/80 border border-slate-800/80 text-[#fbfbfe] focus:outline-none focus:border-[#38bdf8] focus:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300">
                        <option value="Select a service...">Select a service...</option>
                        <option value="Full-Stack Development">Full-Stack Development</option>
                        <option value="Frontend UI/UX">Frontend UI/UX</option>
                        <option value="Backend/API">Backend/API</option>
                        <option value="Consultation">Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">Details</label>
                      <textarea name="message" required rows="4" className="w-full px-4 py-3.5 rounded-xl bg-[#050315]/80 border border-slate-800/80 text-[#fbfbfe] placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] focus:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300 resize-none" placeholder="Tell me about your project, budget, and timeline..."></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSending}
                      className={`
                        w-full font-bold py-4 rounded-xl shadow-lg shadow-[#433bff]/25 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer
                        ${isSending ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-[#433bff] to-[#2f27ce] text-white hover:from-[#38bdf8] hover:to-[#433bff] hover:shadow-[#38bdf8]/40"}
                      `}
                    >
                      {isSending ? (
                        <>Sending... <Loader2 className="animate-spin" size={20} /></>
                      ) : (
                        <>Send Inquiry <ArrowRight size={18} /></>
                      )}
                    </button>
                 </form>
               </div>

            </div>
          </Spotlight3DCard>
        </div>
      </section>

    </div>
  );
}