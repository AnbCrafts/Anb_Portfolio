import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, Sparkles, Clock } from 'lucide-react';
import DataTable from '../Components/Shared/DataTable';
import FormModal from '../Components/Shared/FormModal';
import MediaSelector from '../Components/Shared/MediaSelector';

const BlogCMS = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const initialFormState = {
    title: '',
    slug: '',
    category: 'C#',
    readTime: '4 min read',
    summary: '',
    content: '',
    learnedText: '',
    builtText: '',
    challengesText: '',
    coverImage: '',
    published: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/blogs?includeDrafts=true');
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setBlogs(data.data);
        }
      }
    } catch (err) {
      console.log('Error fetching blogs in CMS:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
    { header: 'Blog Title', accessor: 'title' },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded uppercase bg-teal-950 text-teal-300 border border-teal-800">
          {row.category || 'General'}
        </span>
      )
    },
    {
      header: 'Read Time',
      accessor: 'readTime',
      render: (row) => (
        <span className="text-xs text-slate-400">
          {row.readTime || '3 min read'}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'published',
      render: (row) => (
        <span className={`text-[11px] font-bold uppercase tracking-wider ${row.published !== false ? 'text-emerald-400' : 'text-amber-400'}`}>
          ● {row.published !== false ? 'Published' : 'Draft'}
        </span>
      )
    }
  ];

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      category: blog.category || 'C#',
      readTime: blog.readTime || '4 min read',
      summary: blog.summary || '',
      content: blog.content || '',
      learnedText: Array.isArray(blog.learned) ? blog.learned.join('\n') : '',
      builtText: Array.isArray(blog.built) ? blog.built.join('\n') : '',
      challengesText: Array.isArray(blog.challenges) ? blog.challenges.join('\n') : '',
      coverImage: blog.coverImage || '',
      published: blog.published !== false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to delete blog "${blog.title}"?`)) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/blogs/${blog._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          fetchBlogs();
        }
      } catch (err) {
        console.error('Failed to delete blog:', err);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      title: formData.title,
      slug: formData.slug,
      category: formData.category,
      readTime: formData.readTime,
      summary: formData.summary,
      content: formData.content,
      coverImage: formData.coverImage,
      published: formData.published,
      learned: formData.learnedText.split('\n').filter(Boolean),
      built: formData.builtText.split('\n').filter(Boolean),
      challenges: formData.challengesText.split('\n').filter(Boolean)
    };

    try {
      const url = editingBlog 
        ? `http://localhost:5000/api/blogs/${editingBlog._id}`
        : 'http://localhost:5000/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchBlogs();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error saving blog:', err);
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-slate-400">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Engineering Blog & Devlog CMS</h2>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-xs tracking-wide rounded-xl shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 active:scale-95 transition-all duration-150"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Create Blog Entry
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={blogs} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBlog ? `Edit Blog: ${editingBlog.title}` : 'Create New Technical Blog Post'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 pb-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Building Microservices with C# & .NET 8"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Slug URL Handle</label>
              <input 
                type="text" 
                placeholder="auto-generated-if-empty"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Category Tag</label>
              <input 
                type="text" 
                placeholder="C#, MERN, Daily Log, Architecture"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Read Time</label>
              <input 
                type="text" 
                placeholder="4 min read"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Visibility</label>
              <select 
                value={formData.published ? 'published' : 'draft'}
                onChange={(e) => setFormData({ ...formData, published: e.target.value === 'published' })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-teal-500 transition-all"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Short Excerpt / Summary</label>
            <input 
              type="text" 
              required
              placeholder="Brief 1-2 sentence overview of the article..."
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-teal-400 tracking-wide uppercase">What I Learned (1 per line)</label>
              <textarea 
                rows={4}
                placeholder="Mastered async/await in C#&#10;EF Core performance tuning"
                value={formData.learnedText}
                onChange={(e) => setFormData({ ...formData, learnedText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">What I Built (1 per line)</label>
              <textarea 
                rows={4}
                placeholder="Built JWT Auth endpoint&#10;Created exception middleware"
                value={formData.builtText}
                onChange={(e) => setFormData({ ...formData, builtText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-amber-400 tracking-wide uppercase">Challenges & Fixes (1 per line)</label>
              <textarea 
                rows={4}
                placeholder="EF Core circular references fix"
                value={formData.challengesText}
                onChange={(e) => setFormData({ ...formData, challengesText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Main Article Body (Full Content)</label>
            <textarea 
              rows={5}
              placeholder="Write the detailed article body, code snippets, or notes here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-teal-500 transition-all resize-none"
            />
          </div>

          <MediaSelector 
            label="Blog Banner / Cover Image URL" 
            value={formData.coverImage}
            onChange={(url) => setFormData({ ...formData, coverImage: url })}
            type="image"
          />

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold tracking-wide rounded-xl transition-all"
            >
              Save Blog Post
            </button>
          </div>

        </form>
      </FormModal>
    </div>
  );
};

export default BlogCMS;
