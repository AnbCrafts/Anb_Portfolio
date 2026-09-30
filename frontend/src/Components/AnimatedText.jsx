import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * TextScramble Component (Motion Primitives Style)
 * Scrambles characters into place with cyberpunk cipher effect.
 */
export function TextScramble({ text, className = "", duration = 1.2 }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    let iteration = 0;
    const totalFrames = text.length * 3;
    const intervalTime = (duration * 1000) / totalFrames;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
      }
      iteration += 1;
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text, duration]);

  return <span className={className}>{displayText}</span>;
}

/**
 * TextMorph / TextWordCycler Component
 * Vertically flips/rotates through an array of phrases with locked height.
 */
export function TextWordCycler({ words = [], className = "", intervalMs = 3200 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [words, intervalMs]);

  if (!words || words.length === 0) return null;

  return (
    <span className={`inline-block relative overflow-hidden align-top ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block bg-gradient-to-r from-[#38bdf8] via-[#433bff] to-[#a78bfa] bg-clip-text text-transparent whitespace-normal"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * TextShimmer Component
 * Animated shimmering light beam passing across gradient text.
 */
export function TextShimmer({ children, className = "" }) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="bg-gradient-to-r from-[#38bdf8] via-[#dedcff] to-[#433bff] bg-clip-text text-transparent animate-shimmer">
        {children}
      </span>
    </span>
  );
}
