import mongoose from "mongoose";
import dotenv from "dotenv";
import Skill from "./src/Schema/Skill.Schema.js";

dotenv.config();

const cleanSkills = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI is not defined");
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const deleted = await Skill.deleteMany({
      name: { $in: ["AWS", "Google Cloud Platform (GCP)", "GCP", "AWS EC2"] }
    });
    console.log(`Deleted ${deleted.deletedCount} AWS/GCP skill documents from MongoDB.`);

    process.exit(0);
  } catch (err) {
    console.error("Error cleaning skills DB:", err);
    process.exit(1);
  }
};

cleanSkills();
