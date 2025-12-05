// JourneyGallery.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { assets } from "../assets/assets";

// default data (you already had this)
const journeyItems = [
  {
    image: assets.hero1,
    tag: "Hackathon",
    title: "Hack-O-Nova 2024",
    description:
      "36-hour hackathon hosted at Adamas University where we designed and built a prototype under pressure.",
    date: "2024",
    location: "Adamas University",
    project: "AI-powered study planner",
    certificateLink: "/cert-hack1.png",
    skills: ["Teamwork", "Rapid Prototyping", "UI Flowing", "Architecture"],
    storyLink: "/stories/hackonova-2024",
  },
  {
    image: assets.hero2,
    tag: "Certification",
    title: "NPTEL Programming in Java",
    description:
      "Selected among the top performers for consistently high scores and strong coding fundamentals.",
    date: "2024",
    location: "JIS University",
    project: "",
    certificateLink: "/cert-nptel.png",
    skills: ["OOP", "Java", "Problem Solving"],
    storyLink: "/stories/nptel-java",
  },
  {
    image: assets.hero3,
    tag: "Training",
    title: "Full-Stack MERN Training",
    description:
      "Completed hands-on MERN training focused on APIs, authentication, Docker & production-ready architectures.",
    date: "2024",
    location: "Ardent Computech",
    project: "MERN Dashboard",
    certificateLink: "/cert-ardent.png",
    skills: ["React", "Express", "MongoDB", "Deployment"],
    storyLink: "/stories/ardent-training",
  },
];

export default function JourneyGallery({ items = journeyItems }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Gold color used for overlay accents
  const gold = "#D4AF37";

  // Helpers
  const safeItems = Array.isArray(items) ? items : journeyItems;
  const active = safeItems[activeIndex] || safeItems[0];

  return (
    <div className="w-full">
      {/* MAIN IMAGE */}
      <div className="w-full rounded-xl overflow-hidden border border-teal-100 shadow-sm bg-gray-50">
        <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={active?.image ?? activeIndex}
              src={active?.image}
              alt={active?.title || `Journey ${activeIndex + 1}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* GOLD OVERLAY (half-height default, full on hover) */}
          <motion.div
            initial={{ height: "45%" }}
            whileHover={{ height: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute left-0 right-0 bottom-0 bg-white/90 backdrop-blur-sm"
            style={{ pointerEvents: "none" }} /* allow click through image area */
          >
            <div className="h-full p-6 flex flex-col justify-between pointer-events-auto">
              <div>
                <span
                  className="inline-block text-xs font-semibold px-2 py-1 rounded"
                  style={{ background: gold, color: "#111" }}
                >
                  {active?.tag || "Event"}
                </span>

                <h3 className="mt-3 text-xl font-semibold text-gray-900">
                  {active?.title}
                </h3>

                <p className="text-sm text-gray-700 mt-2 max-w-3xl line-clamp-3">
                  {active?.description}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {active?.date} • {active?.location}
                </p>

                {active?.project && (
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-semibold">Project:</span> {active.project}
                  </p>
                )}

                {active?.certificateLink && (
                  <a
                    href={active.certificateLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-sm underline text-teal-700"
                  >
                    View Certificate
                  </a>
                )}

                {/* Skills learned (white text on gold) */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {(active?.skills || []).map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded"
                      style={{ background: gold, color: "#050505" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Know more link */}
              <div>
                <a
                  href={active?.storyLink || "/stories"}
                  className="inline-flex items-center gap-2 text-sm font-medium text-teal-800 hover:text-teal-900"
                >
                  Know more <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* THUMBNAILS GRID */}
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-3">
        {safeItems.map((it, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}   // hover -> sets active (desktop)
              onFocus={() => setActiveIndex(idx)}         // keyboard accessibility
              onClick={() => setActiveIndex(idx)}         // mobile click/tap
              className={`relative w-full h-20 sm:h-24 rounded-md overflow-hidden border ${
                isActive ? "border-teal-600" : "border-teal-100"
              } focus:outline-none`}
              aria-pressed={isActive}
            >
              <img
                src={it.image}
                alt={it.title || `Journey ${idx + 1}`}
                className="w-full h-full object-cover"
              />

              {/* active overlay indicator */}
              {isActive && (
                <span
                  className="absolute inset-0 ring-2 ring-offset-1 rounded-md pointer-events-none"
                  style={{ boxShadow: `0 0 0 3px ${gold}33` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
