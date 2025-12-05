import { motion } from "framer-motion";
import { Code2, Users, Timer, Star } from "lucide-react";

const metrics = [
  {
    id: 1,
    icon: <Code2 size={26} className="text-teal-600" />,
    label: "Projects Built",
    value: "12+",
  },
  {
    id: 2,
    icon: <Users size={26} className="text-teal-600" />,
    label: "Users Impacted",
    value: "12,000+",
  },
  {
    id: 3,
    icon: <Timer size={26} className="text-teal-600" />,
    label: "Avg. Load Time",
    value: "< 500ms",
  },
  {
    id: 4,
    icon: <Star size={26} className="text-teal-600" />,
    label: "Open Source Contributions",
    value: "14+",
  },
];

export default function MetricsSection() {
  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            className="
              bg-white 
              border border-teal-100 
              shadow-sm 
              rounded-xl 
              p-6 
              flex 
              flex-col 
              items-start 
              gap-3 
              hover:shadow-md 
              transition-all
            "
          >
            <div className="p-3 bg-teal-50 rounded-lg">{m.icon}</div>

            <h3 className="text-3xl font-semibold text-teal-700">
              {m.value}
            </h3>

            <p className="text-gray-600 text-sm">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
