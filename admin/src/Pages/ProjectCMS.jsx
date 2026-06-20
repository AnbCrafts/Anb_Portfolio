import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, FolderOpen, ToggleLeft, ToggleRight } from 'lucide-react';
import { projectThunks } from '../Store/cmsStore';
import DataTable from '../Components/Shared/DataTable';
import FormModal from '../Components/Shared/FormModal';
import MediaSelector from '../Components/Shared/MediaSelector';

const ProjectCMS = () => {
  const dispatch = useDispatch();
  const { items: projects, loading: isLoading } = useSelector((state) => state.cms.projects);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  // Initial Form Baseline State matching your strict Mongo fields
  const initialFormState = {
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    category: 'frontend',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    thumbnail: '',
    demoVideo: '',
    featured: false,
    displayOrder: 1,
    status: 'published'
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch projects on mount
  useEffect(() => {
    dispatch(projectThunks.fetchAll());
  }, [dispatch]);

  // Table Column Definitions passing custom node blocks for status displays
  const columns = [
    { header: 'Display Order', accessor: 'displayOrder' },
    { header: 'Project Title', accessor: 'title' },
    { 
      header: 'Category', 
      accessor: 'category',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded uppercase bg-slate-950 text-slate-400 border border-slate-800">
          {row.category}
        </span>
      )
    },
    { 
      header: 'Tech Stack', 
      accessor: 'techStack',
      render: (row) => Array.isArray(row.techStack) ? row.techStack.join(', ') : ''
    },
    {
      header: 'Featured',
      accessor: 'featured',
      render: (row) => row.featured ? (
        <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Yes</span>
      ) : (
        <span className="text-xs text-slate-500 font-medium">No</span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`text-[11px] font-bold uppercase tracking-wider ${row.status === 'active' ? 'text-teal-400' : 'text-amber-500'}`}>
          ● {row.status === 'active' ? 'published' : 'draft'}
        </span>
      )
    }
  ];

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      shortDescription: project.description || '',
      fullDescription: project.description || '',
      category: project.category || 'frontend',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      thumbnail: project.thumbnail || '',
      demoVideo: project.demoVideo || '',
      featured: project.featured || false,
      displayOrder: project.displayOrder || 1,
      status: project.status === 'active' ? 'published' : 'draft'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (project) => {
    if (window.confirm(`Are you sure you want to delete ${project.title}?`)) {
      dispatch(projectThunks.remove(project._id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      slug: formData.slug,
      description: formData.fullDescription || formData.shortDescription || '',
      category: formData.category,
      techStack: formData.techStack ? formData.techStack.split(',').map(s => s.trim()).filter(Boolean) : [],
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      thumbnail: formData.thumbnail,
      demoVideo: formData.demoVideo,
      featured: formData.featured,
      displayOrder: Number(formData.displayOrder) || 0,
      status: formData.status === 'published' ? 'active' : 'draft'
    };
    if (editingProject) {
      dispatch(projectThunks.update({ id: editingProject._id, payload }));
    } else {
      dispatch(projectThunks.create(payload));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* View Module Header Panel Context */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-slate-400">
            <FolderOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Project Management</h2>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wide rounded-xl shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 active:scale-95 transition-all duration-150"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Create Project
        </button>
      </div>

      {/* Shared Presentation Data Grid Component */}
      <DataTable 
        columns={columns} 
        data={projects} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Central Creation Overlay Wrapper */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? `Modify Project: ${editingProject.title}` : 'Initialize Dynamic Project Schema'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-5 pb-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Project Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Slug URI Target</label>
              <input 
                type="text" 
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Category Block</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-400 focus:outline-none focus:border-emerald-500/50 transition-all"
              >
                <option value="frontend">Frontend</option>
                <option value="fullstack">Fullstack</option>
                <option value="ai">Artificial Intelligence</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Display Order Index</label>
              <input 
                type="number" 
                required
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Publishing State</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-400 focus:outline-none focus:border-emerald-500/50 transition-all"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Tech Stack Strings (Comma Separated)</label>
            <input 
              type="text" 
              placeholder="e.g. React, Tailwind v4, Zustand"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Short Catchphrase Description</label>
            <input 
              type="text" 
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Comprehensive Details (Supports Prose)</label>
            <textarea 
              rows={3}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Repository Address (GitHub)</label>
              <input 
                type="url" 
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Deployment Link (Live App)</label>
              <input 
                type="url" 
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Connected Functional Asset Attachment Nodes */}
          <MediaSelector 
            label="Project Cover Image Card" 
            value={formData.thumbnail}
            onChange={(url) => setFormData({ ...formData, thumbnail: url })}
            type="image"
          />

          <MediaSelector 
            label="Demo Presentation Video (Autoplay Container Target)" 
            value={formData.demoVideo}
            onChange={(url) => setFormData({ ...formData, demoVideo: url })}
            type="video"
          />

          {/* Toggle Block for Showcasing Flagship Status */}
          <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800/60 rounded-xl">
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-slate-200">Flagship Promotion Target</h4>
              <p className="text-[10px] text-slate-500">Inject into the top carousel showcase panel blocks.</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, featured: !formData.featured })}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              {formData.featured ? (
                <ToggleRight className="w-8 h-8 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-700" />
              )}
            </button>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-bold tracking-wide rounded-xl transition-all"
            >
              Save Schema Record
            </button>
          </div>

        </form>
      </FormModal>
    </div>
  );
};

export default ProjectCMS;