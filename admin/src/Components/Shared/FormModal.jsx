import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const FormModal = ({ isOpen, onClose, title, children }) => {
  // Lock document body background scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop Dimmer Layout Element */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Surface Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative z-10 animate-[scaleUp_0.2s_ease-out]">
        
        {/* Modal Window Header Layout */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950/20">
          <h3 className="text-sm font-semibold text-slate-200 tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent transition-all duration-150"
            title="Close interface"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      {/* Scrollable Form Workspace Injection Node */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-none space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormModal;