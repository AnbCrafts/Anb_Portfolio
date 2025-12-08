import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, ArrowRight, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

export default function ContactSection() {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Replace these strings with your actual IDs from EmailJS dashboard
    // Service ID, Template ID, Public Key (Account > API Keys)
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,   // Updated
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  // Updated
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY     
      )
      .then(
        (result) => {
          setIsSending(false);
          toast.success("Message sent successfully!", {
            style: {
              background: "#134e4a", // Teal-900
              color: "#fff",
            },
          });
          e.target.reset(); // Clear form
        },
        (error) => {
          setIsSending(false);
          toast.error("Failed to send. Please try again later.", {
             style: {
              background: "#7f1d1d", // Red-900
              color: "#fff",
            },
          });
          console.error(error.text);
        }
      );
  };

  // ... (Social links logic remains the same)
  const socialLinks = [
    {
      name: "Email",
      value: "anubhawg.cse.jisu22@gmail.com", 
      icon: <Mail size={20} />,
      href: "anubhawg.cse.jisu22@gmail.com",
      color: "hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50",
    },
    {
      name: "GitHub",
      value: "github.com/AnbCrafts",
      icon: <Github size={20} />,
      href: "https://github.com/AnbCrafts",
      color: "hover:border-slate-800 hover:text-slate-900 hover:bg-slate-50",
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/anubhaw",
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com",
      color: "hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50",
    },
  ];

  return (
    <section id="contact" className="relative w-full bg-white py-24 px-6 lg:px-8 overflow-hidden">
      
      {/* Toast Notification Container */}
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Abstract Background Decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* --- LEFT: INFO & SOCIALS --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* ... (Same text content as before) ... */}
           <div className="flex items-center gap-2 mb-6">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-sm font-semibold text-teal-600 tracking-wide uppercase">Available for work</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Let's build something <br />
            <span className="text-teal-600">extraordinary.</span>
          </h2>

          <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-lg">
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
                className={`
                   group flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300
                   ${link.color}
                `}
              >
                <div className="p-3 rounded-lg bg-slate-50 text-slate-600 group-hover:bg-white group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{link.name}</p>
                  <p className="text-sm font-semibold text-slate-800">{link.value}</p>
                </div>
                <ArrowRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-current transition-colors opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>
          
          <div className="mt-10 flex items-center gap-2 text-slate-500 text-sm">
             <MapPin size={16} /> Based in Kolkata, India • Open to Remote
          </div>
        </motion.div>

        {/* --- RIGHT: FORM CARD --- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
           <div className="absolute inset-0 bg-teal-600 rounded-2xl rotate-3 translate-x-2 translate-y-2 opacity-10" />

           {/* FORM START */}
           <form 
             ref={formRef} 
             onSubmit={sendEmail} 
             className="relative bg-white border border-slate-100 p-8 md:p-10 rounded-2xl shadow-2xl shadow-slate-200/50"
           >
             
             <h3 className="text-2xl font-bold text-slate-800 mb-6">Send a message</h3>

             <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <input
                    name="user_name" // Required by EmailJS
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    name="user_email" // Required by EmailJS
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <textarea
                    name="message" // Required by EmailJS
                    required
                    rows="4"
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSending}
                  type="submit"
                  className={`
                    w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all
                    ${isSending ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-teal-600"}
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
        </motion.div>

      </div>
    </section>
  );
}