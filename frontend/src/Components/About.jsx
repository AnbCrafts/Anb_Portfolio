import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-white py-20 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT – IMAGE CARD WITH BADGE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center md:justify-start"
        >
          {/* Outer frame card (soft teal border) */}
          <div className="relative rounded-xl bg-teal-50 border border-teal-100 shadow-md p-3 w-[280px] sm:w-[340px] md:w-[380px]">
            
            {/* Inner image container */}
            <div className="rounded-lg overflow-hidden shadow-md bg-white">
              <img
                src={assets.hero8}
                alt="About Portrait"
                className="w-full h-[360px] object-cover"
              />
            </div>

            {/* EXPERIENCE BADGE */}
            <div className="absolute -left-4 top-6 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md">
              <span className="text-lg font-semibold">2</span>
              <span className="text-sm ml-1">Years Experience</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT – INTRO TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-semibold text-teal-700">
            Introduction <span className="text-gray-900">About Me</span>
          </h2>

          {/* Underline accent */}
          <div className="w-20 h-[3px] bg-teal-600 mt-2 mb-6"></div>

          {/* Main Description */}
          <p className="text-gray-700 leading-relaxed mb-4">
            I’m a full-stack developer specializing in building clean, scalable,
            and minimal SaaS interfaces using React, Tailwind, and Node.js. I
            focus on crafting fast, intuitive digital experiences that feel simple,
            modern, and purposeful.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            With strong experience in frontend architecture, backend APIs, and UI
            design principles, I aim to deliver work that stands out in clarity,
            performance, and real-world usability.
          </p>

          {/* Optional CTA */}
          <div className="flex items-center justify-start gap-5">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700 transition"
          >
            Explore My Projects
          </motion.a>
          <Link to={'/about'} className="p-8 py-2.5 rounded-lg border border-teal-500 inline-block cursor-pointer hover:bg-teal-600 hover:text-white">
            Know More About Me
          </Link>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
