import { motion } from "framer-motion";
import { Mail, ArrowRightCircle, CheckCircle } from "lucide-react";
import { assets } from "../assets/assets";

export default function HireMe() {
  return (
    <div className="w-full bg-white">

      {/* ========= HERO SECTION ========= */}
      <section className="py-24 px-6 lg:px-8 bg-teal-50 border-b border-teal-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-teal-700 leading-tight">
              Let’s Build Something Meaningful Together
            </h1>

            <p className="text-gray-600 mt-4 text-lg max-w-lg">
              Whether you need a production-grade web application, a sleek frontend,
              backend APIs, or improvements in your existing product — I can help you
              turn your ideas into beautiful, scalable digital experiences.
            </p>

            <a
              href="#hire-form"
              className="mt-6 inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition shadow-md"
            >
              Start a Project <ArrowRightCircle size={20} />
            </a>
          </motion.div>

          {/* RIGHT DECOR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex justify-center"
          >
            <img
              src={assets.hire}
              alt="Hire Me Illustration"
              className="w-[80%] object-contain"
            />
          </motion.div>

        </div>
      </section>

      {/* ========= WHAT I OFFER ========= */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-semibold text-teal-700">
            What I Can Do For You
          </h2>
          <div className="w-20 h-[3px] bg-teal-600 mt-2 mb-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* CARD */}
            {[
              {
                title: "Full-Stack Web Applications",
                desc: "Complete MERN applications with clean UI, robust APIs, authentication, dashboards and deployment.",
              },
              {
                title: "Frontend UI Development",
                desc: "Pixel-perfect, modern, responsive interfaces using React, Tailwind, Framer Motion, and best UI practices.",
              },
              {
                title: "Backend & API Development",
                desc: "Fast, modular, scalable Node.js backend APIs with auth, role-based access, database integration, and error handling.",
              },
              {
                title: "Portfolio / Landing Pages",
                desc: "High-conversion landing pages and modern portfolios with smooth animations and clean design.",
              },
              {
                title: "Fixing & Improvements",
                desc: "Bug fixes, UI redesigns, API enhancements, database optimization, and performance tuning.",
              },
              {
                title: "System Design & Architecture",
                desc: "Structuring scalable applications, database models, API flows, authentication layers & deployment pipeline setup.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-teal-50 border border-teal-100 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-teal-700">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-2">{service.desc}</p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ========= WHY HIRE ME ========= */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-teal-700">Why Hire Me?</h2>
            <div className="w-20 h-[3px] bg-teal-600 mt-2 mb-6"></div>

            {[
              "Clean, responsive UI with modern aesthetics",
              "Scalable backend structure (MERN)",
              "Strong problem-solving and fast execution",
              "Experience with real-world projects",
              "Clear communication and transparency",
              "End-to-end delivery (UI ➝ Backend ➝ Deployment)",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3 mt-3">
                <CheckCircle size={20} className="text-teal-600" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </motion.div>

          {/* IMAGE / ILLUSTRATION */}
          <motion.img
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            src={assets.hire2}
            className="rounded-xl object-cover w-sm"
            alt="Why Hire Me"
          />

        </div>
      </section>

      {/* ========= ENGAGEMENT MODEL ========= */}
      <section className="py-20 px-6 lg:px-8 bg-teal-50 border-t border-teal-100">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-semibold text-teal-700">How We Can Work</h2>
          <div className="w-20 h-[3px] bg-teal-600 mt-2 mb-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Freelance / Contract",
                desc: "Short-term or long-term projects. Flexible timelines.",
              },
              {
                title: "Part-Time Developer",
                desc: "Daily/weekly commitments while contributing to your product.",
              },
              {
                title: "Project-Based",
                desc: "Fixed deliverables, clear milestones, structured output.",
              },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="p-6 bg-white border border-teal-200 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold text-teal-700">{m.title}</h3>
                <p className="text-gray-600 mt-2">{m.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========= CONTACT FORM ========= */}
      <section id="hire-form" className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white border border-teal-100 rounded-xl shadow-md p-8">

          <h2 className="text-3xl font-semibold text-teal-700">Tell Me About Your Project</h2>
          <div className="w-20 h-[3px] bg-teal-600 mt-2 mb-8"></div>

          <form className="grid grid-cols-1 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:border-teal-500 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:border-teal-500 outline-none"
            />

            <input
              type="text"
              placeholder="Project Type (Web App, UI, Portfolio, etc.)"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:border-teal-500 outline-none"
            />

            <textarea
              placeholder="Describe your idea..."
              rows="4"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:border-teal-500 outline-none resize-none"
            />

            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg transition shadow-md">
              Submit Inquiry
            </button>
          </form>

          {/* QUICK CONTACT */}
          <div className="mt-8 flex items-center gap-3 text-gray-600">
            <Mail size={20} className="text-teal-600" />
            Or mail me directly at:
            <a href="mailto:yourmail@gmail.com" className="text-teal-700 underline">
              yourmail@gmail.com
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
