// AboutBottom.jsx
import { assets } from "../assets/assets";

export default function AboutBottom() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 mt-24 space-y-24">

      {/* ============================================
          1. MISSION & VALUES
      ============================================= */}
      <section>
        <h2 className="text-3xl font-semibold text-teal-700 mb-4">
          My Mission & Values
        </h2>

        <p className="text-gray-600 leading-relaxed max-w-3xl">
          I aim to build beautiful, scalable, and deeply intuitive digital products
          that solve real problems. I value writing clean code, designing thoughtful
          user experiences, and continuously improving myself through consistency
          and curiosity.
        </p>

        <ul className="mt-6 space-y-2 text-gray-700">
          <li>✔ Deliver clean & maintainable code</li>
          <li>✔ Build with users in mind, not just technology</li>
          <li>✔ Stay consistent with learning & improvement</li>
          <li>✔ Communicate clearly and collaborate effectively</li>
        </ul>
      </section>

      {/* ============================================
          2. WHAT I AM WORKING ON
      ============================================= */}
      <section>
        <h2 className="text-3xl font-semibold text-teal-700 mb-4">
          What I'm Currently Working On
        </h2>

        <ul className="text-gray-700 space-y-3">
          <li>📌 Developing <strong>TrackForge</strong> — team-based bug tracking SaaS.</li>
          <li>📌 Improving skills in UI/UX design & animation systems.</li>
          <li>📌 Practicing MERN architecture patterns and optimization.</li>
          <li>📌 Preparing for GATE while balancing development.</li>
          <li>📌 Exploring AI integrations and workflow automation.</li>
        </ul>
      </section>

      {/* ============================================
          3. STRENGTHS & PERSONALITY
      ============================================= */}
      <section>
        <h2 className="text-3xl font-semibold text-teal-700 mb-4">Strengths</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Fast Learner & Adaptable",
            "Strong Debugging Ability",
            "Clean & Logical Thinking",
            "UI/UX Driven Mindset",
            "Team Player & Communicative",
            "Persistent & Quality-Focused",
          ].map((s, i) => (
            <div
              key={i}
              className="p-5 bg-teal-50 border border-teal-100 rounded-xl text-gray-700"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          4. TECHNICAL PHILOSOPHY
      ============================================= */}
      <section>
        <h2 className="text-3xl font-semibold text-teal-700 mb-4">How I Work</h2>

        <ul className="space-y-3 text-gray-700">
          <li>⚡ Component-driven development</li>
          <li>⚡ Clean folder structures & scalable architecture</li>
          <li>⚡ API-first backend design</li>
          <li>⚡ Reusable UI systems and patterns</li>
          <li>⚡ Accessibility & responsiveness in UI</li>
          <li>⚡ “Functionality first, animations second” principle</li>
        </ul>
      </section>

      {/* ============================================
          5. TOOLS I USE
      ============================================= */}
      <section>
        <h2 className="text-3xl font-semibold text-teal-700 mb-4">Tools I Use</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-gray-700">
          {[
            "VS Code",
            "Git & GitHub",
            "Figma",
            "MongoDB Compass",
            "Postman",
            "Notion",
          ].map((tool, i) => (
            <div
              key={i}
              className="p-4 bg-teal-50 rounded-xl border border-teal-100 text-center"
            >
              {tool}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          6. HOBBIES & INTERESTS
      ============================================= */}
      <section>
        <h2 className="text-3xl font-semibold text-teal-700 mb-4">
          Hobbies & Interests
        </h2>

        <p className="text-gray-600 max-w-2xl">
          Outside development, I keep myself active and inspired through various creative 
          and mental exercises that help me stay balanced.
        </p>

        <ul className="mt-4 space-y-3 text-gray-700">
          <li>🎧 Exploring modern UI/UX design ideas</li>
          <li>🧠 Solving coding challenges & DSA</li>
          <li>📚 Reading tech blogs & improvement books</li>
          <li>🏋️‍♂️ Fitness & meditation</li>
          <li>🎮 Gaming & anime (for refreshment)</li>
        </ul>
      </section>

      {/* ============================================
          7. CODING JOURNEY TIMELINE
      ============================================= */}
      <section>
        <h2 className="text-3xl font-semibold text-teal-700 mb-8">
          My Coding Journey
        </h2>

        <div className="border-l-4 border-teal-500 pl-6 space-y-8 text-gray-700">

          <div>
            <h3 className="text-teal-700 font-semibold">2020</h3>
            <p>Started programming & built my first small projects.</p>
          </div>

          <div>
            <h3 className="text-teal-700 font-semibold">2021–2022</h3>
            <p>Dived into MERN, Java, and began learning design principles.</p>
          </div>

          <div>
            <h3 className="text-teal-700 font-semibold">2023</h3>
            <p>Hackathons, NPTEL certification, MERN training.</p>
          </div>

          <div>
            <h3 className="text-teal-700 font-semibold">2024–2025</h3>
            <p>Built TrackForge, CodeSage, Portfolio V2, and mastering UI/UX.</p>
          </div>

        </div>
      </section>

      {/* ============================================
          8. WHAT I CAN HELP YOU WITH
      ============================================= */}
      <section>
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">
          What I Can Help You With
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {[
            "Frontend UI development with React + Tailwind",
            "Full-stack MERN applications",
            "Dashboard UI & SaaS design systems",
            "Reusable UI component libraries",
            "Authentication & role-based systems",
            "REST API development and integration",
            "Performance optimization & clean architecture",
            "Product thinking + UI/UX improvements",
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 bg-teal-50 border border-teal-100 rounded-xl"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
