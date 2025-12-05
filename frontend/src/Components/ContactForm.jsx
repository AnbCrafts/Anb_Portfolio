// ContactForm.jsx
import { motion } from "framer-motion";
import { Mail, User } from "lucide-react";

export default function ContactForm() {
  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-teal-100 max-w-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="relative">
          <input required name="name" className="peer bg-transparent border rounded-md w-full py-3 px-10 placeholder-transparent focus:outline-none" placeholder="Your name" />
          <User className="absolute left-3 top-3 text-teal-500" />
          <span className="absolute left-10 -top-3 text-xs bg-white/60 px-2 rounded text-teal-700">Full name</span>
        </label>

        <label className="relative">
          <input required name="email" type="email" className="peer bg-transparent border rounded-md w-full py-3 px-10 placeholder-transparent focus:outline-none" placeholder="Email address"/>
          <Mail className="absolute left-3 top-3 text-teal-500" />
          <span className="absolute left-10 -top-3 text-xs bg-white/60 px-2 rounded text-teal-700">Email</span>
        </label>

        <label className="relative md:col-span-2">
          <textarea required name="message" rows="4" className="w-full bg-transparent border rounded-md py-3 px-4 placeholder-gray-300" placeholder="Tell me about your project..."></textarea>
          <span className="absolute left-3 -top-3 text-xs bg-white/60 px-2 rounded text-teal-700">Message</span>
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <small className="text-gray-500">Prefer a call? <a className="text-teal-700">Book a slot</a></small>
        <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded-lg">Send message</button>
      </div>
    </motion.form>
  );
}
