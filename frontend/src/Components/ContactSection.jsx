import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, ArrowRight, Loader2, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import Spotlight3DCard from "./Spotlight3DCard";
import GlowBadge from "./GlowBadge";
import { TextScramble } from "./AnimatedText";

export default function ContactSection() {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);

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
        toast.success("Message sent successfully! Check your inbox for confirmation.", {
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
        toast.error("Failed to send message. Please try again later.", {
          style: {
            background: "#0b0f19",
            color: "#f87171",
            border: "1px solid #ef4444",
          },
        });
        console.error("EmailJS Error:", error);
      });
  };

  const socialLinks = [
    {
      name: "Email",
      value: "anubhawg.cse.jisu22@gmail.com",
      icon: <Mail size={20} />,
      href: "mailto:anubhawg.cse.jisu22@gmail.com",
      variant: "cyan",
    },
    {
      name: "GitHub",
      value: "github.com/AnbCrafts",
      icon: <Github size={20} />,
      href: "https://github.com/AnbCrafts",
      variant: "indigo",
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/anubhaw",
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com",
      variant: "cyan",
    },
  ];

  return (
    <section id="contact" className="relative w-full bg-[#050315] text-[#fbfbfe] py-20 px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#433bff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#38bdf8]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* --- LEFT: INFO & SOCIALS --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <GlowBadge variant="emerald">
              <span className="relative flex h-2 w-2 mr-1 inline-block align-middle">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
              </span>
              AVAILABLE FOR WORK
            </GlowBadge>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#fbfbfe] mb-6 leading-tight tracking-tight">
            Let's build something <br />
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#433bff] to-[#a78bfa] bg-clip-text text-transparent">
              <TextScramble text="extraordinary." />
            </span>
          </h2>

          <p className="text-[#dedcff]/80 text-lg mb-10 leading-relaxed max-w-lg">
            Whether you have a project in mind, need a full-stack consultant, or just want to chat about tech—I'm actively looking for new opportunities.
          </p>

          {/* Social Cards Grid */}
          <div className="flex flex-col gap-4 max-w-md">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <Spotlight3DCard
                  glowColor="rgba(67, 59, 255, 0.25)"
                  spotlightColor="rgba(56, 189, 248, 0.15)"
                  className="p-4 bg-[#0b0f19]/90 backdrop-blur-xl border border-slate-800/80 hover:border-[#38bdf8]/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#433bff]/15 text-[#38bdf8] border border-[#433bff]/30 group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#38bdf8] uppercase tracking-wider">{link.name}</p>
                      <p className="text-sm font-semibold text-[#fbfbfe]">{link.value}</p>
                    </div>
                    <ArrowRight className="ml-auto w-5 h-5 text-[#dedcff]/50 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all" />
                  </div>
                </Spotlight3DCard>
              </a>
            ))}
          </div>
          
          <div className="mt-10 flex items-center gap-2 text-[#dedcff]/60 text-sm font-medium">
             <MapPin size={16} className="text-[#38bdf8]" /> Based in Kolkata, India • Open to Remote
          </div>
        </motion.div>

        {/* --- RIGHT: FORM CARD WITH 3D SPOTLIGHT --- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Spotlight3DCard
            glowColor="rgba(67, 59, 255, 0.35)"
            spotlightColor="rgba(56, 189, 248, 0.2)"
            className="p-8 md:p-10 bg-[#0b0f19]/90 backdrop-blur-2xl border border-slate-800/90 shadow-2xl shadow-black/80"
          >
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              
              <h3 className="text-2xl font-extrabold text-[#fbfbfe]">Send a Message</h3>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">Name</label>
                  <input
                    name="user_name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#050315]/80 border border-slate-800/80 text-[#fbfbfe] placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] focus:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">Email</label>
                  <input
                    name="user_email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#050315]/80 border border-slate-800/80 text-[#fbfbfe] placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] focus:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#050315]/80 border border-slate-800/80 text-[#fbfbfe] placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] focus:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSending}
                  type="submit"
                  className={`
                    w-full font-bold py-4 rounded-xl shadow-lg shadow-[#433bff]/25 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer
                    ${isSending ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-[#433bff] to-[#2f27ce] text-white hover:from-[#38bdf8] hover:to-[#433bff] hover:shadow-[#38bdf8]/40"}
                  `}
                >
                  {isSending ? (
                    <>Sending... <Loader2 className="animate-spin" size={20} /></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </motion.button>
              </div>
            </form>
          </Spotlight3DCard>
        </motion.div>

      </div>
    </section>
  );
}