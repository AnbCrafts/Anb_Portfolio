import { motion } from "framer-motion";
import { Code2, Users, Timer, Star } from "lucide-react";

const metrics = [
  {
    id: 1,
    icon: <Code2 size={24} />,
    label: "Projects Built",
    value: "12+",
    desc: "SaaS & Full-stack",
    color: "from-[#38bdf8] to-[#433bff]",
  },
  {
    id: 2,
    icon: <Users size={24} />,
    label: "Users Impacted",
    value: "12k+",
    desc: "Across all platforms",
    color: "from-[#433bff] to-[#2f27ce]",
  },
  {
    id: 3,
    icon: <Timer size={24} />,
    label: "Avg. Load Time",
    value: "<0.5s",
    desc: "Optimized Performance",
    color: "from-[#10b981] to-[#059669]",
  },
  {
    id: 4,
    icon: <Star size={24} />,
    label: "Open Source",
    value: "14+",
    desc: "Contributions made",
    color: "from-[#a78bfa] to-[#8b5cf6]",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MetricsSection() {
  return (
    <section className="w-full bg-[#050315] text-[#fbfbfe] relative py-20 px-6 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-[#433bff]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="
                group
                relative 
                bg-[#0b0f19]/90 
                backdrop-blur-xl
                rounded-2xl 
                p-6 sm:p-8
                border border-slate-800/80
                shadow-xl shadow-black/60
                hover:shadow-2xl hover:shadow-[#433bff]/20 hover:border-[#38bdf8]/50
                transition-all duration-300 ease-out
                cursor-default
              "
            >
              {/* Floating Gradient Icon */}
              <div
                className={`
                  w-12 h-12 mb-6 rounded-xl 
                  flex items-center justify-center 
                  text-white shadow-lg 
                  bg-gradient-to-br ${m.color}
                  group-hover:scale-110 transition-transform duration-300
                `}
              >
                {m.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#fbfbfe] tracking-tight">
                  {m.value}
                </h3>
                <p className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                  {m.label}
                </p>
                <p className="text-xs text-[#dedcff]/70 font-medium pt-2 border-t border-slate-800/60 mt-3">
                  {m.desc}
                </p>
              </div>

              {/* Corner Glow on Hover */}
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-[#433bff]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}