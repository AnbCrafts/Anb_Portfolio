import Blog from "../Schema/Blog.Schema.js";

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.status(201).json({ success: true, data: blog });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Blog post with this title or slug already exists" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = async (req, res) => {
  try {
    const { includeDrafts, category } = req.query;
    const filter = {};

    if (includeDrafts !== "true") {
      filter.published = true;
    }

    if (category && category !== "All") {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    const blogs = await Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 });
    return res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get blog by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    return res.json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    return res.json({ success: true, data: blog });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Blog post with this title/slug already exists" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    return res.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add suggestion / feedback to a blog post
// @route   POST /api/blogs/slug/:slug/suggestions
// @access  Public
const addBlogSuggestion = async (req, res) => {
  try {
    const { name, email, feedback, rating } = req.body;
    if (!name || !feedback) {
      return res.status(400).json({ success: false, message: "Name and feedback message are required" });
    }

    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    const newSuggestion = {
      name,
      email: email || "",
      feedback,
      rating: rating || "Helpful",
      createdAt: new Date(),
    };

    blog.suggestions.unshift(newSuggestion);
    await blog.save();

    return res.status(201).json({ success: true, message: "Suggestion submitted successfully", data: newSuggestion });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog, addBlogSuggestion };
