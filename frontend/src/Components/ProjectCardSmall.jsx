// ProjectCardSmall.jsx
import { motion } from "framer-motion";

export default function ProjectCardSmall({ project, expanded, onExpand }) {
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{once:true}}
      className={`
        border border-teal-200 bg-white rounded-xl shadow-sm overflow-hidden
        ${expanded ? "min-h-screen" : "min-h-64"}
        transition-all duration-500
      `}
    >
      {/* ================================
          COLLAPSED VIEW
      ================================= */}
      {!expanded && (
        <div className="grid grid-cols-2 min-h-64">

          {/* LEFT IMAGE */}
          <div className="relative max-h-100">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />

            {/* OVERLAY WITH TECH TAGS */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 
                            bg-teal-700/40 backdrop-blur-md text-white p-3 pt-4">
              <div className="flex flex-wrap gap-2">
                {project.keywords?.map((k, i) => (
                  <span
                    key={i}
                    className="text-xs bg-teal-600 px-2 py-1 rounded-md whitespace-nowrap"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-teal-700">
                {project.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                {project.desc}
              </p>
            </div>

            <button
              onClick={onExpand}
              className="mt-4 bg-teal-600 hover:bg-teal-700 
                         text-white py-2 rounded-lg font-medium transition-all"
            >
              View in Detail
            </button>
          </div>

        </div>
      )}

      {/* ================================
          EXPANDED VIEW
      ================================= */}
      {expanded && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* LEFT VIDEO */}
          <div className="w-full min-h-[40vh] lg:min-h-full bg-black flex items-center justify-center">
            <video
              src={project.video}
              autoPlay
              loop
              muted
              className="w-full h-full object-contain"
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="p-8 overflow-y-auto flex flex-col">

            {/* TITLE */}
            <h2 className="text-3xl font-semibold text-teal-700">
              {project.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mt-4 leading-relaxed">
              {project.desc}
            </p>

            {/* TECH TAGS */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.keywords?.map((k, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-teal-100 text-teal-700 
                             rounded-md text-sm whitespace-nowrap"
                >
                  {k}
                </span>
              ))}
            </div>

            {/* LINKS */}
            <div className="mt-6 flex gap-6">
              {project.preview ? (
                <a
                  href={project.preview}
                  target="_blank"
                  className="text-teal-700 underline text-sm font-medium"
                >
                  Live Preview
                </a>
              ) : (
                <p className="text-gray-400 text-sm italic">
                  Work in progress — view repo instead
                </p>
              )}

              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  className="text-gray-700 underline text-sm font-medium"
                >
                  GitHub Repo
                </a>
              )}
            </div>

            {/* SECONDARY IMAGE */}
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="w-full h-64 object-cover rounded-xl mt-10 shadow-md"
            />

          </div>
        </div>
      )}
    </motion.div>
  );
}
