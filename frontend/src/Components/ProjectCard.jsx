import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { assets } from "../assets/assets";

const getFallbackImage = (title, image) => {
  if (!title) return image || assets.anbPortfolio;
  const lower = title.toLowerCase();
  if (lower.includes("trackforge")) return assets.trackForge;
  if (lower.includes("nirman") || lower.includes("website builder")) return assets.nirman;
  if (lower.includes("codesage")) return assets.codeSage;
  return image || assets.anbPortfolio;
};

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
  const [imgSrc, setImgSrc] = useState(image || getFallbackImage(title, image));

  const getHostname = (url) => {
    if (!url || url === "#") return "localhost:3000";
    try {
      return new URL(url).hostname;
    } catch {
      return "localhost:3000";
    }
  };

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
          className="group relative rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2 sm:p-3 shadow-2xl shadow-slate-200/50 dark:shadow-black/60"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Mock Browser Header */}
          <div className="flex items-center gap-1.5 mb-2 sm:mb-3 px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            
            {/* Optional Address Bar Visual */}
            <div className="ml-2 w-full h-5 bg-white dark:bg-slate-900 rounded-md opacity-70 text-[10px] flex items-center px-2 text-slate-400 dark:text-slate-500 font-medium font-mono">
                {getHostname(previewLink)}
            </div>
          </div>

          {/* Image/Video Container */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-300/50 dark:border-slate-800">
            {/* Image */}
            <img
              src={imgSrc}
              alt={title}
              onError={() => setImgSrc(getFallbackImage(title, image))}
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
            <span className="text-teal-600 dark:text-teal-400 font-bold tracking-wider text-xs uppercase mb-4">
              {meta}
            </span>
          )}

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {keywords.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm"
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-teal-400 hover:gap-3 transition-all duration-300 shadow-lg shadow-slate-900/20 dark:shadow-teal-500/20"
              >
                Live Demo <ArrowUpRight size={18} />
              </a>
            ) : (
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-xl font-medium cursor-not-allowed">
                    In Progress
                </span>
            )}

            <a
              href={codeLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-medium hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <Github size={20} /> Source Code
            </a>
          </div>

        </div>

      </div>
    </motion.div>
  );
}