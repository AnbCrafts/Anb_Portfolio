// TopProjectsGallery.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";

export default function TopProjectsGallery() {
  const topProjects = [
    {
      video: assets.demo,
      title: "TrackForge - Team Bug Tracking Platform",
      desc: "A powerful and intuitive project and bug management platform built for teams.",
      keywords: ["MERN", "JWT Auth", "Charts", "Team Management"],
      preview: "https://yourpreview1.com",
      repo: "https://github.com/yourrepo1"
    },
    {
      video: assets.demo,
      title: "FitForWork - Job Application Manager",
      desc: "A clean career-management SaaS to organize job applications.",
      keywords: ["React", "Recharts", "MongoDB", "Authentication"],
      preview: "",
      repo: "https://github.com/yourrepo2"
    },
    {
      video: assets.demo,
      title: "CodeSage - AI Coding Assistant",
      desc: "An AI-powered code assistant with code generation and error detection.",
      keywords: ["AI", "Node.js", "React", "REST API"],
      preview: "",
      repo: "https://github.com/yourrepo3"
    },
    {
      video: assets.demo,
      title: "Portfolio v2 - SaaS Inspired",
      desc: "A stunning minimal teal-themed interactive developer portfolio.",
      keywords: ["React", "Framer Motion", "Tailwind", "Animations"],
      preview: "/",
      repo: ""
    }
  ];

  const [index, setIndex] = useState(0);
  const active = topProjects[index];

  return (
    <section className="w-full min-h-screen py-20 border-t border-teal-100">
      <div className="w-full flex justify-between items-center  h-[100vh] p-2">

        {/* LEFT VIDEO */}
        <div className="relative w-full h-full  overflow-hidden rounded-xl p-2 ">
          <video
            src={active.video}
            autoPlay
            loop
            muted
            className="w-full h-full outline-none object-contain"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="h-full max-h-[90vh] w-md bg-teal-50 p-5 rounded-xl flex items-center justify-between flex-col">
          
          <div className="min-h-[60vh]">

          <h2 className="text-3xl font-semibold text-teal-700">{active.title}</h2>

          <p className="text-gray-600 mt-3 text-lg">{active.desc}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            {active.keywords.map((k, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-teal-100 text-teal-700 rounded-md text-sm"
              >
                {k}
              </span>
            ))}
          </div>

          <div className="flex gap-6 mt-5">
            {active.preview ? (
              <a href={active.preview} className="inline-block py-2 px-8 border border-teal-300 rounded cursor-pointer bg-teal-600 text-white transition-all ">Preview</a>
            ) : (
              <p className="text-gray-500 italic text-sm">Work in progress</p>
            )}

            {active.repo && (
              <a href={active.repo} className="text-gray-800 inline-block py-2 px-8 border border-teal-300 rounded cursor-pointer hover:bg-teal-600 hover:text-white transition-all ">GitHub</a>
            )}
          </div>

          </div>

          {/* PAGINATION */}
          
          <div className="mt-10  flex w-fit mx-auto items-center gap-6 h-full">
  {/* Prev Button */}
  <button
    onClick={() =>
      setIndex((index - 1 + topProjects.length) % topProjects.length)
    }
    className="px-4 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
  >
    ←
  </button>

  {/* Counter */}
  <p className="text-gray-700 font-medium tracking-wide">
    <span className="text-[#D4AF37] font-semibold">{index + 1}</span>
    <span className="text-gray-500"> / {topProjects.length}</span>
  </p>

  {/* Next Button */}
  <button
    onClick={() => setIndex((index + 1) % topProjects.length)}
    className="px-4 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
  >
    →
  </button>
</div>




        </div>
      </div>
    </section>
  );
}
