// ProjectTabs.jsx
export default function ProjectTabs({ activeTab, setActiveTab }) {
  return (
    <div className="w-full border-b border-teal-200">
      <div className="max-w-7xl mx-auto flex">

        {/* Frontend */}
        <button
          onClick={() => setActiveTab("frontend")}
          className="w-1/2 text-center py-4 text-lg font-medium relative"
        >
          Frontend Projects
          {activeTab === "frontend" && (
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-teal-600" />
          )}
        </button>

        {/* Fullstack */}
        <button
          onClick={() => setActiveTab("fullstack")}
          className="w-1/2 text-center py-4 text-lg font-medium relative"
        >
          Full Stack Projects
          {activeTab === "fullstack" && (
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-teal-600" />
          )}
        </button>

      </div>
    </div>
  );
}
