import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FolderOpen, 
  BookOpen, 
  Award, 
  Mail, 
  Activity, 
  ArrowUpRight, 
  UserCheck,
  Loader2,
  FileText
} from 'lucide-react';
import StatCard from '../Components/Shared/StatCard';
import { Link } from 'react-router-dom';
import { fetchDashboardAnalytics } from '../Store/cmsStore';

const DashboardHome = () => {
  const dispatch = useDispatch();
  const { data: analytics, loading: isLoading } = useSelector((state) => state.cms.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardAnalytics());
  }, [dispatch]);

  if (isLoading || !analytics) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <span className="text-xs font-semibold uppercase tracking-wider">Syncing Dashboard Analytics...</span>
      </div>
    );
  }

  const { stats, recentMessages, recentProjects, activeResume } = analytics;

  // Statistical data mapping directly from backend
  const statCardsData = [
    { 
      title: 'Total Projects', 
      value: stats?.totalProjects?.toString() || '0', 
      icon: FolderOpen, 
      change: 'Dynamic Live', 
      changeType: 'positive', 
      description: 'Repositories registered' 
    },
    { 
      title: 'Stories Built', 
      value: stats?.totalStories?.toString() || '0', 
      icon: BookOpen, 
      change: 'Fully Sync\'d', 
      changeType: 'neutral', 
      description: 'Articles and milestones' 
    },
    { 
      title: 'Skills Node Stack', 
      value: stats?.totalSkills?.toString() || '0', 
      icon: Award, 
      change: 'Valid Links', 
      changeType: 'positive', 
      description: 'Active stack elements' 
    },
    { 
      title: 'Unread Messages', 
      value: stats?.pendingContacts?.toString() || '0', 
      icon: Mail, 
      change: stats?.pendingContacts > 0 ? 'Requires Action' : 'Fully Reviewed', 
      changeType: stats?.pendingContacts > 0 ? 'negative' : 'positive', 
      description: 'Inbound contact forms' 
    },
  ];

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      
      {/* Welcome Banner Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent border border-slate-800/60">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            Welcome back, Anubhaw <span className="text-xl animate-bounce">👋</span>
          </h2>
          <p className="text-xs text-slate-400">
            Portfolio system status is normal. Cloudinary bucket and MongoDB endpoints are fully synchronized.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
          <UserCheck className="w-3.5 h-3.5" />
          MFA Status: Secured
        </div>
      </div>

      {/* Grid of Statistical Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCardsData.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Two Column Layout: Secondary Action Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Double Section: Recent Contact Submissions */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-slate-200">Critical Priority Inbox</h3>
                <p className="text-[11px] text-slate-500">Unread forms awaiting response channels.</p>
              </div>
              <Link 
                to="/admin/inbox" 
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group transition-colors"
              >
                Go to Inbox <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {recentMessages && recentMessages.length > 0 ? (
                recentMessages.map((msg) => (
                  <div 
                    key={msg._id}
                    className="p-4 rounded-xl bg-slate-950/50 hover:bg-slate-950/80 border border-slate-800/60 hover:border-slate-800 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-300 truncate group-hover:text-emerald-400 transition-colors">
                          {msg.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 truncate">{msg.email}</p>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700/40 truncate max-w-[200px]">
                        {msg.subject}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-500">No recent messages registered.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: System info & Active Resume status */}
        <div className="space-y-6 flex flex-col">
          {/* Active Resume Card */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-800/60">
                <FileText className="w-4 h-4 text-teal-400" /> Active Resume File
              </h3>
              {activeResume ? (
                <div className="space-y-2">
                  <p className="text-xs text-slate-400">Visitor download hook target:</p>
                  <div className="p-3 bg-slate-950 border border-slate-800/60 rounded-xl font-mono text-[11px] text-slate-300 truncate">
                    {activeResume.title}
                  </div>
                  <a 
                    href={activeResume.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 pt-1"
                  >
                    View Document File <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <p className="text-xs text-amber-400 font-medium">⚠️ No resume is marked active in the database.</p>
              )}
            </div>
          </div>

          {/* Recent Projects List Card */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800/60">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-200">Recent Projects Added</h3>
              </div>

              <div className="space-y-3">
                {recentProjects && recentProjects.length > 0 ? (
                  recentProjects.map((proj) => (
                    <div key={proj._id} className="flex items-start gap-3 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 font-semibold truncate">{proj.title}</p>
                        <p className="text-[10px] text-slate-500 capitalize">{proj.category} • {proj.status}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-xs text-slate-500">No projects listed.</div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;