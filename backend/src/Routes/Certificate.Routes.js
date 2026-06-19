import express from "express";
import {
  createCertificate,
  getAllCertificates,
  updateCertificate,
  deleteCertificate,
} from "../Controllers/Certificate.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(getAllCertificates)
  .post(protect, createCertificate);

router.route("/:id")
  .put(protect, updateCertificate)
  .delete(protect, deleteCertificate);

export default router;
