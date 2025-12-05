// components/SectionWrapper.jsx
import { motion } from "framer-motion";

export default function SectionWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }} // persist on every scroll
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
