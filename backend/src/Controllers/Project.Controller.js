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

// @desc    Seed initial flagship projects
// @route   POST /api/projects/seed
// @access  Public
const seedProjects = async (req, res) => {
  try {
    const projectsToSeed = [
      {
        title: "TrackForge",
        slug: "trackforge",
        description: "A complete bug tracking & sprint management platform featuring Groq Llama 3.3 AI code analysis, multi-role access control (RBAC), real-time collaborative workspace rooms, sprint analytics, and customizable kanban status workflows.",
        category: "fullstack",
        techStack: ["MERN Stack", "Groq Llama 3.3 AI", "Socket.io", "Recharts", "Tailwind CSS", "JWT Auth"],
        githubUrl: "https://github.com/AnbCrafts/TrackForge.git",
        liveUrl: "https://trackforge-client-qpdy.onrender.com/",
        thumbnail: "https://raw.githubusercontent.com/AnbCrafts/TrackForge/master/screenshots/home.png",
        gallery: ["https://raw.githubusercontent.com/AnbCrafts/TrackForge/master/screenshots/home.png"],
        featured: true,
        displayOrder: 1,
        status: "active"
      },
      {
        title: "Nirman.AI (Website Builder)",
        slug: "website-builder",
        description: "An autonomous multi-agent AI website generator powered by Google Gemini. Features a 4-stage AI architecture (Plan, Code, Refine, Audit), in-browser Monaco Studio IDE, real-time iframe preview staging, and full-stack web application compilation.",
        category: "ai",
        techStack: ["React", "Node.js", "Express", "Google Gemini AI", "Monaco Editor", "Tailwind CSS"],
        githubUrl: "https://github.com/AnbCrafts/Website-Builder-Client.git",
        liveUrl: "https://website-builder-client-r1q9.onrender.com",
        thumbnail: "https://raw.githubusercontent.com/AnbCrafts/Website-Builder-Client/main/Screenshots/home.png",
        gallery: [
          "https://raw.githubusercontent.com/AnbCrafts/Website-Builder-Client/main/Screenshots/home.png",
          "https://raw.githubusercontent.com/AnbCrafts/Website-Builder-Client/main/Screenshots/split.png"
        ],
        featured: true,
        displayOrder: 2,
        status: "active"
      },
      {
        title: "CodeSage AI",
        slug: "codesage",
        description: "An AI-powered developer assistant powered by Llama 3 70B models. Features automated code explanation, line-by-line syntax breakdown, Big O complexity analysis, multi-language code translation, and unit test generation.",
        category: "ai",
        techStack: ["MERN Stack", "Llama 3 70B", "Groq AI API", "Monaco Editor", "Tailwind CSS"],
        githubUrl: "https://github.com/AnbCrafts/CodeSage.git",
        liveUrl: "https://codesage-client.onrender.com/",
        thumbnail: "https://raw.githubusercontent.com/AnbCrafts/CodeSage/main/screenshots/home.png",
        gallery: ["https://raw.githubusercontent.com/AnbCrafts/CodeSage/main/screenshots/home.png"],
        featured: true,
        displayOrder: 3,
        status: "active"
      }
    ];

    const results = [];
    for (const proj of projectsToSeed) {
      const updated = await Project.findOneAndUpdate(
        { title: proj.title },
        proj,
        { upsert: true, new: true, runValidators: true }
      );
      results.push(updated);
    }

    return res.status(200).json({ success: true, message: "Flagship projects seeded successfully", data: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createProject, getAllProjects, getProjectBySlug, updateProject, deleteProject, seedProjects };

