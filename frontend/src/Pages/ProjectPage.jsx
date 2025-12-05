// ProjectsPage.jsx
import { useState } from "react";

import ProjectTabs from "../Components/ProjectTabs";
import SectionWrapper from "../Components/SectionWrapper";
import TopProjectsGallery from "../Components/TopProjectsGallery";
import ProjectListSection from "../Components/ProjectListSection";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <div className="w-full">

      <SectionWrapper>
        <div className="w-full py-10">
  <div className="max-w-7xl mx-auto">

    <h1 className="text-4xl md:text-5xl font-semibold text-teal-700">
      Featured Projects
    </h1>

    <div className="w-24 h-[4px] bg-[#D4AF37] mt-3 rounded-full"></div>

    <p className="text-gray-600 mt-4 max-w-2xl text-lg">
      A curated collection of my most impactful and polished work, showcasing 
      full-stack development, UI engineering, and real-world problem-solving.
    </p>

  </div>
</div>
      </SectionWrapper>
        
      <SectionWrapper>
        

        <TopProjectsGallery />
      </SectionWrapper>

      <SectionWrapper>
        <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </SectionWrapper>
        <ProjectListSection type={activeTab} />


    </div>
  );
}
