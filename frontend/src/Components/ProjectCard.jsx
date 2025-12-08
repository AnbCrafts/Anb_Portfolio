import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
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
  const isInView = useInView(cardRef, { amount: 0.3, once: true });
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto mb-20 lg:mb-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* --- LEFT SIDE: VISUAL MOCKUP --- */}
        <div 
          className="group relative rounded-2xl bg-slate-100 border border-slate-200 p-2 sm:p-3 shadow-2xl shadow-slate-200/50"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Mock Browser Header */}
          <div className="flex items-center gap-1.5 mb-2 sm:mb-3 px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            
            {/* Optional Address Bar Visual */}
            <div className="ml-2 w-full h-5 bg-white rounded-md opacity-50 text-[10px] flex items-center px-2 text-slate-400 font-medium font-mono">
                {previewLink ? new URL(previewLink).hostname : "localhost:3000"}
            </div>
          </div>

          {/* Image/Video Container */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-300/50">
            {/* Image */}
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover object-top transition-transform duration-700 ease-in-out ${
                hover ? "scale-105" : "scale-100"
              } ${hover && video ? "opacity-0" : "opacity-100"}`}
            />

            {/* Video (Autoplays on View or Hover) */}
            {video && (
              <video
                src={video}
                autoPlay={isInView} // Auto-play when scrolled into view
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hover || isInView ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
            
            {/* Overlay Gradient (Optional: makes text readable if you put text over image) */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
          </div>
        </div>

        {/* --- RIGHT SIDE: CONTENT --- */}
        <div className="flex flex-col justify-center">
            
          {/* Meta Tag (e.g. "Featured Project" or Date) */}
          {meta && (
            <span className="text-teal-600 font-bold tracking-wider text-xs uppercase mb-4">
              {meta}
            </span>
          )}

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            {description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {keywords.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm font-medium bg-white text-slate-600 border border-slate-200 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {previewLink ? (
              <a
                href={previewLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 hover:gap-3 transition-all duration-300 shadow-lg shadow-slate-900/20"
              >
                Live Demo <ArrowUpRight size={18} />
              </a>
            ) : (
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-400 rounded-xl font-medium cursor-not-allowed">
                    In Progress
                </span>
            )}

            <a
              href={codeLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
            >
              <Github size={20} /> Source Code
            </a>
          </div>

        </div>

      </div>
    </motion.div>
  );
}