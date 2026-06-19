import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Story title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Story cover image is required"],
    },
    tag: {
      type: String,
      required: [true, "Story tag (e.g. Hackathon, Certification) is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Story description is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    built: [
      {
        type: String,
      },
    ],
    learned: [
      {
        type: String,
      },
    ],
    timeline: [
      {
        type: String,
      },
    ],
    certificate: {
      type: String,
      default: "",
    },
    gallery: [
      {
        type: String,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-slugify before saving
StorySchema.pre("save", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  next();
});

const Story = mongoose.model("Story", StorySchema);
export default Story;
