import app from "./src/app.js";
import connectDB from "./src/Config/Db.Config.js";
import User from "./src/Schema/User.Schema.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start Server helper
const startServer = async () => {
  // 1. Connect to Database
  await connectDB();

  // 2. Auto-seed SuperAdmin if it doesn't exist in the database
  try {
    const adminExists = await User.findOne({ role: "SuperAdmin" });
    if (!adminExists) {
      const email = process.env.SUPERADMIN_EMAIL || "anubhawgupta664@gmail.com";
      const password = process.env.SUPERADMIN_PASSWORD || "anb@19022205";
      const name = process.env.SUPERADMIN_NAME || "Anubhaw Gupta";
      await User.create({ name, email, password, role: "SuperAdmin" });
      console.log(`[Startup] Auto-seeded SuperAdmin: ${email}`);
    } else {
      console.log(`[Startup] SuperAdmin database verification checked: ${adminExists.email}`);
    }
  } catch (err) {
    console.error("[Startup] Auto-seeding SuperAdmin failed:", err.message);
  }

  // 3. Start listening
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start backend server:", error.message);
  process.exit(1);
});
