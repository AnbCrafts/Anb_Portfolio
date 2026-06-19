import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FolderOpen, CloudUpload, Copy, Check, Trash2, FileText, Film, Image, Loader2 } from 'lucide-react';
import { fetchMedia, uploadMedia, deleteMedia } from '../Store/cmsStore';

const MediaLibraryCMS = () => {
  const dispatch = useDispatch();
  const { items: mediaItems, loading: isLoading, submitting: isSubmitting } = useSelector((state) => state.cms.media);

  const [copiedId, setCopiedId] = useState(null);

  // Fetch media items on mount
  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteAsset = (id, name) => {
    if (window.confirm(`Purge asset file "${name}" from Cloudinary distribution nodes?`)) {
      dispatch(deleteMedia(id));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadMedia(formData));
  };

  // Helper to resolve icon type graphic nodes
  const getMediaTypeIcon = (type) => {
    switch (type) {
      case 'video': return Film;
      case 'pdf': return FileText;
      default: return Image;
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Module View Header Panel Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-slate-400">
            <FolderOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Media Vault Library</h2>
        </div>

        {/* Dynamic Cloud Upload Trigger */}
        <label className={`flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 font-semibold text-xs tracking-wide rounded-xl cursor-pointer active:scale-95 transition-all self-start sm:self-auto ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              Uploading to Cloud...
            </>
          ) : (
            <>
              <CloudUpload className="w-4 h-4 text-emerald-400" />
              Upload New File
            </>
          )}
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileUpload} 
            disabled={isSubmitting}
          />
        </label>
      </div>

      {/* Loading state indicator */}
      {isLoading && mediaItems.length === 0 && (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider">Retrieving Media Vault Assets...</span>
        </div>
      )}

      {/* Cloud Asset Visual Grid Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mediaItems && mediaItems.length > 0 ? (
          mediaItems.map((item) => {
            const AssetIcon = getMediaTypeIcon(item.type);
            return (
              <div 
                key={item._id}
                className="bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/60 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Media Content Box Element Preview container */}
                <div className="p-3 bg-slate-950/40 border-b border-slate-800/60 relative aspect-video flex items-center justify-center overflow-hidden">
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-xl bg-slate-900 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-emerald-400 transition-colors">
                      <AssetIcon className="w-6 h-6" />
                    </div>
                  )}
                  <span className="absolute bottom-5 right-5 text-[10px] font-mono font-bold uppercase bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800/80 text-slate-400">
                    {item.type}
                  </span>
                </div>

                {/* Meta information context description layer */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-200 truncate select-all" title={item.name}>
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Vol: {item.size}</span>
                      <span>{item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : 'N/A'}</span>
                    </div>
                  </div>

                  {/* Direct Action Clip Triggers */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-800/40">
                    <button
                      onClick={() => handleCopyUrl(item.url, item._id)}
                      className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                        copiedId === item._id
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-800 hover:bg-slate-700/80 border border-transparent text-slate-300 active:scale-[0.98]'
                      }`}
                    >
                      {copiedId === item._id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Sync URL
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteAsset(item._id, item.name)}
                      className="p-1.5 bg-slate-950 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/20 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                      title="Purge Cloud Storage Node File"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          !isLoading && (
            <div className="col-span-full text-center py-12 text-xs text-slate-500 font-medium">No assets uploaded in media vault library.</div>
          )
        )}
      </div>

    </div>
  );
};

export default MediaLibraryCMS;