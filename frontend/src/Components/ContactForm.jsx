import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, resetContactStatus } from "../Store/portfolioStore";
import { motion } from "framer-motion";
import { Mail, User, Send } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export default function ContactForm() {
  const dispatch = useDispatch();
  const { submitContactStatus, submitContactError } = useSelector(
    (state) => state.portfolio
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  useEffect(() => {
    if (submitContactStatus === "succeeded") {
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
      dispatch(resetContactStatus());
    } else if (submitContactStatus === "failed") {
      toast.error(submitContactError || "Failed to send message. Please try again.");
      dispatch(resetContactStatus());
    }
  }, [submitContactStatus, submitContactError, dispatch]);

  const isLoading = submitContactStatus === "loading";

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-teal-100 max-w-xl w-full"
    >
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="relative">
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="peer bg-transparent border rounded-md w-full py-3 px-10 placeholder-transparent focus:outline-none"
            placeholder="Your name"
          />
          <User className="absolute left-3 top-3 text-teal-500" />
          <span className="absolute left-10 -top-3 text-xs bg-white/60 px-2 rounded text-teal-700">Full name</span>
        </label>

        <label className="relative">
          <input
            required
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="peer bg-transparent border rounded-md w-full py-3 px-10 placeholder-transparent focus:outline-none"
            placeholder="Email address"
          />
          <Mail className="absolute left-3 top-3 text-teal-500" />
          <span className="absolute left-10 -top-3 text-xs bg-white/60 px-2 rounded text-teal-700">Email</span>
        </label>

        <label className="relative md:col-span-2">
          <textarea
            required
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full bg-transparent border rounded-md py-3 px-4 placeholder-gray-300 focus:outline-none"
            placeholder="Tell me about your project..."
          />
          <span className="absolute left-3 -top-3 text-xs bg-white/60 px-2 rounded text-teal-700">Message</span>
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <small className="text-gray-500">Prefer a call? <a className="text-teal-700 cursor-pointer">Book a slot</a></small>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors font-semibold"
        >
          {isLoading ? "Sending..." : "Send message"}
          <Send size={14} />
        </button>
      </div>
    </motion.form>
  );
}
