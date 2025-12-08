import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { MapPin, Calendar, ArrowRight, BookOpen } from "lucide-react";

export default function Stories() {
  
  const stories = [
    {
      id: 1,
      image: assets.hero1,
      tag: "Hackathon",
      color: "bg-amber-100 text-amber-800 border-amber-200", // Custom badge color
      title: "Hack-O-Nova 2024",
      short: "A high-pressure 36-hour hackathon where we conceptualized and built an AI-driven study planner from scratch.",
      year: "Mar 2024",
      location: "Adamas University",
      slug: "hackonova-2024",
    },
    {
      id: 2,
      image: assets.hero3,
      tag: "Certification",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      title: "NPTEL — Java Programming",
      short: "Awarded Elite+Silver for mastering advanced Java concepts, including Multithreading, Collections, and OOP design patterns.",
      year: "Jan 2024",
      location: "JIS University",
      slug: "nptel-java",
    },
    {
      id: 3,
      image: assets.hero5,
      tag: "Training",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      title: "MERN Architecture Training",
      short: "An intensive industrial training program focused on building scalable APIs, managing MongoDB schemas, and deploying to AWS.",
      year: "Dec 2023",
      location: "Ardent Computech",
      slug: "mern-training-ardent",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="w-full bg-slate-50 py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* --- HERO HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                <BookOpen size={14} /> My Journey
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Behind the <span className="text-teal-600">Code</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Software engineering is more than just typing syntax. It's about the experiences, 
              the pressure of hackathons, and the discipline of continuous learning.
            </p>
          </motion.div>
        </div>

        {/* --- STORIES GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          
          {stories.map((story) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-teal-200 transition-all duration-300"
            >
              
              {/* IMAGE HEADER */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                
                {/* FLOATING BADGE */}
                <span className={`
                    absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-lg border shadow-sm
                    ${story.color}
                `}>
                  {story.tag}
                </span>
              </div>

              {/* CARD BODY */}
              <div className="p-6 flex flex-col flex-grow">
                
                {/* Meta Data */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                   <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-teal-500" /> {story.year}
                   </div>
                   <div className="w-1 h-1 bg-slate-300 rounded-full" />
                   <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-teal-500" /> {story.location}
                   </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                  {story.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {story.short}
                </p>

                {/* READ MORE LINK */}
                <a
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-teal-600 transition-colors mt-auto group/link"
                >
                  Read Full Story 
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}

        </motion.div>

      </div>
    </section>
  );
}