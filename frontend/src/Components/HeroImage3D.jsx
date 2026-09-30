import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Briefcase, Code, ShieldCheck } from "lucide-react";
import { assets } from "../assets/assets";

/**
 * HeroImage3D Component
 * Renders an interactive 3D developer portrait with mouse tilt physics,
 * 3D light glare reflection sweep, and floating orbiting 3D tech badges.
 */
export default function HeroImage3D() {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values for 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Light glare position
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth springs for 3D rotational tilt
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 28 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 28 });

  // Transform coordinates into subtle degrees of 3D tilt
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    mouseX.set(-500);
    mouseY.set(-500);
  };

  return (
    <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center perspective-1000">
      
      {/* 3D Floating Orbit Spheres behind Image */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#38bdf8] to-[#433bff] opacity-40 blur-xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#433bff] to-[#a78bfa] opacity-40 blur-xl pointer-events-none"
      />

      {/* Main 3D Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-3xl p-3 bg-[#0b0f19]/90 border border-slate-800/90 shadow-2xl shadow-black/80 cursor-pointer group transition-shadow duration-300"
      >
        {/* Holographic Border Aura */}
        <div
          className={`absolute -inset-0.5 rounded-3xl transition-opacity duration-500 blur-md pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-40"
          }`}
          style={{
            background: `radial-gradient(500px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(56, 189, 248, 0.35), rgba(67, 59, 255, 0.2), transparent 80%)`,
          }}
        />

        {/* 3D Image Frame */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-800/80 bg-[#050315]"
        >
          <img
            src={assets.anbPortfolio}
            alt="Anubhaw Gupta"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          {/* Interactive Light Glare Sweep */}
          <div
            className="pointer-events-none absolute -inset-full transition-opacity duration-300 group-hover:opacity-100 opacity-0 z-20"
            style={{
              background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(255, 255, 255, 0.18), transparent 70%)`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050315]/85 via-transparent to-transparent pointer-events-none" />

          {/* Overlaid 3D Badges */}
          <div
            style={{ transform: "translateZ(45px)" }}
            className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0b0f19]/90 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-xl"
          >
            <Sparkles size={13} className="text-amber-400 fill-amber-400" />
            3+ Production Apps
          </div>

          <div
            style={{ transform: "translateZ(50px)" }}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-xl bg-[#0b0f19]/95 border border-slate-800/90 backdrop-blur-md shadow-2xl"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#433bff]/25 text-[#38bdf8] border border-[#433bff]/30">
                <Briefcase size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#38bdf8] uppercase tracking-wider">Current Role</p>
                <p className="text-xs font-bold text-[#fbfbfe]">Software Dev @ MCC</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#dedcff] bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 shadow-sm flex items-center gap-1">
              <Code size={12} className="text-[#38bdf8]" /> Full-Stack
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
