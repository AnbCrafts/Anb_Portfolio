import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Project from "../Schema/Project.Schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const projectsToSeed = [
  {
    title: "TrackForge",
    slug: "trackforge",
    description: "A complete bug tracking & sprint management platform featuring Groq Llama 3.3 AI code analysis, multi-role access control (RBAC), real-time collaborative workspace rooms, sprint analytics, and customizable kanban status workflows.",
    category: "fullstack",
    techStack: ["MERN Stack", "Groq Llama 3.3 AI", "Socket.io", "Recharts", "Tailwind CSS", "JWT Auth"],
    githubUrl: "https://github.com/AnbCrafts/TrackForge.git",
    liveUrl: "https://trackforge-client-qpdy.onrender.com/",
    thumbnail: "https://raw.githubusercontent.com/AnbCrafts/TrackForge/master/screenshots/home.png",
    gallery: [
      "https://raw.githubusercontent.com/AnbCrafts/TrackForge/master/screenshots/home.png"
    ],
    featured: true,
    displayOrder: 1,
    status: "active"
  },
  {
    title: "Nirman.AI (Website Builder)",
    slug: "website-builder",
    description: "An autonomous multi-agent AI website generator powered by Google Gemini. Features a 4-stage AI architecture (Plan, Code, Refine, Audit), in-browser Monaco Studio IDE, real-time iframe preview staging, and full-stack web application compilation.",
    category: "ai",
    techStack: ["React", "Node.js", "Express", "Google Gemini AI", "Monaco Editor", "Tailwind CSS"],
    githubUrl: "https://github.com/AnbCrafts/Website-Builder-Client.git",
    liveUrl: "https://website-builder-client-r1q9.onrender.com",
    thumbnail: "https://raw.githubusercontent.com/AnbCrafts/Website-Builder-Client/main/Screenshots/home.png",
    gallery: [
      "https://raw.githubusercontent.com/AnbCrafts/Website-Builder-Client/main/Screenshots/home.png",
      "https://raw.githubusercontent.com/AnbCrafts/Website-Builder-Client/main/Screenshots/split.png",
      "https://raw.githubusercontent.com/AnbCrafts/Website-Builder-Client/main/Screenshots/workspace.png"
    ],
    featured: true,
    displayOrder: 2,
    status: "active"
  },
  {
    title: "CodeSage AI",
    slug: "codesage",
    description: "An AI-powered developer assistant powered by Llama 3 70B models. Features automated code explanation, line-by-line syntax breakdown, Big O complexity analysis, multi-language code translation, and unit test generation.",
    category: "ai",
    techStack: ["MERN Stack", "Llama 3 70B", "Groq AI API", "Monaco Editor", "Tailwind CSS"],
    githubUrl: "https://github.com/AnbCrafts/CodeSage.git",
    liveUrl: "https://codesage-client.onrender.com/",
    thumbnail: "https://raw.githubusercontent.com/AnbCrafts/CodeSage/main/screenshots/home.png",
    gallery: [
      "https://raw.githubusercontent.com/AnbCrafts/CodeSage/main/screenshots/home.png",
      "https://raw.githubusercontent.com/AnbCrafts/CodeSage/main/screenshots/editor.png"
    ],
    featured: true,
    displayOrder: 3,
    status: "active"
  }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas!");

    for (const proj of projectsToSeed) {
      const updated = await Project.findOneAndUpdate(
        { title: proj.title },
        proj,
        { upsert: true, new: true, runValidators: true }
      );
      console.log(`Seeded/Updated project: ${updated.title}`);
    }

    console.log("Projects seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
