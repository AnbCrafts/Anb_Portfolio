import { motion } from "framer-motion";
import { Layout, Layers } from "lucide-react";

export default function ProjectTabs({ activeTab, setActiveTab }) {
  
  const tabs = [
    {
      id: "frontend",
      label: "Frontend & UI",
      icon: <Layout size={18} />,
    },
    {
      id: "fullstack",
      label: "Full Stack & SaaS",
      icon: <Layers size={18} />,
    },
  ];

  return (
    <div className="w-full flex justify-center mb-12">
      {/* Container - The "Track" */}
      <div className="bg-slate-100 p-1.5 rounded-xl flex items-center gap-1 overflow-hidden shadow-inner border border-slate-200">
        
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 py-2.5 rounded-lg text-sm md:text-base font-semibold flex items-center gap-2 transition-colors duration-200 focus:outline-none z-10
                ${isActive ? "text-slate-800" : "text-slate-500 hover:text-slate-700"}
              `}
            >
              {/* The Sliding Background "Pill" */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200/50"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Text & Icon (Must be relative/z-10 to sit ON TOP of the motion div) */}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}