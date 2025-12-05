import { Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-teal-50 border-t border-teal-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-semibold text-teal-700">Anubhaw.</h3>
          <p className="text-gray-600 mt-2 max-w-xs">
            Full-Stack Developer crafting clean, minimal and scalable digital experiences.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#home" className="text-gray-600 hover:text-teal-700">Home</a></li>
            <li><a href="#projects" className="text-gray-600 hover:text-teal-700">Projects</a></li>
            <li><a href="/about" className="text-gray-600 hover:text-teal-700">About</a></li>
            <li><a href="#contact" className="text-gray-600 hover:text-teal-700">Contact</a></li>
          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Connect</h4>

          <ul className="space-y-3">
            <li>
              <a
                href="mailto:yourmail@gmail.com"
                className="flex items-center gap-3 text-gray-700 hover:text-teal-700"
              >
                <Mail size={20} /> yourmail@gmail.com
              </a>
            </li>

            <li>
              <a
                href="https://github.com/yourgithub"
                target="_blank"
                className="flex items-center gap-3 text-gray-700 hover:text-teal-700"
              >
                <Github size={20} /> github.com/yourgithub
              </a>
            </li>

            <li>
              <a
                href="https://linkedin.com/in/yourlinkedin"
                target="_blank"
                className="flex items-center gap-3 text-gray-700 hover:text-[#0A66C2]"
              >
                <Linkedin size={20} /> linkedin.com/in/yourlinkedin
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-teal-100 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Anubhaw Gupta. All rights reserved.
      </div>
    </footer>
  );
}
