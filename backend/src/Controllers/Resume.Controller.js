import Resume from "../Schema/Resume.Schema.js";

// @desc    Create new resume link/file entry
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    return res.status(201).json({ success: true, data: resume });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all resume uploads
// @route   GET /api/resumes
// @access  Private
const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: resumes.length, data: resumes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get the active resume for visitors
// @route   GET /api/resumes/active
// @access  Public
const getActiveResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true });
    if (!resume) {
      return res.status(404).json({ success: false, message: "No active resume found" });
    }
    return res.json({ success: true, data: resume });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update resume details or activate/deactivate it
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    // Note: The pre-save hook on the Resume schema automatically deactivates other resumes if this one is set to active: true.
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    Object.assign(resume, req.body);
    await resume.save();

    return res.json({ success: true, data: resume });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete resume entry
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    return res.json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createResume, getAllResumes, getActiveResume, updateResume, deleteResume };
