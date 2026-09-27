import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Blog from "../Schema/Blog.Schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

async function clearBlogs() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas!");

    const result = await Blog.deleteMany({});
    console.log(`Deleted ${result.deletedCount} blog posts from MongoDB Atlas.`);

    process.exit(0);
  } catch (err) {
    console.error("Error clearing blogs from database:", err);
    process.exit(1);
  }
}

clearBlogs();
