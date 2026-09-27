import Analytics from "../Schema/Analytics.Schema.js";

// Helper: classify incoming referrer URL
const parseReferrerSource = (rawReferrer) => {
  if (!rawReferrer || typeof rawReferrer !== "string" || rawReferrer.trim() === "") {
    return "Direct Clicks";
  }
  const ref = rawReferrer.toLowerCase();
  if (ref.includes("linkedin.com") || ref.includes("lnkd.in")) return "LinkedIn";
  if (ref.includes("instagram.com")) return "Instagram";
  if (ref.includes("google.") || ref.includes("bing.") || ref.includes("duckduckgo.")) return "Google Search";
  if (ref.includes("github.com")) return "GitHub";
  if (ref.includes("twitter.com") || ref.includes("t.co") || ref.includes("x.com")) return "Twitter / X";
  if (ref.includes("facebook.com") || ref.includes("fb.me")) return "Facebook";
  if (ref.includes("whatsapp.com")) return "WhatsApp";
  return "Other Referral";
};

// Helper: parse simple device type from User Agent
const parseDeviceType = (ua) => {
  if (!ua) return "Desktop";
  const agent = ua.toLowerCase();
  if (agent.includes("mobile") || agent.includes("iphone") || agent.includes("android")) return "Mobile";
  if (agent.includes("ipad") || agent.includes("tablet")) return "Tablet";
  return "Desktop";
};

// @desc    Log a new visitor page hit
// @route   POST /api/analytics/track
// @access  Public
const logVisit = async (req, res) => {
  try {
    const { path, rawReferrer, userAgent, ip } = req.body;

    const clientIp =
      ip ||
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "127.0.0.1";

    const referrerCategory = parseReferrerSource(rawReferrer);
    const deviceType = parseDeviceType(userAgent || req.headers["user-agent"]);

    const visit = await Analytics.create({
      ipAddress: clientIp,
      path: path || "/",
      rawReferrer: rawReferrer || "",
      referrer: referrerCategory,
      userAgent: userAgent || req.headers["user-agent"] || "",
      deviceType,
      country: clientIp === "127.0.0.1" || clientIp.startsWith("192.") ? "Local Development" : "India",
      city: "Active Session",
    });

    return res.status(201).json({ success: true, data: visit });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get aggregated analytics summary
// @route   GET /api/analytics/summary
// @access  Private / Admin
const getAnalyticsSummary = async (req, res) => {
  try {
    const totalVisits = await Analytics.countDocuments();
    const uniqueIPs = await Analytics.distinct("ipAddress");
    const uniqueVisitorsCount = uniqueIPs.length;

    // Aggregate Traffic Sources (Referrers)
    const referrersBreakdown = await Analytics.aggregate([
      { $group: { _id: "$referrer", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Aggregate Devices Breakdown
    const devicesBreakdown = await Analytics.aggregate([
      { $group: { _id: "$deviceType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Aggregate Popular Pages
    const popularPages = await Analytics.aggregate([
      { $group: { _id: "$path", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Recent Visits Log
    const recentVisits = await Analytics.find()
      .sort({ createdAt: -1 })
      .limit(50);

    return res.json({
      success: true,
      data: {
        totalVisits,
        uniqueVisitorsCount,
        referrersBreakdown,
        devicesBreakdown,
        popularPages,
        recentVisits,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { logVisit, getAnalyticsSummary };
