import { Quote } from "lucide-react";
import { useSelector } from "react-redux";

const reviewsFallback = [
  {
    text: "Anubhaw is one of the most dedicated developers I've worked with. His ability to solve complex backend logic during our Hackathon was impressive.",
    name: "Teammate Name",
    role: "Hackathon Peer",
  },
  {
    text: "He consistently writes clean, maintainable code and picks up new technologies incredibly fast.",
    name: "Mentor Name",
    role: "Senior Developer",
  }
];

export default function Testimonials() {
  const dbTestimonials = useSelector((state) => state.portfolio.testimonials);

  // Map database reviews
  const mappedDbTestimonials = dbTestimonials.map((t) => ({
    text: t.message,
    name: t.name,
    role: t.company ? `${t.role} at ${t.company}` : t.role,
  }));

  const reviews = mappedDbTestimonials.length > 0 ? mappedDbTestimonials : reviewsFallback;

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">What People Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative">
            <Quote className="text-teal-100 absolute top-4 right-4" size={48} />
            <p className="text-slate-600 italic relative z-10 mb-6">"{r.text}"</p>
            <div>
              <p className="font-bold text-slate-900">{r.name}</p>
              <p className="text-xs text-teal-600 uppercase font-bold tracking-wider">{r.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}