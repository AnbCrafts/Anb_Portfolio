import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { frontend } from "../DB/FrontendProjects"; 
import { fullstack } from "../DB/FullStackProjects";
import ProjectCardSmall from "./ProjectCardSmall";
import { FolderOpen } from "lucide-react";

export default function ProjectListSection({ type }) {
  // 1. THIS STATE WAS MISSING
  const [expandedIndex, setExpandedIndex] = useState(null);

  const list = type === "frontend" ? frontend : fullstack;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
      
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {list && list.length > 0 ? (
            list.map((project, i) => (
              <ProjectCardSmall
                key={i}
                project={project}
                
                // 2. PASSING THE STATE DOWN
                expanded={expandedIndex === i}
                onExpand={() => setExpandedIndex(expandedIndex === i ? null : i)}
                
                index={i}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
              <FolderOpen size={48} className="mb-4 opacity-50" />
              <p className="text-lg">No projects found in this category yet.</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}