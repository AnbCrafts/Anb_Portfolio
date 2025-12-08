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
  Layers
} from "lucide-react";
import { assets } from "../assets/assets";

export default function HireMe() {

  // Animation Stagger
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
    <div className="w-full bg-white font-sans selection:bg-teal-100 selection:text-teal-900">

      {/* ================= HERO SECTION ================= */}
      <section className="relative py-24 px-6 lg:px-8 bg-slate-50 overflow-hidden">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for new projects
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
              Let’s build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                meaningful.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              I help founders and businesses turn complex ideas into elegant, 
              scalable web applications. From clean frontends to robust backends, 
              I deliver production-grade code that drives growth.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#hire-form"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
              >
                Start a Project <ArrowRight size={18} />
              </a>
              <a
                href="mailto:yourmail@gmail.com"
                className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-all"
              >
                <Mail size={18} /> Email Me
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Visual (Illustration or Abstract UI) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex justify-center relative"
          >
             {/* Decorative blob behind image */}
             <div className="absolute inset-0 bg-gradient-to-tr from-teal-200 to-blue-200 rounded-full blur-[60px] opacity-30" />
             
             <img
               src={assets.hire} 
               alt="Collaboration"
               className="relative w-full max-w-md object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
             />
          </motion.div>
        </div>
      </section>


      {/* ================= SERVICES GRID ================= */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Technical <span className="text-teal-600">Capabilities</span>
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
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
              {
                icon: <Layout className="text-blue-500" />,
                title: "Full-Stack Web Apps",
                desc: "End-to-end MERN applications with authentication, databases, and responsive UI.",
              },
              {
                icon: <Code className="text-teal-500" />,
                title: "Frontend Development",
                desc: "Pixel-perfect implementations using React, Tailwind CSS, and Framer Motion.",
              },
              {
                icon: <Server className="text-purple-500" />,
                title: "Backend API Design",
                desc: "Scalable Node.js/Express APIs with secure authentication and optimized database queries.",
              },
              {
                icon: <Zap className="text-amber-500" />,
                title: "Performance Tuning",
                desc: "Optimizing load times, fixing bugs, and refactoring legacy code for better speed.",
              },
              {
                icon: <Database className="text-emerald-500" />,
                title: "Database Architecture",
                desc: "Designing efficient schemas in MongoDB or SQL for scalable data management.",
              },
              {
                icon: <Smartphone className="text-indigo-500" />,
                title: "Responsive Design",
                desc: "Ensuring your product looks and works perfectly on every device, from mobile to desktop.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-teal-100 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:shadow-md transition-all">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-700 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ================= ENGAGEMENT & PROCESS ================= */}
      <section className="py-24 px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Why Me */}
            <div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6">
                 Why partner with me?
               </h2>
               <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                 I bridge the gap between complex engineering and intuitive user experience. 
                 When you hire me, you get transparency, speed, and code that scales.
               </p>

               <div className="space-y-6">
                 {[
                   "Direct communication & daily updates",
                   "Clean, documented, and maintainable code",
                   "Focus on business metrics & user conversion",
                   "Post-launch support & reliability"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className="p-1 rounded-full bg-teal-500/20 text-teal-400">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="text-lg font-medium">{item}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Right: Engagement Models */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { title: "Project Based", icon: <Layers />, desc: "Fixed scope, clear timeline." },
                 { title: "Hourly / Retainer", icon: <Clock />, desc: "Ongoing support & updates." },
                 { title: "Consulting", icon: <Briefcase />, desc: "Architecture & tech strategy." },
                 { title: "Team Augmentation", icon: <Zap />, desc: "Join your existing team." },
               ].map((m, i) => (
                 <div key={i} className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-colors">
                    <div className="text-teal-400 mb-4">{m.icon}</div>
                    <h3 className="font-bold text-lg mb-1">{m.title}</h3>
                    <p className="text-slate-400 text-sm">{m.desc}</p>
                 </div>
               ))}
            </div>

        </div>
      </section>


      {/* ================= CONTACT FORM AREA ================= */}
      <section id="hire-form" className="py-24 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
             
             {/* Left: Info Panel */}
             <div className="bg-slate-900 p-10 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Let's Talk</h3>
                  <p className="text-slate-400 mb-8">
                    Fill out the form and I'll get back to you within 24 hours.
                  </p>
                </div>
                
                <div className="space-y-6 text-sm">
                   <div>
                     <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-1">Email</p>
                     <p className="font-medium">anubhaw@example.com</p>
                   </div>
                   <div>
                     <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-1">Location</p>
                     <p className="font-medium">Kolkata, India (Remote)</p>
                   </div>
                </div>
             </div>

             {/* Right: The Form */}
             <div className="p-10 lg:p-12">
               <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" placeholder="john@company.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Project Type</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all text-slate-600">
                      <option>Select a service...</option>
                      <option>Full-Stack Development</option>
                      <option>Frontend UI/UX</option>
                      <option>Backend/API</option>
                      <option>Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Details</label>
                    <textarea rows="4" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none" placeholder="Tell me about your project, budget, and timeline..."></textarea>
                  </div>

                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                    Send Inquiry <ArrowRight size={18} />
                  </button>
               </form>
             </div>

          </div>
        </div>
      </section>

    </div>
  );
}