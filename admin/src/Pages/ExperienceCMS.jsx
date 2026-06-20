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

  // Baseline state structure mirroring your MongoDB Schema
  const initialFormState = {
    title: '',
    company: '',
    location: '',
    year: '',
    desc: '',
    type: 'work',
    skills: '',
    certificate: '',
    displayOrder: 0
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch all experiences on mount
  useEffect(() => {
    dispatch(experienceThunks.fetchAll());
  }, [dispatch]);

  const columns = [
    { header: 'Order', accessor: 'displayOrder' },
    { 
      header: 'Timeline Window', 
      accessor: 'year',
      render: (row) => (
        <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
          <Calendar className="w-3 h-3 text-emerald-400" />
          {row.year}
        </span>
      )
    },
    { header: 'Role Title', accessor: 'title' },
    { header: 'Company', accessor: 'company' },
    { header: 'Location Context', accessor: 'location' },
    {
      header: 'Type',
      accessor: 'type',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80 uppercase">
          {row.type}
        </span>
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
      company: exp.company || '',
      location: exp.location || '',
      year: exp.year || '',
      desc: exp.desc || '',
      type: exp.type || 'work',
      skills: Array.isArray(exp.skills) ? exp.skills.join(', ') : '',
      certificate: exp.certificate || '',
      displayOrder: exp.displayOrder || 0
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
    const payload = {
      ...formData,
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
      displayOrder: Number(formData.displayOrder) || 0
    };
    if (editingExperience) {
      dispatch(experienceThunks.update({ id: editingExperience._id, payload }));
    } else {
      dispatch(experienceThunks.create(payload));
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
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Company / Issuer Name</label>
              <input 
                type="text" 
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Timeframe Range (e.g. '2025 - Present')</label>
              <input 
                type="text" 
                required
                placeholder="e.g. 2025 - Present"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Location Context</label>
              <input 
                type="text" 
                placeholder="e.g. Remote / Kolkata"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Timeline Event Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              >
                <option value="work">Work Experience</option>
                <option value="education">Education / Degree</option>
                <option value="achievement">Achievement / Award</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Core Technologies / Skills (Comma-separated)</label>
              <input 
                type="text" 
                placeholder="React, Express, AWS, etc."
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Display Order (Integer)</label>
              <input 
                type="number" 
                min="0"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Description Breakdown</label>
            <textarea 
              rows={4}
              placeholder="Detail your operational responsibilities and key deliverables..."
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-sans focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
            />
          </div>

          {/* Secure Credential Verification PDF Hook */}
          <MediaSelector 
            label="Verification Document / Completion Certificate URL" 
            value={formData.certificate}
            onChange={(url) => setFormData({ ...formData, certificate: url })}
            type="pdf"
          />

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