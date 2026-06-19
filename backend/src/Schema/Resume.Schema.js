import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resume title is required"],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "Resume file URL is required"],
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre-save hook: Ensure that if active is true, all other resumes are set to active: false
ResumeSchema.pre("save", async function (next) {
  if (this.active) {
    await this.constructor.updateMany({ _id: { $ne: this._id } }, { active: false });
  }
  next();
});

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;
