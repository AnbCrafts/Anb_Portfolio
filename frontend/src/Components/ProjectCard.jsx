import { motion, useInView } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { assets } from "../assets/assets";
import Spotlight3DCard from "./Spotlight3DCard";

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
      className="w-full max-w-6xl mx-auto mb-16 lg:mb-24"
    >
      <Spotlight3DCard 
        glowColor="rgba(67, 59, 255, 0.25)" 
        spotlightColor="rgba(56, 189, 248, 0.15)"
        className="p-6 md:p-10 bg-[#0b0f19]/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl shadow-black/80 text-[#fbfbfe]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* --- LEFT SIDE: VISUAL MOCKUP --- */}
          <div 
            className="group relative rounded-xl bg-[#050315] border border-slate-800/80 p-2 sm:p-3 shadow-2xl overflow-hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {/* Mock Browser Header */}
            <div className="flex items-center gap-1.5 mb-2.5 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              
              {/* Address Bar Visual */}
              <div className="ml-2 w-full h-5 bg-[#0b0f19] border border-slate-800/80 rounded-md text-[10px] flex items-center px-2 text-[#dedcff]/50 font-mono">
                {getHostname(previewLink)}
              </div>
            </div>

            {/* Image/Video Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#050315] border border-slate-800/80">
              <img
                src={imgSrc}
                alt={title}
                onError={() => setImgSrc(getFallbackImage(title, image))}
                className={`w-full h-full object-cover object-top transition-transform duration-700 ease-in-out ${
                  hover ? "scale-105" : "scale-100"
                } ${hover && video ? "opacity-0" : "opacity-100"}`}
              />

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
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#050315]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="flex flex-col justify-center">
              
            {/* Meta Tag */}
            {meta && (
              <span className="text-[#38bdf8] font-bold tracking-wider text-xs uppercase mb-3">
                {meta}
              </span>
            )}

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#fbfbfe] mb-4 leading-tight">
              {title}
            </h3>

            {/* Description */}
            <p className="text-[#dedcff]/80 text-base leading-relaxed mb-6">
              {description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {keywords.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-semibold bg-[#433bff]/15 text-[#38bdf8] border border-[#433bff]/30 rounded-lg shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              {previewLink ? (
                <a
                  href={previewLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#433bff] to-[#2f27ce] text-white rounded-xl font-semibold hover:from-[#38bdf8] hover:to-[#433bff] transition-all duration-300 shadow-lg shadow-[#433bff]/25 hover:shadow-[#38bdf8]/40 hover:scale-[1.02]"
                >
                  Live Demo <ArrowUpRight size={18} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/80 text-slate-500 rounded-xl font-semibold cursor-not-allowed border border-slate-700/50">
                  In Progress
                </span>
              )}

              <a
                href={codeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b0f19]/90 text-[#dedcff] border border-slate-700/80 rounded-xl font-semibold hover:bg-slate-800/80 hover:border-[#38bdf8] transition-all duration-300 hover:scale-[1.02]"
              >
                <Github size={18} /> Source Code
              </a>
            </div>

          </div>

        </div>
      </Spotlight3DCard>
    </motion.div>
  );
}