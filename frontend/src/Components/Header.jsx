import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-teal-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        {/* Logo */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-teal-700 tracking-tight"
        >
          Anubhaw<span className="text-teal-500">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="text-gray-600 hover:text-teal-700 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}

          {/* CTA */}
          <Link
            to={'/hire'}
            className="ml-4 bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition-all shadow-sm"
          >
            Hire Me
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-teal-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-teal-100 shadow-sm"
          >
            <div className="flex flex-col p-6 gap-4">

              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-gray-700 text-lg hover:text-teal-600 transition"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 bg-teal-600 text-white text-center py-2 rounded-lg"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
