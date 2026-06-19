import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileText, CheckCircle2, RotateCcw, AlertTriangle, CloudUpload, Loader2 } from 'lucide-react';
import { resumeThunks } from '../Store/cmsStore';
import MediaSelector from '../Components/Shared/MediaSelector';

const ResumeCMS = () => {
  const dispatch = useDispatch();
  const { items: resumes, loading: isLoading } = useSelector((state) => state.cms.resumes);

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Fetch resumes on mount
  useEffect(() => {
    dispatch(resumeThunks.fetchAll());
  }, [dispatch]);

  // Toggle active node item constraint ensuring ONLY one schema entry remains active at any given moment
  const handleToggleActive = async (id) => {
    await dispatch(resumeThunks.update({ id, payload: { active: true } }));
    // Re-fetch to synchronize the local state with database, where pre-save hooks deactivate other resumes
    dispatch(resumeThunks.fetchAll());
  };

  const handleRegisterResume = async (e) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    const formattedTitle = newTitle.endsWith('.pdf') ? newTitle : `${newTitle}.pdf`;
    
    await dispatch(resumeThunks.create({
      title: formattedTitle,
      fileUrl: newUrl,
      active: false
    }));

    setNewTitle('');
    setNewUrl('');
  };

  const handleDelete = (id, active) => {
    if (active) {
      alert('Cannot delete an operational active document schema node. Promote another file stream first.');
      return;
    }
    if (window.confirm('Purge document reference from system cluster registry?')) {
      dispatch(resumeThunks.remove(id));
    }
  };

  const activeResume = resumes.find(r => r.active);

  if (isLoading && resumes.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <span className="text-xs font-semibold uppercase tracking-wider">Loading Resume Manifest...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      
      {/* Module Title Section */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2 text-slate-400">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-100">Resume & CV Management</h2>
      </div>

      {/* Critical Status Grid Block Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Double Segment Workspace Layout Card */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Document Reference Manifest</h3>
            
            <div className="space-y-3.5">
              {resumes && resumes.length > 0 ? (
                resumes.map((res) => (
                  <div 
                    key={res._id}
                    className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      res.active 
                        ? 'bg-emerald-500/5 border-emerald-500/30 shadow-md shadow-emerald-500/5' 
                        : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`p-2.5 rounded-lg shrink-0 border ${
                        res.active ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-300 truncate max-w-[280px] sm:max-w-md">
                          {res.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-mono">
                          Uploaded: {res.createdAt ? new Date(res.createdAt).toISOString().split('T')[0] : 'N/A'} • Path: {res.fileUrl}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(res._id)}
                        disabled={res.active}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          res.active 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 pointer-events-none' 
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 active:scale-95'
                        }`}
                      >
                        {res.active ? 'Active' : 'Promote Live'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleDelete(res._id, res.active)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Purge record"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-500 font-medium">No resumes registered in system database.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Action Block Panel Context */}
        <div className="space-y-6">
          {/* Active Status Audit Card */}
          <div className="p-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider uppercase pb-2 border-b border-slate-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Live Gateway State
            </div>
            
            {activeResume ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 leading-normal">
                  Public clients calling download bindings will fetch:
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 truncate">
                  {activeResume.title}
                </div>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  🟢 Live Resume Document Seeded
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300 font-medium leading-normal">
                  Warning: No system resource is actively promoted. Public endpoints will trigger a 404 error code.
                </p>
              </div>
            )}
          </div>

          {/* Quick Register Form Schema Node */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CloudUpload className="w-4 h-4 text-teal-400" />
              Register Document Node
            </h3>
            
            <form onSubmit={handleRegisterResume} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">File Manifest Alias</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. MERN_Developer_Resume"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

              <MediaSelector 
                label="Cloudinary File Link Target"
                value={newUrl}
                onChange={(url) => setNewUrl(url)}
                type="pdf"
                description="Upload the compiled document to Cloudinary and link it here."
              />

              <button
                type="submit"
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-bold tracking-wide rounded-xl active:scale-95 transition-all"
              >
                Register Schema Reference
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeCMS;