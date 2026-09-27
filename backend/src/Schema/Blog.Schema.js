import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, "Blog cover image is required"],
    },
    category: {
      type: String,
      required: [true, "Blog category (e.g. C#, MERN, Daily Log) is required"],
      trim: true,
      default: "General",
    },
    summary: {
      type: String,
      required: [true, "Blog summary is required"],
    },
    content: {
      type: String,
      default: "",
    },
    learned: [
      {
        type: String,
      },
    ],
    built: [
      {
        type: String,
      },
    ],
    challenges: [
      {
        type: String,
      },
    ],
    gallery: [
      {
        type: String,
      },
    ],
    readTime: {
      type: String,
      default: "3 min read",
    },
    published: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    suggestions: [
      {
        name: { type: String, required: true },
        email: { type: String, default: "" },
        feedback: { type: String, required: true },
        rating: { type: String, default: "Helpful" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Auto-slugify before saving
BlogSchema.pre("save", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  next();
});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
