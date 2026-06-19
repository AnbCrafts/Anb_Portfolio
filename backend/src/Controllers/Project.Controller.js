import Project from "../Schema/Project.Schema.js";

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Project with this title or slug already exists" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all projects (public or including drafts for admin)
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res) => {
  try {
    const { category, featured, includeDrafts } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (featured === "true") filter.featured = true;

    // By default, hide drafts unless requested by authenticated queries or requested explicitly
    if (includeDrafts !== "true") {
      filter.status = "active";
    }

    const projects = await Project.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    return res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get project by slug
// @route   GET /api/projects/slug/:slug
// @access  Public
const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.json({ success: true, data: project });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Project with this title/slug already exists" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createProject, getAllProjects, getProjectBySlug, updateProject, deleteProject };
