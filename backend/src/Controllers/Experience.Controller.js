import Experience from "../Schema/Experience.Schema.js";

// @desc    Create new experience
// @route   POST /api/experience
// @access  Private
const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    return res.status(201).json({ success: true, data: experience });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ displayOrder: 1, createdAt: -1 });
    return res.json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return res.status(404).json({ success: false, message: "Experience not found" });
    }

    return res.json({ success: true, data: experience });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: "Experience not found" });
    }
    return res.json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createExperience, getAllExperiences, updateExperience, deleteExperience };
