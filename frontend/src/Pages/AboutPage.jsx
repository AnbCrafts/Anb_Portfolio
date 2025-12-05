// AboutPage.jsx
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import AboutBottom from "../Components/AboutBottom";

export default function AboutPage() {
  return (
    <main className="w-full pt-28 pb-20">

      {/* ===========================
          HERO SECTION
      ============================ */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-teal-700 leading-tight">
            Hi, I'm <span className="text-teal-600">Anubhaw Gupta</span>  
          </h1>

          <p className="text-gray-600 mt-6 text-lg leading-relaxed">
            A passionate full-stack developer who loves building clean, scalable
            and user-focused digital experiences.  
            I combine strong engineering fundamentals with modern UI/UX practices  
            to craft applications that feel smooth, intuitive, and intelligent.
          </p>

          <div className="mt-8 flex gap-6">
            <a
              href="/resume.pdf"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              download
            >
              Download Resume
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 border border-teal-400 text-teal-700 rounded-lg hover:bg-teal-50"
            >
              Hire Me
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <img
            src={assets.hero3}
            alt="Profile"
            className="w-80 h-80 object-cover rounded-3xl shadow-lg"
          />
        </div>
      </section>


      {/* ===========================
          PROFESSIONAL SUMMARY
      ============================ */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-semibold text-teal-700 mb-4">Summary</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          I specialize in developing full-stack applications using the MERN stack, 
          building beautiful and scalable UIs using React + Tailwind, designing robust backends
          using Node.js and MongoDB, and improving user experiences with motion, clean design, 
          and logical architecture.  
          I enjoy solving real-world problems and continuously improving my skills through 
          projects, hackathons, and research.
        </p>
      </section>


      {/* ===========================
          SKILLS MATRIX
      ============================ */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-semibold text-teal-700 mb-8">Skills & Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* FRONTEND */}
          <div className="p-6 bg-teal-50 border border-teal-100 rounded-xl">
            <h3 className="text-xl font-semibold text-teal-700">Frontend</h3>
            <ul className="text-gray-700 mt-3 space-y-2">
              <li>React.js</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>Responsive UI/UX</li>
            </ul>
          </div>

          {/* BACKEND */}
          <div className="p-6 bg-teal-50 border border-teal-100 rounded-xl">
            <h3 className="text-xl font-semibold text-teal-700">Backend</h3>
            <ul className="text-gray-700 mt-3 space-y-2">
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MongoDB</li>
              <li>JWT Authentication</li>
            </ul>
          </div>

          {/* TOOLS */}
          <div className="p-6 bg-teal-50 border border-teal-100 rounded-xl">
            <h3 className="text-xl font-semibold text-teal-700">Tools & Other</h3>
            <ul className="text-gray-700 mt-3 space-y-2">
              <li>Git & GitHub</li>
              <li>Postman</li>
              <li>VS Code</li>
              <li>Figma</li>
            </ul>
          </div>
        </div>
      </section>


      {/* ===========================
          EDUCATION
      ============================ */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-semibold text-teal-700 mb-4">Education</h2>

        <div className="bg-teal-50 border border-teal-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-teal-700">
            B.Tech in Computer Science & Engineering
          </h3>
          <p className="text-gray-600 mt-2">JIS College of Engineering | 2021–2025</p>
        </div>
      </section>


      {/* ===========================
          ACHIEVEMENTS
      ============================ */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">Achievements</h2>

        <div className="space-y-4 text-gray-700">
          <p>🏆 Hack-o-Nova Hackathon — Built AI study planner</p>
          <p>📜 NPTEL Certification — Java Programming</p>
          <p>🎓 MERN Full-Stack Training — Ardent Computech</p>
        </div>
      </section>


      <AboutBottom/>


      {/* ===========================
          FINAL CTA
      ============================ */}
      <section className="max-w-7xl mx-auto px-6 mt-20 text-center">
        <h2 className="text-3xl font-semibold text-teal-700">
          Want to work together?
        </h2>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          I’m always open to freelance work, internships, full-time roles, and collaborations.
        </p>

        <Link
          to="/contact"
          className="inline-block mt-6 px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Contact Me
        </Link>
      </section>

    </main>
  );
}
