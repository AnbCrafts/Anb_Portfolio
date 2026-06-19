import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Structural Global Left Panel Dock */}
      <AdminSidebar />

      {/* Main Orchestration Right Workspace Panel View */}
      <div className="pl-64 min-h-screen flex flex-col transition-all duration-200">
        {/* Fixed Structural Banner Frame */}
        <AdminHeader />

        {/* Dynamic Viewport View Injection Box */}
        <main className="flex-1 p-8 pt-24 bg-gradient-to-b from-slate-900/30 via-slate-950 to-slate-950 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full animate-[fadeIn_0.3s_ease-out]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;