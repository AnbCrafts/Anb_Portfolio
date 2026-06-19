import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Briefcase, Calendar } from 'lucide-react';
import { experienceThunks } from '../Store/cmsStore';
import DataTable from '../Components/Shared/DataTable';
import FormModal from '../Components/Shared/FormModal';
import MediaSelector from '../Components/Shared/MediaSelector';

const ExperienceCMS = () => {
  const dispatch = useDispatch();
  const { items: experiences, loading: isLoading } = useSelector((state) => state.cms.experience);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  // Form Initial Framework mapping directly to MongoDB Schema
  const initialFormState = {
    title: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: '',
    certificateUrl: '',
    featured: false
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch experiences on mount
  useEffect(() => {
    dispatch(experienceThunks.fetchAll());
  }, [dispatch]);

  const columns = [
    { 
      header: 'Timeline Window', 
      accessor: 'startDate',
      render: (row) => (
        <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
          <Calendar className="w-3 h-3 text-emerald-400" />
          {row.startDate} — {row.endDate || 'Present'}
        </span>
      )
    },
    { header: 'Role Title', accessor: 'title' },
    { header: 'Organization', accessor: 'organization' },
    { header: 'Location Context', accessor: 'location' },
    {
      header: 'Promoted',
      accessor: 'featured',
      render: (row) => row.featured ? (
        <span className="text-[10px] text-emerald-400 font-bold tracking-wider uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Featured</span>
      ) : (
        <span className="text-xs text-slate-600">Standard</span>
      )
    }
  ];

  const handleOpenAdd = () => {
    setEditingExperience(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingExperience(exp);
    setFormData({
      title: exp.title || '',
      organization: exp.organization || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      description: exp.description || '',
      technologies: exp.technologies || '',
      certificateUrl: exp.certificateUrl || '',
      featured: exp.featured || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = (exp) => {
    if (window.confirm(`Remove structural timeline milestone: ${exp.title}?`)) {
      dispatch(experienceThunks.remove(exp._id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingExperience) {
      dispatch(experienceThunks.update({ id: editingExperience._id, payload: formData }));
    } else {
      dispatch(experienceThunks.create(formData));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Structural Header Context Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-slate-400">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Experience Timelines</h2>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wide rounded-xl shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 active:scale-95 transition-all duration-150"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Add Timeline Event
        </button>
      </div>

      {/* Primary Shared Grid Component */}
      <DataTable 
        columns={columns} 
        data={experiences} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Central Creation/Modification Form Overlay */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExperience ? `Modify Position: ${editingExperience.title}` : 'Initialize Dynamic Experience Record'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-5 pb-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Role Designation Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Organization / Firm Entity Name</label>
              <input 
                type="text" 
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Start Window (YYYY-MM)</label>
              <input 
                type="text" 
                required
                placeholder="2025-06"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">End Window (or 'Present')</label>
              <input 
                type="text" 
                required
                placeholder="2025-09"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Location Scope</label>
              <input 
                type="text" 
                placeholder="e.g. Remote / Kolkata"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Core Technologies Deployed</label>
            <input 
              type="text" 
              placeholder="React, Express, AWS, etc."
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Functional Duties Description Breakdown</label>
            <textarea 
              rows={4}
              placeholder="Detail your operational responsibilities and key deliverables..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-sans focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
            />
          </div>

          {/* Secure Credential Verification PDF Hook */}
          <MediaSelector 
            label="Verification Document / Completion Certificate URL" 
            value={formData.certificateUrl}
            onChange={(url) => setFormData({ ...formData, certificateUrl: url })}
            type="pdf"
          />

          <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800/60 rounded-xl">
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-slate-200">Featured Placement</h4>
              <p className="text-[10px] text-slate-500">Highlight this role prominently at the top of your public resume timelines.</p>
            </div>
            <input 
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded border-slate-800 text-emerald-500 focus:ring-emerald-500/30 bg-slate-950"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-bold tracking-wide rounded-xl transition-all"
            >
              Save Timeline Record
            </button>
          </div>

        </form>
      </FormModal>
    </div>
  );
};

export default ExperienceCMS;