import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none bg-slate-200/20 dark:bg-slate-800/20">
      <motion.div
        className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 shadow-[0_0_10px_#14b8a6]"
        style={{ width: `${scrollProgress}%` }}
        transition={{ ease: "easeOut", duration: 0.1 }}
      />
    </div>
  );
}
