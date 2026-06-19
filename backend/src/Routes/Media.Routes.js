import express from "express";
import { uploadMedia, getAllMedia, deleteMedia } from "../Controllers/Media.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";
import { upload } from "../Middleware/Upload.Middleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadMedia);
router.get("/", protect, getAllMedia);
router.delete("/:id", protect, deleteMedia);

export default router;
