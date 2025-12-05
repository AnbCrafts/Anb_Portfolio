import { assets } from "../assets/assets";
import ProjectCard from "./ProjectCard";


export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-12">
  <h2 className="text-3xl md:text-4xl font-semibold text-teal-700">
    Featured Projects
  </h2>

  <div className="w-20 h-[3px] bg-teal-600 mt-2 mb-6"></div>

  <p className="text-gray-600 max-w-2xl">
    A collection of the most meaningful products I’ve built — each focused on 
    clean user experience, modern engineering practices, and scalable full-stack architecture. 
    Here are a few highlights that showcase my capabilities across UI, backend, system design, 
    and real-world problem solving.
  </p>
</div>


      <ProjectCard
        title="TrackForge"
        description="A bug tracking and collaboration tool with analytics, RBAC, and modern UI workflows."
        keywords={["MERN", "RBAC", "Analytics", "Tailwind", "React"]}
        meta="Built for scalable team workflows."
        image={assets.trackForge}
        video={assets.demo}
        previewLink=""
        codeLink="https://github.com/AnbCrafts/TrackForge.git"
      />

      <ProjectCard
        title="FitForWork"
        description="A hiring & job management platform with recruiter dashboards and advanced filtering."
        keywords={["React", "Node", "MongoDB", "Responsive UI"]}
        meta="Dual-role system with profile & posting flows."
        image={assets.fitForWork}
        video={assets.demo}
        previewLink=""
        codeLink="https://github.com/AnbCrafts/FitFor-Work-updated.git"
      />

      <ProjectCard
        title="CodeSage"
        description="An AI-powered code explanation tool using Gemini/OpenAI APIs."
        keywords={["AI", "LLM", "Express", "React"]}
        meta="Built for real-time code parsing & optimization."
        image={assets.codeSage}
        video={assets.demo}
        previewLink="https://codesage-client.onrender.com/"
        codeLink="#"
      />


        <div className="max-w-7xl mx-auto mt-10 flex justify-center">
  <a
    href="/project-details"
    className="text-teal-700 hover:text-teal-800 font-medium text-lg border-b-2 border-teal-200 pb-1 hover:border-teal-600 transition-all"
  >
    View all projects →
  </a>
</div>

    </section>
  );
}
