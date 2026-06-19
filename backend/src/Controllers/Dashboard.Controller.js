import Project from "../Schema/Project.Schema.js";
import Story from "../Schema/Story.Schema.js";
import Skill from "../Schema/Skill.Schema.js";
import Testimonial from "../Schema/Testimonial.Schema.js";
import Contact from "../Schema/Contact.Schema.js";
import Resume from "../Schema/Resume.Schema.js";

// @desc    Get dashboard analytics metrics
// @route   GET /api/dashboard/analytics
// @access  Private
const getDashboardAnalytics = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalStories = await Story.countDocuments();
    const totalSkills = await Skill.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments();
    
    // Contact stats
    const totalContacts = await Contact.countDocuments();
    const pendingContacts = await Contact.countDocuments({ status: "Pending" });

    // Recent activity metrics
    const recentMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const activeResume = await Resume.findOne({ active: true });

    return res.json({
      success: true,
      data: {
        stats: {
          totalProjects,
          totalStories,
          totalSkills,
          totalTestimonials,
          totalContacts,
          pendingContacts,
        },
        recentMessages,
        recentProjects,
        activeResume: activeResume ? { title: activeResume.title, url: activeResume.fileUrl } : null,
      },
    });
  } catch (error) {
    console.error("Dashboard Analytics Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { getDashboardAnalytics };
