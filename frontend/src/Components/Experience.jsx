import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import JourneyGallery from "./JourneyGallery";

// TIMELINE DATA (Experience + Hackathons + Education)
const journey = [
  {
    year: "2025",
    title: "Full-Stack Developer — Personal Projects",
    desc: "Built production-grade apps including TrackForge, FitForWork & CodeSage focusing on scalable MERN architecture, UI engineering and real-world functionality."
  },
  {
    year: "2024",
    title: "Hack-O-Nova — Inter College Hackathon",
    desc: "Participated in a 36-hour hackathon at Adamas University, developing ideas under pressure and refining teamwork, architecture planning, and fast prototyping."
  },
  {
    year: "2024",
    title: "Full-Stack Developer Trainee — Ardent Computech",
    desc: "Completed hands-on MERN stack training covering APIs, Docker setups, backend patterns, authentication & modular architecture."
  },
  {
    year: "2024",
    title: "NPTEL — Programming in Java (Top Performer)",
    desc: "Strengthened OOP fundamentals, Java syntax mastery, problem-solving and structured programming techniques."
  },
  {
    year: "2022",
    title: "Higher Secondary (PCM) — 91.2%",
    desc: "Strong foundation in mathematics, logic and computer science fundamentals."
  }
];

// IMAGE GRID — YOU WILL REPLACE THESE IMAGE PATHS
const journeyImages = [
    assets.hero1,
    assets.hero2,
    assets.hero3,
    assets.hero4,
    assets.hero5,
    assets.hero6,
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT SIDE — TIMELINE */}
        <div>
          {/* Section heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-semibold text-teal-700"
          >
            Experience & Journey
          </motion.h2>

          <div className="w-20 h-[3px] bg-teal-600 mt-2 mb-12"></div>

          <div className="relative border-l border-teal-200 pl-6 space-y-12">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[13px] top-1 w-3 h-3 bg-teal-600 rounded-full"></div>

                <p className="text-teal-700 font-semibold">{item.year}</p>

                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-2 max-w-lg leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE — IMAGE GRID */}
        


        <JourneyGallery/>

      </div>
    </section>
  );
}
