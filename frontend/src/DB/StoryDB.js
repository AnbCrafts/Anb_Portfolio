
import { assets } from "../assets/assets";

export const storyDB = {
  "hackonova-2024": {
    image: assets.hero1,
    tag: "Hackathon",
    title: "Hack-O-Nova 2024",
    description:
      "A thrilling 36-hour hackathon where I built an AI-powered study planner that recommends optimized learning routines.",
    year: "2024",
    location: "Adamas University",
    built: [
      "AI-assisted planning engine",
      "Study session scheduler",
      "User-friendly dashboard UI",
      "Task priority logic for students"
    ],
    learned: [
      "Rapid prototyping under pressure",
      "Team coordination & communication",
      "Real-world problem solving",
      "UI decision-making under time constraints"
    ],
    timeline: [
      "Brainstormed problem statement within first 2 hours.",
      "Designed UI/UX and workflow diagrams.",
      "Developed backend logic and API models.",
      "Integrated ML logic for study recommendations.",
      "Final presentation and code walkthrough."
    ],
    certificate: "/cert-hack1.png",
    gallery: [assets.hero3, assets.hero4, assets.hero6],
  },

  "nptel-java": {
    image: assets.hero5,
    tag: "Certification",
    title: "NPTEL Java Programming",
    description:
      "Completed one of the toughest Java certification programs with strong programming fundamentals.",
    year: "2024",
    location: "JIS University",
    built: ["Java OOP Assignments", "Mini projects", "Concept-based coding"],
    learned: ["Strong OOP foundation", "Clean code practices", "Analytical thinking"],
    timeline: [
      "Completed weekly assignments.",
      "Cleared final exam with distinction.",
      "Understood deep Java internals."
    ],
    certificate: "/cert-nptel.png",
    gallery: [assets.hero2, assets.hero7],
  }
};
