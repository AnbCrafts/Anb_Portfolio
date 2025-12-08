import { motion } from "framer-motion";
import { Code2, Users, Timer, Star } from "lucide-react";

const metrics = [
  {
    id: 1,
    icon: <Code2 size={24} />,
    label: "Projects Built",
    value: "12+",
    desc: "SaaS & Full-stack",
    color: "from-teal-400 to-teal-600",
  },
  {
    id: 2,
    icon: <Users size={24} />,
    label: "Users Impacted",
    value: "12k+",
    desc: "Across all platforms",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    icon: <Timer size={24} />,
    label: "Avg. Load Time",
    value: "<0.5s",
    desc: "Optimized Performance",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    icon: <Star size={24} />,
    label: "Open Source",
    value: "14+",
    desc: "Contributions made",
    color: "from-amber-400 to-orange-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger effect: cards appear one by one
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MetricsSection() {
  return (
    <section className="w-full bg-white relative py-20 px-6">
      
      {/* Decorative background blur to bridge gap with Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-teal-50 blur-[100px] opacity-60 pointer-events-none" />

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
              whileHover={{ y: -5 }} // Smooth lift effect
              className="
                group
                relative 
                bg-white 
                rounded-2xl 
                p-6 sm:p-8
                border border-slate-100
                shadow-lg shadow-slate-200/50
                hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-100
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
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
                  {m.value}
                </h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  {m.label}
                </p>
                <p className="text-xs text-slate-400 font-medium pt-1 border-t border-slate-50 mt-3">
                  {m.desc}
                </p>
              </div>

              {/* Decorative corner glow on hover */}
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-teal-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}