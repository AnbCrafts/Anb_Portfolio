// motionVariants.js
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

export const stagger = {
  show: { transition: { staggerChildren: 0.06 } }
};

export const hoverLift = {
  hover: { y: -6, boxShadow: "0 8px 30px rgba(18, 52, 45, 0.08)" }
};
