import express from "express";
import {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
} from "../Controllers/Contact.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getAllContacts)
  .post(createContact);

router.route("/:id")
  .put(protect, updateContactStatus)
  .delete(protect, deleteContact);

export default router;
