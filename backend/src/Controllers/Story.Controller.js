import Story from "../Schema/Story.Schema.js";

// @desc    Create new story
// @route   POST /api/stories
// @access  Private
const createStory = async (req, res) => {
  try {
    const story = await Story.create(req.body);
    return res.status(201).json({ success: true, data: story });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Story with this title or slug already exists" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
const getAllStories = async (req, res) => {
  try {
    const { includeDrafts } = req.query;
    const filter = {};

    if (includeDrafts !== "true") {
      filter.published = true;
    }

    const stories = await Story.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: stories.length, data: stories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get story by slug
// @route   GET /api/stories/slug/:slug
// @access  Public
const getStoryBySlug = async (req, res) => {
  try {
    const story = await Story.findOne({ slug: req.params.slug });
    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }
    return res.json({ success: true, data: story });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update story
// @route   PUT /api/stories/:id
// @access  Private
const updateStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    return res.json({ success: true, data: story });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Story with this title/slug already exists" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete story
// @route   DELETE /api/stories/:id
// @access  Private
const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }
    return res.json({ success: true, message: "Story deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createStory, getAllStories, getStoryBySlug, updateStory, deleteStory };
