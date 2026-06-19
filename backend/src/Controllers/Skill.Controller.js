import Skill from "../Schema/Skill.Schema.js";

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    return res.status(201).json({ success: true, data: skill });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Skill already exists" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ displayOrder: 1, name: 1 });
    return res.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    return res.json({ success: true, data: skill });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }
    return res.json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createSkill, getAllSkills, updateSkill, deleteSkill };
