import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Spotlight3DCard Component
 * Wraps content with 3D Parallax Mouse Tilt, Interactive Cursor Spotlight,
 * and a glowing neon border effect.
 */
export default function Spotlight3DCard({
  children,
  className = "",
  glowColor = "rgba(67, 59, 255, 0.25)",
  spotlightColor = "rgba(56, 189, 248, 0.18)",
  enableTilt = true,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position inside the card relative to center (for 3D tilt)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse position inside the card from top-left (for Spotlight overlay)
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth springs for 3D rotational tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 22 });

  // Transform coordinates into degrees of 3D rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    // Update spotlight positions
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    // Calculate normalized -0.5 to 0.5 for 3D tilt
    if (enableTilt) {
      x.set(mouseXPos / width - 0.5);
      y.set(mouseYPos / height - 0.5);
    }
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
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative group rounded-2xl transition-all duration-300 ${className}`}
    >
      {/* Animated Glowing Border Aura (Vengence UI Style) */}
      <div
        className={`absolute -inset-0.5 rounded-2xl transition-opacity duration-500 blur-md pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Interactive Cursor Spotlight Radial Light Beam (Motion Primitives Style) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(650px circle at ${mouseX.get()}px ${mouseY.get()}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Card Content with 3D Depth Layering */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="relative z-20 w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
