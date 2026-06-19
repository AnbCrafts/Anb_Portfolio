import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Settings, Save, Globe, MessageSquare, ShieldCheck, Loader2 } from 'lucide-react';
import { fetchSettings, updateSettings } from '../Store/cmsStore';

const SiteSettingsCMS = () => {
  const dispatch = useDispatch();
  const { data: settings, loading: isLoading, submitting: isSaving } = useSelector((state) => state.cms.settings);

  // Local state synced with database schema fields
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    twitter: '',
    location: '',
    heroTitle: '',
    heroDescription: ''
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch settings on mount
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Sync database values with form input state
  useEffect(() => {
    if (settings) {
      setFormData({
        fullName: settings.fullName || '',
        designation: settings.designation || '',
        email: settings.email || '',
        phone: settings.phone || '',
        github: settings.github || '',
        linkedin: settings.linkedin || '',
        twitter: settings.twitter || '',
        location: settings.location || '',
        heroTitle: settings.heroTitle || '',
        heroDescription: settings.heroDescription || ''
      });
    }
  }, [settings]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaveSuccess(false);

    const resultAction = await dispatch(updateSettings(formData));
    if (updateSettings.fulfilled.match(resultAction)) {
      setSaveSuccess(true);
      // Auto-clear success notification banner
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  if (isLoading && !settings) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <span className="text-xs font-semibold uppercase tracking-wider">Loading Site Settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      
      {/* Module Title Panel */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2 text-slate-400">
          <Settings className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-100">Global Site Settings</h2>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Double Section: Operational Variable Input Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 pb-3 border-b border-slate-800/60">
              <Globe className="w-4 h-4 text-teal-400" /> Identity Profile Data
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Full Public Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Professional Designation</label>
                <input 
                  type="text" 
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Primary Inbound Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Contact Phone Coordinate</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Operational Base Location</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 pt-4 pb-3 border-b border-slate-800/60">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Public Hero Presentation Text Blocks
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Hero Showcase Headline Title</label>
              <input 
                type="text" 
                required
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Hero Summary Profile Copy</label>
              <textarea 
                rows={3}
                required
                value={formData.heroDescription}
                onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Section: Core Social URIs & Submission Core Gate */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800/60">
              Social Gateway URIs
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">GitHub Profile URL</label>
                <input 
                  type="url" 
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 font-mono transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">LinkedIn Profile URL</label>
                <input 
                  type="url" 
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 font-mono transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Twitter / X URL</label>
                <input 
                  type="url" 
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 font-mono transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Trigger Save Controls */}
          <div className="p-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl space-y-4">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/15 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 stroke-[2.5]" /> Commit Global Changes
                </>
              )}
            </button>

            {saveSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Database variables successfully updated across live production environments!
              </div>
            )}
          </div>
        </div>

      </form>
    </div>
  );
};

export default SiteSettingsCMS;