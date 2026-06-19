import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import compression from "compression";

// Import Routes
import authRoutes from "./Routes/Auth.Routes.js";
import projectRoutes from "./Routes/Project.Routes.js";
import storyRoutes from "./Routes/Story.Routes.js";
import skillRoutes from "./Routes/Skill.Routes.js";
import experienceRoutes from "./Routes/Experience.Routes.js";
import certificateRoutes from "./Routes/Certificate.Routes.js";
import contactRoutes from "./Routes/Contact.Routes.js";
import settingsRoutes from "./Routes/Settings.Routes.js";
import testimonialRoutes from "./Routes/Testimonial.Routes.js";
import resumeRoutes from "./Routes/Resume.Routes.js";
import mediaRoutes from "./Routes/Media.Routes.js";
import dashboardRoutes from "./Routes/Dashboard.Routes.js";

dotenv.config();

const app = express();

// Global Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false, // Allows media assets loading in development
}));
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());       // Parse httpOnly cookies on every request
app.use(compression());        // Gzip compress all responses
app.use(morgan("dev"));

// Health Check Route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Portfolio CMS API is running" });
});

// API Routes Mounting
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// Global Error Handler — handles ApiError + unexpected errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message    = err.message    || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    console.error(`[${statusCode}] ${message}\n`, err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;

