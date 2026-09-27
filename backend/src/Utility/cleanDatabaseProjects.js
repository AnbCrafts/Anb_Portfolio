import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Project from "../Schema/Project.Schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const cleanProjects = [
  // --- FULL STACK PROJECTS ---
  {
    title: "TrackForge",
    slug: "trackforge",
    description: "A complete bug tracking & sprint management platform featuring Groq Llama 3.3 AI code analysis, multi-role access control (RBAC), real-time collaborative workspace rooms, sprint analytics, and customizable kanban status workflows.",
    category: "fullstack",
    techStack: ["MERN Stack", "Groq Llama 3.3 AI", "Socket.io", "Recharts", "Tailwind CSS", "JWT Auth"],
    githubUrl: "https://github.com/AnbCrafts/TrackForge.git",
    liveUrl: "https://trackforge-client-qpdy.onrender.com/",
    thumbnail: "https://raw.githubusercontent.com/AnbCrafts/TrackForge/main/screenshots/landing.png",
    featured: true,
    displayOrder: 1,
    status: "active"
  },
  {
    title: "Nirman.AI (Website Builder)",
    slug: "website-builder",
    description: "An autonomous multi-agent AI website generator powered by Google Gemini. Features a 4-stage AI architecture (Plan, Code, Refine, Audit), in-browser Monaco Studio IDE, real-time iframe preview staging, and full-stack web application compilation.",
    category: "fullstack",
    techStack: ["React", "Node.js", "Express", "Google Gemini AI", "Monaco Editor", "Tailwind CSS"],
    githubUrl: "https://github.com/AnbCrafts/Website-Builder-Client.git",
    liveUrl: "https://website-builder-client-r1q9.onrender.com",
    thumbnail: "https://raw.githubusercontent.com/AnbCrafts/Website-Builder-Client/main/Screenshots/home.png",
    featured: true,
    displayOrder: 2,
    status: "active"
  },
  {
    title: "CodeSage AI",
    slug: "codesage",
    description: "An AI-powered developer assistant powered by Llama 3 70B models. Features automated code explanation, line-by-line syntax breakdown, Big O complexity analysis, multi-language code translation, and unit test generation.",
    category: "fullstack",
    techStack: ["MERN Stack", "Llama 3 70B", "Groq AI API", "Monaco Editor", "Tailwind CSS"],
    githubUrl: "https://github.com/AnbCrafts/CodeSage.git",
    liveUrl: "https://codesage-client.onrender.com/",
    thumbnail: "https://raw.githubusercontent.com/AnbCrafts/CodeSage/main/screenshots/home.png",
    featured: true,
    displayOrder: 3,
    status: "active"
  },
  {
    title: "Tomato (Food Ordering Platform)",
    slug: "tomato-food-ordering",
    description: "A full-stack food ordering platform featuring real-time cart management, interactive menu browsing, user authentication, order processing, and an administrative control panel.",
    category: "fullstack",
    techStack: ["MERN Stack", "React", "Node.js", "MongoDB", "Express", "Stripe"],
    githubUrl: "https://github.com/AnbCrafts/Tomato.git",
    liveUrl: "",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    featured: false,
    displayOrder: 4,
    status: "active"
  },
  {
    title: "Library Management System",
    slug: "library-management",
    description: "A full-stack web platform with dedicated User and Admin panels for catalog browsing, membership management, inventory tracking, and automated book issue/return operations.",
    category: "fullstack",
    techStack: ["MERN Stack", "React", "Node.js", "MongoDB", "RBAC"],
    githubUrl: "https://github.com/AnbCrafts/Library-Management.git",
    liveUrl: "",
    thumbnail: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop",
    featured: false,
    displayOrder: 5,
    status: "active"
  },

  // --- FRONTEND PROJECTS ---
  {
    title: "College Website",
    slug: "college-website",
    description: "A clean, responsive frontend college portal interface designed with HTML5, CSS3, JavaScript, and modern UI components.",
    category: "frontend",
    techStack: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    githubUrl: "https://github.com/AnbCrafts/College-Website.git",
    liveUrl: "",
    thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop",
    featured: false,
    displayOrder: 6,
    status: "active"
  },
  {
    title: "Beyond-Blue Showcase",
    slug: "beyond-blue",
    description: "A modern web design showcase recreating agency layout aesthetics, smooth scroll micro-interactions, and gradient visual elements.",
    category: "frontend",
    techStack: ["HTML5", "CSS3", "JavaScript", "UI/UX Design"],
    githubUrl: "https://github.com/AnbCrafts/Beyond-Blue.git",
    liveUrl: "",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    featured: false,
    displayOrder: 7,
    status: "active"
  },
  {
    title: "E-Commerce UI",
    slug: "ecommerce-ui",
    description: "A modern frontend e-commerce interface featuring responsive product grids, interactive category filters, cart modals, and glassmorphism styling.",
    category: "frontend",
    techStack: ["React", "Tailwind CSS", "Redux Toolkit", "UI/UX Design"],
    githubUrl: "https://github.com/AnbCrafts/E-Commerce.git",
    liveUrl: "",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop",
    featured: false,
    displayOrder: 8,
    status: "active"
  }
];

async function resetProjects() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected!");

    // Clear old records
    await Project.deleteMany({});
    console.log("Cleared existing database project records.");

    // Insert structured projects
    const res = await Project.insertMany(cleanProjects);
    console.log(`Successfully seeded ${res.length} categorized projects into MongoDB Atlas!`);

    process.exit(0);
  } catch (err) {
    console.error("Database seed error:", err);
    process.exit(1);
  }
}

resetProjects();
