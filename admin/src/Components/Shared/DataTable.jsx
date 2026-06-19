import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';

const DataTable = ({ columns, data, onEdit, onDelete, onView, isLoading, emptyMessage = 'No records found.' }) => {
  if (isLoading) {
    return (
      <div className="w-full h-64 bg-slate-900/40 rounded-2xl border border-slate-800/80 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Fetching record stream...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[800px] text-left border-collapse">
          {/* Table Column Headers */}
          <thead>
            <br />
            <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-semibold text-slate-400 tracking-wider uppercase">
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-semibold">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              )}
            </tr>
          </thead>

          {/* Table Body Content Cells */}
          <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + ((onEdit || onDelete || onView) ? 1 : 0)} 
                  className="px-6 py-12 text-center text-xs text-slate-500 font-medium"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr 
                  key={row.id || row._id || rowIdx} 
                  className="hover:bg-slate-800/30 transition-colors duration-150 group"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap font-medium text-slate-300">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}

                  {/* Actions Column Controls */}
                  {(onEdit || onDelete || onView) && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onView && (
                          <button
                            onClick={() => onView(row)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 border border-transparent transition-all duration-150"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent transition-all duration-150"
                            title="Edit entry"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent transition-all duration-150"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;