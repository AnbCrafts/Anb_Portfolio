import multer from "multer";
import { storage } from "../Config/Cloudinary.Config.js";

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB max for videos/large files
  },
  fileFilter: (req, file, cb) => {
    // Allowed file extensions
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "application/pdf",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type. Only images, videos (mp4/mov), and PDFs are allowed."), false);
    }
  },
});

export { upload };
