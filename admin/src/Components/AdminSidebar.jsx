import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  Award, 
  Cpu, 
  FileText, 
  Mail, 
  Settings, 
  FolderOpen 
} from 'lucide-react';

const AdminSidebar = () => {
  // Navigation items mapping to your 10 required admin modules
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderOpen },
    { name: 'Stories', path: '/admin/stories', icon: BookOpen },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Skills', path: '/admin/skills', icon: Cpu },
    { name: 'Certifications', path: '/admin/certifications', icon: Award },
    { name: 'Resume', path: '/admin/resume', icon: FileText },
    { name: 'Inbox Messages', path: '/admin/inbox', icon: Mail },
    { name: 'Media Library', path: '/admin/media', icon: FolderOpen },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-30">
      {/* CMS Branding Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-100 tracking-wide text-lg">
            Portfolio<span className="text-emerald-400 font-medium text-xs ml-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">CMS</span>
          </span>
        </div>
      </div>

      {/* Nav Scroll Area */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scrollbar-none">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                ${isActive 
                  ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/5 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/5' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <IconComponent 
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 
                      ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}
                    `} 
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Info / Profile Context Area Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/20">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-sm">
            AG
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">Anubhaw Gupta</p>
            <p className="text-xs text-slate-500 truncate">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;