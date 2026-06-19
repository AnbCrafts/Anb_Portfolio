import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company/Issuer name is required"],
      trim: true,
    },
    location: {
      type: String,
      default: "",
    },
    year: {
      type: String,
      required: [true, "Year display string is required (e.g. '2025 - Present')"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    type: {
      type: String,
      enum: ["work", "education", "achievement"],
      default: "work",
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    certificate: {
      type: String,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", ExperienceSchema);
export default Experience;
