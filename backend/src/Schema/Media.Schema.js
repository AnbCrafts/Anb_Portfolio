import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Media filename is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Media type is required (e.g. image, video, pdf)"],
      enum: ["image", "video", "pdf", "raw"],
    },
    url: {
      type: String,
      required: [true, "Media URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
    },
    size: {
      type: Number, // size in bytes
      required: [true, "Media size is required"],
    },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", MediaSchema);
export default Media;
