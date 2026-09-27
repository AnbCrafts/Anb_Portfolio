import React, { useState, useEffect } from "react";
import { BarChart3, Users, Eye, Globe, Share2, Monitor, RefreshCw, AlertCircle, Play } from "lucide-react";
import axiosInstance from "../Axios/axiosInstance";

export default function AnalyticsCMS() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/analytics/summary");
      if (res.data && res.data.data) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching analytics summary:", err);
      setError(err.response?.data?.message || "Failed to load live analytics data");
    } finally {
      setLoading(false);
    }
  };

  const simulateTestHit = async (referrerName = "LinkedIn") => {
    try {
      await axiosInstance.post("/analytics/track", {
        path: "/",
        rawReferrer: referrerName === "LinkedIn" ? "https://www.linkedin.com/feed/" : "https://www.google.com/search?q=anubhaw+gupta",
        userAgent: navigator.userAgent,
      });
      fetchAnalytics();
    } catch (err) {
      console.error("Error simulating test hit:", err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const totalVisits = data?.totalVisits || 0;
  const uniqueVisitorsCount = data?.uniqueVisitorsCount || 0;
  const referrersBreakdown = data?.referrersBreakdown || [];
  const devicesBreakdown = data?.devicesBreakdown || [];
  const popularPages = data?.popularPages || [];
  const recentVisits = data?.recentVisits || [];

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400">
            <BarChart3 className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">Traffic & SEO Intelligence</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Visitor Analytics Dashboard</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => simulateTestHit("LinkedIn")}
            className="flex items-center gap-1.5 px-3 py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 text-xs font-bold rounded-xl transition-all"
          >
            <Play size={14} /> Log Test Hit (LinkedIn)
          </button>

          <button
            onClick={fetchAnalytics}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all border border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Metrics
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Page Views</span>
            <Eye size={18} className="text-teal-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{totalVisits}</p>
          <span className="text-[11px] text-teal-400 font-medium">Real live hits</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Unique Visitors</span>
            <Users size={18} className="text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{uniqueVisitorsCount}</p>
          <span className="text-[11px] text-emerald-400 font-medium">Distinct IP Addresses</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Top Traffic Source</span>
            <Share2 size={18} className="text-blue-400" />
          </div>
          <p className="text-2xl font-extrabold text-white truncate">
            {referrersBreakdown[0]?._id || "None yet"}
          </p>
          <span className="text-[11px] text-blue-400 font-medium">
            {referrersBreakdown[0]?.count || 0} Clicks
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Primary Device</span>
            <Monitor size={18} className="text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">
            {devicesBreakdown[0]?._id || "Desktop"}
          </p>
          <span className="text-[11px] text-purple-400 font-medium">
            {devicesBreakdown[0]?.count || 0} Sessions
          </span>
        </div>
      </div>

      {/* REFERRAL SOURCES & POPULAR PAGES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* REFERRAL BREAKDOWN */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Share2 size={16} className="text-teal-400" /> Referral Traffic Sources (LinkedIn, Instagram, Google)
          </h3>

          {referrersBreakdown.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs italic">
              No referral traffic recorded yet. Share your portfolio URL on LinkedIn or Instagram to track incoming clicks!
            </div>
          ) : (
            <div className="space-y-3">
              {referrersBreakdown.map((ref) => {
                const percentage = Math.round((ref.count / (totalVisits || 1)) * 100);
                return (
                  <div key={ref._id} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300 font-medium">
                      <span>{ref._id}</span>
                      <span className="font-mono text-slate-400">{ref.count} visits ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* POPULAR PAGES */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Globe size={16} className="text-emerald-400" /> Most Visited Pages & Routes
          </h3>

          {popularPages.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs italic">
              No page hits recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {popularPages.map((page) => (
                <div key={page._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                  <span className="font-mono text-teal-400 font-semibold">{page._id}</span>
                  <span className="font-bold text-slate-200">{page.count} views</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RECENT VISITS REAL-TIME LOG TABLE */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Users size={16} className="text-blue-400" /> Live Visitor Audit Logs ({recentVisits.length})
        </h3>

        {recentVisits.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs italic">
            No live visitor logs recorded yet. Visit your portfolio pages in a new tab to see your hits logged here live!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">IP Address</th>
                  <th className="py-3 px-4">Referrer Source</th>
                  <th className="py-3 px-4">Visited Path</th>
                  <th className="py-3 px-4">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentVisits.map((visit) => (
                  <tr key={visit._id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono text-slate-400">
                      {new Date(visit.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono text-teal-300">{visit.ipAddress}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-950 text-slate-300 border border-slate-800">
                        {visit.referrer}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-200">{visit.path}</td>
                    <td className="py-3 px-4 text-slate-400">{visit.deviceType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
