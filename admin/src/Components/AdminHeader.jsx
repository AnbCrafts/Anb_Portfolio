import React from 'react';
import { LogOut, Bell, ShieldCheck, Globe } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../Store/adminAuthStore';
import { useLocation, Link } from 'react-router-dom';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutAdmin());
  };

  // Helper to generate a contextual clean page title from path slugs
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    if (!path || path === 'dashboard' || path === 'admin') return 'Dashboard Overview';
    return path.charAt(0).toUpperCase() + path.slice(1) + ' Management';
  };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-20 transition-all duration-200">
      {/* Contextual Title Segment */}
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold text-slate-200 tracking-tight">
          {getPageTitle()}
        </h1>
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700/60">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Secure Sync</span>
        </div>
      </div>

      {/* Action Controls & Profile Interface */}
      <div className="flex items-center gap-4">
        {/* View Live Public Portfolio Site Shortcut */}
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-emerald-400 hover:bg-slate-800/40 border border-transparent hover:border-slate-800 transition-all duration-200"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden md:inline">View Portfolio</span>
        </Link>

        {/* Mock Activity Notifications Center */}
        <button className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 relative group transition-colors duration-200">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full ring-2 ring-slate-900 group-hover:scale-110 transition-transform" />
        </button>

        <div className="h-4 w-px bg-slate-800" />

        {/* Global Explicit Logout Control Trigger */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 active:scale-95 transition-all duration-200"
          title="Sign out of Admin Session"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;