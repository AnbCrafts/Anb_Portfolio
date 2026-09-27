import Contact from "../Schema/Contact.Schema.js";
import { sendEmail } from "../Services/email.service.js";

// @desc    Submit new contact inquiry
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message });

    // Send asynchronous email notification to admin
    try {
      sendEmail({
        to: process.env.SUPERADMIN_EMAIL || "anubhawgupta664@gmail.com",
        subject: `New Portfolio Inquiry from ${name}: ${subject || "General Inquiry"}`,
        text: `You received a new inquiry on your portfolio!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0d9488;">New Portfolio Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
            <p><strong>Message:</strong></p>
            <p style="background: #f8fafc; padding: 15px; rounded: 8px; border-left: 4px solid #0d9488;">${message}</p>
          </div>
        `,
      }).catch((err) => console.log("[SMTP Notification Notice]:", err.message));
    } catch (e) {
      console.log("[SMTP Error]:", e.message);
    }

    return res.status(201).json({ success: true, data: contact });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Private
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update contact status
// @route   PUT /api/contacts/:id
// @access  Private
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    return res.json({ success: true, data: contact });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    return res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createContact, getAllContacts, updateContactStatus, deleteContact };
