import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      default: "127.0.0.1",
    },
    country: {
      type: String,
      default: "Unknown",
    },
    city: {
      type: String,
      default: "Unknown",
    },
    region: {
      type: String,
      default: "Unknown",
    },
    referrer: {
      type: String,
      default: "Direct / Other",
    },
    rawReferrer: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "/",
    },
    userAgent: {
      type: String,
      default: "",
    },
    deviceType: {
      type: String,
      enum: ["Desktop", "Mobile", "Tablet"],
      default: "Desktop",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", AnalyticsSchema);
export default Analytics;
