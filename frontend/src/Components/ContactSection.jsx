import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full bg-white py-20 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT: HEADING + DESCRIPTION + QUICK CONTACT LINKS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-teal-700">
            Let's Connect
          </h2>

          <div className="w-20 h-[3px] bg-teal-600 mt-2 mb-6"></div>

          <p className="text-gray-600 leading-relaxed max-w-md">
            I’m always open to discussing new projects, collaborating on ideas,
            or helping teams build clean and scalable digital products.
            Feel free to reach out directly or send me a message through the form.
          </p>

          {/* QUICK CONTACT */}
          <div className="mt-8 space-y-4">
            <a
              href="mailto:yourmail@gmail.com"
              className="flex items-center gap-3 text-teal-700 hover:text-teal-800"
            >
              <Mail size={22} /> yourmail@gmail.com
            </a>

            <a
              href="https://github.com/yourgithub"
              target="_blank"
              className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
            >
              <Github size={22} /> github.com/yourgithub
            </a>

            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              className="flex items-center gap-3 text-[#0A66C2] hover:text-[#084a8e]"
            >
              <Linkedin size={22} /> linkedin.com/in/yourlinkedin
            </a>
          </div>
        </motion.div>

        {/* RIGHT: CONTACT FORM */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-teal-50 border border-teal-100 rounded-xl shadow-sm p-6"
        >
          <div className="grid grid-cols-1 gap-4">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-gray-700">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg shadow-md transition"
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>

      </div>
    </section>
  );
}
