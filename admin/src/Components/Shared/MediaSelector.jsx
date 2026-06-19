import React, { useState } from 'react';
import { Image, Link, FileText, Film, Eye } from 'lucide-react';

const MediaSelector = ({ label, value, onChange, type = 'image', description }) => {
  const [showPicker, setShowPicker] = useState(false);

  // Helper to determine graphic icon variant based on expected asset type mapping
  const getIcon = () => {
    switch (type) {
      case 'video': return Film;
      case 'pdf': return FileText;
      default: return Image;
    }
  };

  const IconComponent = getIcon();

  // Mock function to simulate selecting a Cloudinary asset path url
  const handleSelectMockAsset = (url) => {
    onChange(url);
    setShowPicker(false);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-slate-300 tracking-wide uppercase">
          {label}
        </label>
      )}

      {/* Main Asset URL Input Group */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <IconComponent className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={`Select or paste ${type} URL...`}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
          />
        </div>

        {/* Media Selector Launch Button */}
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 transition-all flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
        >
          <Link className="w-3.5 h-3.5" />
          Choose Asset
        </button>
      </div>

      {/* Auxiliary Description Text */}
      {description && !value && (
        <p className="text-[11px] text-slate-500">{description}</p>
      )}

      {/* Real-time Dynamic Media Preview Box */}
      {value && (
        <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center gap-3 min-w-0">
            {type === 'image' ? (
              <img 
                src={value} 
                alt="Selected asset target preview" 
                className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                <IconComponent className="w-4 h-4" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-400 truncate max-w-[280px]">
                {value}
              </p>
              <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">{type} Connected</p>
            </div>
          </div>
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            title="Open live link"
          >
            <Eye className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Dropdown Media Selector Simulation Mock Grid */}
      {showPicker && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow-inner animate-[scaleUp_0.15s_ease-out]">
          <div className="flex justify-between items-center">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Link Cloudinary Sample</h4>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-medium">Library Sandbox</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSelectMockAsset('https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500')}
              className="p-2 bg-slate-950 hover:bg-slate-950/40 border border-slate-800 hover:border-slate-700 rounded-lg text-left text-xs text-slate-400 truncate transition-all"
            >
              📷 sample_project_thumbnail.png
            </button>
            <button
              type="button"
              onClick={() => handleSelectMockAsset('https://www.w3schools.com/html/mov_bbb.mp4')}
              className="p-2 bg-slate-950 hover:bg-slate-950/40 border border-slate-800 hover:border-slate-700 rounded-lg text-left text-xs text-slate-400 truncate transition-all"
            >
              🎥 codesage_demo.mp4
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSelector;