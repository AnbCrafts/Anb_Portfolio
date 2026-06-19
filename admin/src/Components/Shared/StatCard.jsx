import React from 'react';

const StatCard = ({ title, value, icon: IconComponent, change, changeType, description }) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-slate-700/60 hover:translate-y-[-2px] group">
      <div className="flex items-center justify-between gap-4">
        {/* Metric Labeling Context */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-slate-100 tracking-tight transition-colors group-hover:text-emerald-400">
            {value}
          </h3>
        </div>

        {/* Dynamic Graphic Icon Node */}
        {IconComponent && (
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/40 text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300">
            <IconComponent className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Auxiliary Trend Validation Section */}
      {(change || description) && (
        <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs">
          {change && (
            <span className={`font-semibold px-1.5 py-0.5 rounded ${
              changeType === 'positive' 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : changeType === 'negative' 
                ? 'bg-rose-500/10 text-rose-400' 
                : 'bg-slate-800 text-slate-400'
            }`}>
              {change}
            </span>
          )}
          {description && (
            <span className="text-slate-500 truncate">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;