import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { storyDB } from "../DB/StoryDB";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Zap, 
  Clock, 
  ImageIcon 
} from "lucide-react";

export default function StoryPage() {
  const { slug } = useParams();
  const dbStories = useSelector((state) => state.portfolio.stories);

  // Retrieve story by slug from Redux or mock fallback
  const dbStory = dbStories.find((s) => s.slug === slug);
  const story = dbStory || (storyDB && storyDB[slug]);

  if (!story) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-slate-400">
        <h2 className="text-2xl font-bold text-slate-700">Story not found</h2>
        <Link to="/stories" className="mt-4 text-teal-600 hover:underline">Return to Stories</Link>
      </div>
    );
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <article className="w-full bg-white dark:bg-slate-950 min-h-screen pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* ===========================
          1. IMMERSIVE HERO
      ============================ */}
      <div className="relative w-full h-[50vh] lg:h-[60vh]">
        {/* Background Image */}
        <img 
          src={story.image} 
          alt={story.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        {/* Navigation & Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-12 max-w-7xl mx-auto w-full pt-20">
            {/* Back Button */}
            <Link 
              to="/stories" 
              className="w-fit flex items-center gap-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full transition-all"
            >
              <ArrowLeft size={18} /> Back to Stories
            </Link>

            {/* Title Block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
               <span className="inline-block px-3 py-1 mb-4 rounded bg-teal-500 text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg">
                 {story.tag}
               </span>
               <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight">
                 {story.title}
               </h1>
            </motion.div>
        </div>
      </div>

      {/* ===========================
          2. MAIN CONTENT GRID
      ============================ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12">
           {/* --- LEFT SIDEBAR (STICKY) --- */}
           <aside className="hidden lg:block">
              <div className="sticky top-24 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 space-y-6">
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Timeline</h4>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                       <Calendar size={18} className="text-teal-600 dark:text-teal-400" /> {story.year}
                    </div>
                 </div>

                 <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Location</h4>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                       <MapPin size={18} className="text-teal-600 dark:text-teal-400" /> {story.location}
                    </div>
                 </div>

                 <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Key Focus</h4>
                    <div className="flex flex-wrap gap-2">
                       <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md">Development</span>
                       <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md">Problem Solving</span>
                    </div>
                 </div>
              </div>
           </aside>

           {/* --- RIGHT MAIN CONTENT --- */}
           <motion.div 
             className="bg-white dark:bg-slate-950 rounded-t-3xl lg:rounded-3xl p-6 lg:p-0"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
           >
              {/* Mobile Meta */}
              <div className="flex flex-wrap gap-4 lg:hidden mb-8 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-6">
                 <span className="flex items-center gap-2"><Calendar size={16} /> {story.year}</span>
                 <span className="flex items-center gap-2"><MapPin size={16} /> {story.location}</span>
              </div>

              {/* 1. OVERVIEW */}
              <section className="mb-16">
                 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light first-letter:text-5xl first-letter:font-bold first-letter:text-teal-700 dark:first-letter:text-teal-400 first-letter:float-left first-letter:mr-3">
                    {story.description}
                 </p>
              </section>

              {/* 2. WHAT I BUILT */}
              {story.built && story.built.length > 0 && (
                <section className="mb-16">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-teal-100 dark:bg-teal-950/60 rounded-lg text-teal-700 dark:text-teal-400"><Zap size={24} /></div>
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What I Built</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {story.built.map((item, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                           <p className="text-slate-700 dark:text-slate-200 font-medium">{item}</p>
                        </div>
                     ))}
                  </div>
                </section>
              )}

              {/* 3. WHAT I LEARNED */}
              {story.learned && story.learned.length > 0 && (
                <section className="mb-16">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-blue-100 dark:bg-blue-950/60 rounded-lg text-blue-700 dark:text-blue-400"><Award size={24} /></div>
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Key Takeaways</h2>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
                     <ul className="space-y-4">
                        {story.learned.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                             <CheckCircle2 size={20} className="text-teal-500 dark:text-teal-400 mt-1 flex-shrink-0" />
                             <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{item}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
                </section>
              )}

              {/* 4. TIMELINE */}
              {story.timeline && story.timeline.length > 0 && (
                <section className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="p-2 bg-purple-100 dark:bg-purple-950/60 rounded-lg text-purple-700 dark:text-purple-400"><Clock size={24} /></div>
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Journey</h2>
                  </div>

                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
                     {story.timeline.map((step, i) => (
                        <div key={i} className="relative">
                           {/* Dot */}
                           <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-teal-500" />
                           <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{step}</p>
                        </div>
                     ))}
                  </div>
                </section>
              )}

              {/* 5. CERTIFICATE */}
              {story.certificate && (
                <section className="mb-16">
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Credential</h2>
                   <div className="bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 inline-block shadow-lg">
                      <img 
                        src={story.certificate} 
                        alt="Certificate" 
                        className="w-full max-w-lg rounded-xl"
                      />
                   </div>
                </section>
              )}

              {/* 6. GALLERY */}
              {story.gallery && story.gallery.length > 0 && (
                <section className="mb-12">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-rose-100 dark:bg-rose-950/60 rounded-lg text-rose-700 dark:text-rose-400"><ImageIcon size={24} /></div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gallery</h2>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {story.gallery.map((img, i) => (
                         <div key={i} className="rounded-xl overflow-hidden h-64 border border-slate-200 dark:border-slate-800 shadow-sm group">
                            <img 
                              src={img} 
                              alt={`Gallery ${i}`} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                         </div>
                      ))}
                   </div>
                </section>
              )}
           </motion.div>
        </div>
      </div>
    </article>
  );
}