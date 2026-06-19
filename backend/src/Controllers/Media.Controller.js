import Media from "../Schema/Media.Schema.js";
import { cloudinary } from "../Config/Cloudinary.Config.js";

// @desc    Upload media item
// @route   POST /api/media/upload
// @access  Private
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Determine type
    let fileType = "raw";
    if (req.file.mimetype.includes("image")) {
      fileType = "image";
    } else if (req.file.mimetype.includes("video")) {
      fileType = "video";
    } else if (req.file.mimetype === "application/pdf") {
      fileType = "pdf";
    }

    // Save metadata to MongoDB
    const media = await Media.create({
      name: req.file.originalname,
      type: fileType,
      url: req.file.path, // Cloudinary URL
      publicId: req.file.filename, // Cloudinary public_id
      size: req.file.size,
    });

    return res.status(201).json({ success: true, data: media });
  } catch (error) {
    console.error("Upload Media Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all uploaded media items
// @route   GET /api/media
// @access  Private
const getAllMedia = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) {
      filter.type = type;
    }

    const mediaList = await Media.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: mediaList.length, data: mediaList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete media item
// @route   DELETE /api/media/:id
// @access  Private
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: "Media item not found" });
    }

    // Determine Cloudinary resource type for deletion
    let resourceType = "image";
    if (media.type === "video") {
      resourceType = "video";
    } else if (media.type === "pdf" || media.type === "raw") {
      resourceType = "raw";
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(media.publicId, { resource_type: resourceType });
    } catch (clErr) {
      console.warn("Could not delete asset from Cloudinary (might have been removed already):", clErr.message);
    }

    // Delete from DB
    await media.deleteOne();

    return res.json({ success: true, message: "Media item deleted successfully" });
  } catch (error) {
    console.error("Delete Media Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { uploadMedia, getAllMedia, deleteMedia };
