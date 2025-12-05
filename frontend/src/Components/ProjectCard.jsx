import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useRef, useState } from "react";

export default function ProjectCard({
  title,
  description,
  keywords = [],
  meta,
  image,
  video,
  previewLink,
  codeLink,
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { amount: 0.4, once: false });
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3, once: false }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-[55vh] bg-white border border-teal-100 rounded-2xl shadow-sm overflow-hidden mb-16 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] h-full">

        {/* LEFT SIDE — IMAGE / VIDEO */}
        <div
          className="relative w-full h-[55vh] overflow-hidden cursor-pointer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* IMAGE */}
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              hover && video ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* VIDEO AUTOPLAYS WHEN IN VIEW */}
          {video && (
            <video
              src={video}
              autoPlay={isInView}
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                hover || isInView ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        {/* RIGHT SIDE — TEXT + TAGS + LINKS */}
        <div className="p-8 flex flex-col justify-between">

          {/* TOP TEXT SECTION */}
          <div>
            <h3 className="text-2xl font-semibold text-teal-700">{title}</h3>

            <p className="text-gray-600 mt-3">
              {description}
            </p>

            {meta && (
              <p className="text-sm text-gray-500 mt-2 italic">{meta}</p>
            )}

            {/* KEYWORDS */}
            <div className="flex flex-wrap gap-2 mt-4">
              {keywords.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-teal-50 text-teal-700 border border-teal-100 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* LINKS SECTION */}
          <div className="mt-6 flex items-center gap-6">

            {/* PREVIEW LINK OR FALLBACK */}
            {previewLink ? (
              <a
                href={previewLink}
                target="_blank"
                className="flex items-center gap-2 text-teal-700 hover:text-teal-600 transition"
              >
                <ExternalLink size={18} /> Preview
              </a>
            ) : (
              <p className="text-gray-500 text-sm italic">
                Work in progress — view repo instead
              </p>
            )}

            {/* GITHUB LINK */}
            <a
              href={codeLink}
              target="_blank"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
            >
              <Github size={18} /> Code
            </a>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
