import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

export default function JourneyStoryCard({
  image,
  tag,
  title,
  description,
  date,
  location,
  project,
  certificateLink,
  skills = [],
  storyLink = "/stories",
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden border border-teal-100 shadow-sm cursor-pointer bg-teal-50"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <motion.div
        initial={{ height: "50%" }}
        animate={{ height: hover ? "100%" : "50%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full bg-teal-50/90 backdrop-blur-sm p-4 flex flex-col justify-between rounded-t-xl"
      >
        {/* TOP CONTENT */}
        <div>
          {/* TAG */}
          <span className="text-xs font-medium bg-teal-600 text-white px-2 py-1 rounded-md">
            {tag}
          </span>

          {/* TITLE */}
          <h3 className="mt-3 text-lg font-semibold text-teal-800">
            {title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-700 mt-1 line-clamp-2">
            {description}
          </p>

          {/* META INFO */}
          <p className="text-xs text-gray-500 mt-2">
            {date} • {location}
          </p>

          {/* PROJECT BUILT */}
          {project && (
            <p className="text-xs mt-1 text-gray-600">
              <span className="font-semibold">Project:</span> {project}
            </p>
          )}

          {/* CERTIFICATE LINK */}
          {certificateLink && (
            <a
              href={certificateLink}
              target="_blank"
              className="text-xs text-teal-700 underline mt-2 inline-block"
            >
              View Certificate
            </a>
          )}

          {/* SKILLS */}
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-teal-600 text-white text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* KNOW MORE */}
        <div className="mt-3">
          <a
            href={storyLink}
            className="inline-flex items-center gap-2 text-sm text-teal-800 font-medium hover:text-teal-900"
          >
            Know more <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
