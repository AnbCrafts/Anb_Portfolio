import Certificate from "../Schema/Certificate.Schema.js";

// @desc    Create new certificate
// @route   POST /api/certificates
// @access  Private
const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    return res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    return res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private
const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    return res.json({ success: true, data: certificate });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private
const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }
    return res.json({ success: true, message: "Certificate deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createCertificate, getAllCertificates, updateCertificate, deleteCertificate };
