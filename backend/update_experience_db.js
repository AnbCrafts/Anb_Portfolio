import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "./src/Schema/Experience.Schema.js";

dotenv.config();

const experiencesData = [
  {
    title: "Software Developer",
    company: "Management & Computer Consultants (MCC)",
    year: "Sept 2026 - Present",
    desc: "Currently undergoing intensive training in C#, .NET, and SQL while contributing to software development projects.",
    type: "work",
    displayOrder: 10,
  },
  {
    title: "MERN Stack Developer Intern",
    company: "Hansraj Ventures",
    year: "May 2026 - Sept 2026",
    desc: "Developed and maintained scalable MERN stack applications using MongoDB, Express.js, React.js, and Node.js. Built secure RESTful APIs, responsive frontend interfaces, optimized database structures, and managed deployments on AWS, GCP, VPS, Docker, Nginx, and PM2.",
    type: "work",
    displayOrder: 9,
  },
  {
    title: "Full-Stack Developer",
    company: "Personal Projects & Freelance",
    year: "2025",
    desc: "Building production-grade apps including Nirman AI, TrackForge & FitForWork. Focusing on scalable MERN architecture, advanced UI engineering, and system design patterns.",
    type: "work",
    displayOrder: 8,
  },
  {
    title: "Hack-O-Nova Finalist",
    company: "Adamas University",
    year: "2024",
    desc: "Led a team in a 36-hour hackathon to build an AI study planner. Handled frontend architecture and pitched the final prototype to a panel of judges.",
    type: "achievement",
    displayOrder: 7,
  },
  {
    title: "Full-Stack Trainee",
    company: "Ardent Computech",
    year: "2024",
    desc: "Intensive industrial training covering the MERN stack. Mastered REST APIs, Docker containerization, Authentication (JWT), and database schema design.",
    type: "education",
    displayOrder: 6,
  },
  {
    title: "NPTEL Java Certification",
    company: "Elite + Silver Award",
    year: "2024",
    desc: "Achieved top 5% score. Strengthened core programming concepts including OOP, Multithreading, and Data Structures in Java.",
    type: "education",
    displayOrder: 5,
  },
  {
    title: "Higher Secondary (PCM)",
    company: "Science Stream",
    year: "2022",
    desc: "Built a strong foundation in Logic, Mathematics, and Computer Science fundamentals with a 91.2% aggregate.",
    type: "education",
    displayOrder: 4,
  },
];

const updateDb = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("Error: MONGODB_URI is not defined");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Clear existing experience items to replace with updated list
    await Experience.deleteMany({});
    console.log("Cleared existing Experience collection.");

    const inserted = await Experience.insertMany(experiencesData);
    console.log(`Successfully inserted ${inserted.length} experience records.`);

    process.exit(0);
  } catch (err) {
    console.error("Error updating DB:", err);
    process.exit(1);
  }
};

updateDb();
