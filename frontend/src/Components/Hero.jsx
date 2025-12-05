// Hero.jsx
import { motion } from "framer-motion";
import { assets } from "../assets/assets"; // make sure assets.hero1 exists

export default function Hero() {
  return (
    <section id="home" className="w-full bg-gradient-to-b from-teal-50 to-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative flex flex-col-reverse md:flex-row items-center md:items-stretch gap-8 py-20">

          {/* LEFT: Text block */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 flex flex-col justify-center text-left"
          >
            <h2 className="text-3xl md:text-5xl font-extralight text-teal-700 leading-tight">
              Hi, I’m <span className="font-semibold">Anubhaw Gupta</span>
            </h2>

            <p className="mt-4 text-gray-600 max-w-lg">
              Full-Stack Developer building clean, minimal SaaS experiences using
              React, Tailwind, and modern animation systems. I ship highly usable
              UIs and scalable backends.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="inline-block bg-teal-600 text-white px-5 py-3 rounded-lg shadow"
              >
                View My Work
              </motion.a>

              <a
                href="/resume.pdf"
                className="inline-block text-teal-700 border border-teal-100 px-4 py-2 rounded-lg"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Circular masked image that overlaps hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            className="w-full md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px]">
              {/* big teal soft circle behind to match reference */}
              <div
                aria-hidden
                className="absolute -right-8 top-6 w-full h-full rounded-full bg-gradient-to-br from-teal-100 to-teal-200/80 shadow-lg"
                style={{ filter: "blur(6px)" }}
              />

              {/* actual clipped image inside rounded container */}
              <div className="absolute right-0 top-0 w-full h-full rounded-full overflow-hidden border border-teal-100 bg-white/60">
                <img
                  src={assets.hero1}
                  alt="Hero"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* subtle white card edge to mimic reference framed panel */}
              <div className="pointer-events-none absolute -right-6 -bottom-6 w-40 h-20 bg-white rounded-tl-2xl shadow-sm opacity-90" />
            
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom large smooth curve (semicircular feel) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 200" className="w-full h-[120px]" preserveAspectRatio="none">
          <path
            d="M0,64 C360,200 1080,-40 1440,96 L1440,320 L0,320 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
