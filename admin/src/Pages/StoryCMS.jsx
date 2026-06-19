import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, BookOpen } from 'lucide-react';
import { storyThunks } from '../Store/cmsStore';
import DataTable from '../Components/Shared/DataTable';
import FormModal from '../Components/Shared/FormModal';
import MediaSelector from '../Components/Shared/MediaSelector';

const StoryCMS = () => {
  const dispatch = useDispatch();
  const { items: stories, loading: isLoading } = useSelector((state) => state.cms.stories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);

  // Initial Form Baseline State matching your strict Mongo fields
  const initialFormState = {
    title: '',
    slug: '',
    summary: '',
    coverImage: '',
    content: '',
    tags: '',
    category: 'hackathon',
    publishStatus: 'published'
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch stories on mount
  useEffect(() => {
    dispatch(storyThunks.fetchAll());
  }, [dispatch]);

  // Table Column Definitions
  const columns = [
    { 
      header: 'Date Created', 
      accessor: 'createdAt',
      render: (row) => (
        <span className="font-mono text-xs text-slate-400">
          {row.createdAt ? new Date(row.createdAt).toISOString().split('T')[0] : 'N/A'}
        </span>
      )
    },
    { header: 'Story Title', accessor: 'title' },
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
      header: 'Status',
      accessor: 'publishStatus',
      render: (row) => (
        <span className={`text-[11px] font-bold uppercase tracking-wider ${row.publishStatus === 'published' ? 'text-emerald-400' : 'text-slate-500'}`}>
          ● {row.publishStatus}
        </span>
      )
    }
  ];

  const handleOpenAdd = () => {
    setEditingStory(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (story) => {
    setEditingStory(story);
    setFormData({
      title: story.title || '',
      slug: story.slug || '',
      summary: story.summary || '',
      coverImage: story.coverImage || '',
      content: story.content || '',
      tags: story.tags || '',
      category: story.category || 'hackathon',
      publishStatus: story.publishStatus || 'published'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (story) => {
    if (window.confirm(`Are you sure you want to delete "${story.title}"?`)) {
      dispatch(storyThunks.remove(story._id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingStory) {
      dispatch(storyThunks.update({ id: editingStory._id, payload: formData }));
    } else {
      dispatch(storyThunks.create(formData));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* View Module Header Panel Context */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-slate-400">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Story & Blog Management</h2>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wide rounded-xl shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 active:scale-95 transition-all duration-150"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Create Story
        </button>
      </div>

      {/* Shared Presentation Data Grid Component */}
      <DataTable 
        columns={columns} 
        data={stories} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Central Creation Overlay Wrapper */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStory ? `Modify Narrative: ${editingStory.title}` : 'Initialize Dynamic Story Schema'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-5 pb-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Story Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Slug URL Handle</label>
              <input 
                type="text" 
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Classification Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-400 focus:outline-none focus:border-emerald-500/50 transition-all"
              >
                <option value="hackathon">Hackathon Journey</option>
                <option value="training">Technical Training</option>
                <option value="certification">Certification Milestone</option>
                <option value="personal">Personal Achievement</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Publishing State Status</label>
              <select 
                value={formData.publishStatus}
                onChange={(e) => setFormData({ ...formData, publishStatus: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-400 focus:outline-none focus:border-emerald-500/50 transition-all"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Tags / Metadata (Comma Separated)</label>
            <input 
              type="text" 
              placeholder="e.g. MERN, Web Security, Ardent"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Abstract Summary</label>
            <input 
              type="text" 
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Narrative Content Body (Markdown Compatible Prose)</label>
            <textarea 
              rows={6}
              placeholder="Write the full experience breakdown here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-sans focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
            />
          </div>

          {/* Core Visual Header Attachment Layout Node */}
          <MediaSelector 
            label="Story Landscape Banner / Cover Image" 
            value={formData.coverImage}
            onChange={(url) => setFormData({ ...formData, coverImage: url })}
            type="image"
          />

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-bold tracking-wide rounded-xl transition-all"
            >
              Save Narrative Record
            </button>
          </div>

        </form>
      </FormModal>
    </div>
  );
};

export default StoryCMS;