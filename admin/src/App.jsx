import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layouts and Protection
import ProtectedRoute from './Components/ProtectedRoute'
import AdminLayout from './Components/AdminLayout'

// CMS Page Components
import AdminLogin from './Pages/AdminLogin'
import DashboardHome from './Pages/DashboardHome'
import ProjectCMS from './Pages/ProjectCMS'
import StoryCMS from './Pages/StoryCMS'
import ExperienceCMS from './Pages/ExperienceCMS'
import SkillsCMS from './Pages/SkillsCMS'
import CertificationsCMS from './Pages/CertificationsCMS'
import ResumeCMS from './Pages/ResumeCMS'
import InboxCMS from './Pages/InboxCMS'
import MediaLibraryCMS from './Pages/MediaLibraryCMS'
import SiteSettingsCMS from './Pages/SiteSettingsCMS'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Workspace Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="projects" element={<ProjectCMS />} />
            <Route path="stories" element={<StoryCMS />} />
            <Route path="experience" element={<ExperienceCMS />} />
            <Route path="skills" element={<SkillsCMS />} />
            <Route path="certifications" element={<CertificationsCMS />} />
            <Route path="resume" element={<ResumeCMS />} />
            <Route path="inbox" element={<InboxCMS />} />
            <Route path="media" element={<MediaLibraryCMS />} />
            <Route path="settings" element={<SiteSettingsCMS />} />
          </Route>
        </Route>

        {/* Fallbacks */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
