import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/Schema/User.Schema.js";

dotenv.config();

const checkAndSeed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("Error: MONGODB_URI is not defined in backend/.env");
      process.exit(1);
    }
    
    console.log("Connecting to MongoDB:", mongoUri);
    await mongoose.connect(mongoUri);
    console.log("Connected successfully!");

    const adminExists = await User.findOne({ role: "SuperAdmin" });
    if (adminExists) {
      console.log("SuperAdmin user found in database!");
      console.log(`Email: ${adminExists.email}`);
      console.log(`Role:  ${adminExists.role}`);
    } else {
      console.log("No SuperAdmin user found. Seeding now...");
      const email = process.env.SUPERADMIN_EMAIL || "anubhawgupta664@gmail.com";
      const password = process.env.SUPERADMIN_PASSWORD || "anb@19022205";
      const name = process.env.SUPERADMIN_NAME || "Anubhaw Gupta";
      
      const admin = await User.create({ name, email, password, role: "SuperAdmin" });
      console.log("Successfully seeded SuperAdmin!");
      console.log(`Email: ${admin.email}`);
    }
    process.exit(0);
  } catch (err) {
    console.error("Error checking/seeding database:", err.message);
    process.exit(1);
  }
};

checkAndSeed();
