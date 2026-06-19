import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "", // Can store icon class or name if needed, or leave empty
    },
    category: {
      type: String,
      required: [true, "Skill category is required"],
      enum: ["Frontend", "Backend", "Database", "DevOps & Tools"],
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 80,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", SkillSchema);
export default Skill;
