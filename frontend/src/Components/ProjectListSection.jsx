// ProjectListSection.jsx
import { useEffect, useState } from "react";
import { frontend } from "../DB/FrontendProjects";
import { fullstack } from "../DB/FullStackProjects";
import ProjectCardSmall from "./ProjectCardSmall";


export default function ProjectListSection({ type }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const frontendProjects = frontend;
  const fullstackProjects = fullstack;

  const list = type === "frontend" ? frontendProjects : fullstackProjects;

  useEffect(()=>{
    console.log("LIST:", list);

  },[list])

  return (
    <div className="max-w-7xl mx-auto py-20 space-y-10">
      {list.map((p, i) => (
        <ProjectCardSmall
          key={i}
          project={p}
          expanded={expandedIndex === i}
          onExpand={() => setExpandedIndex(i)}
        />
      ))}
    </div>
  );
}
