import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Award, ExternalLink } from 'lucide-react';
import { certThunks } from '../Store/cmsStore';
import DataTable from '../Components/Shared/DataTable';
import FormModal from '../Components/Shared/FormModal';
import MediaSelector from '../Components/Shared/MediaSelector';

const CertificationsCMS = () => {
  const dispatch = useDispatch();
  const { items: certifications, loading: isLoading } = useSelector((state) => state.cms.certificates);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);

  // Initial Form Baseline State matching your MongoDB fields
  const initialFormState = {
    title: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
    certificateFile: '',
    thumbnail: '',
    verificationLink: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch certifications on mount
  useEffect(() => {
    dispatch(certThunks.fetchAll());
  }, [dispatch]);

  const columns = [
    { header: 'Issue Date', accessor: 'issueDate' },
    { header: 'Certification Title', accessor: 'title' },
    { header: 'Issuing Organization', accessor: 'issuer' },
    { 
      header: 'Credential ID', 
      accessor: 'credentialId',
      render: (row) => (
        <span className="font-mono text-xs text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/60">
          {row.credentialId || 'N/A'}
        </span>
      )
    },
    {
      header: 'Verify Link',
      accessor: 'verificationLink',
      render: (row) => row.verificationLink ? (
        <a 
          href={row.verificationLink} 
          target="_blank" 
          rel="noreferrer"
          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-xs"
        >
          Verify <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <span className="text-xs text-slate-600">None</span>
      )
    }
  ];

  const handleOpenAdd = () => {
    setEditingCert(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title || '',
      issuer: cert.issuer || '',
      issueDate: cert.issueDate || '',
      credentialId: cert.credentialId || '',
      certificateFile: cert.certificateFile || '',
      thumbnail: cert.thumbnail || '',
      verificationLink: cert.verificationLink || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (cert) => {
    if (window.confirm(`Are you sure you want to delete ${cert.title}?`)) {
      dispatch(certThunks.remove(cert._id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingCert) {
      dispatch(certThunks.update({ id: editingCert._id, payload: formData }));
    } else {
      dispatch(certThunks.create(formData));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* View Module Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-slate-400">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Certifications & Credentials</h2>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wide rounded-xl shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 active:scale-95 transition-all duration-150"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Add Certificate
        </button>
      </div>

      {/* Shared Data Table */}
      <DataTable 
        columns={columns} 
        data={certifications} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Pop-up Form Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCert ? `Modify Certificate: ${editingCert.title}` : 'Register New Academic Certificate'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-5 pb-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Certification Authority Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g. AWS Certified Cloud Practitioner"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Issuing Organization</label>
              <input 
                type="text" 
                required
                placeholder="e.g. NVIDIA, Ardent, Coursera"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Issue Date (YYYY-MM)</label>
              <input 
                type="text" 
                required
                placeholder="2026-04"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Credential ID (Serial Number)</label>
              <input 
                type="text" 
                placeholder="e.g. CERT-12345ABC"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Public Verification URL</label>
              <input 
                type="url" 
                placeholder="https://issuer.com/verify/id"
                value={formData.verificationLink}
                onChange={(e) => setFormData({ ...formData, verificationLink: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Connected Media Selector for PDFs */}
          <MediaSelector 
            label="Full Certificate Source Document" 
            value={formData.certificateFile}
            onChange={(url) => setFormData({ ...formData, certificateFile: url })}
            type="pdf"
            description="Upload the master verification PDF file to your media cloud library."
          />

          {/* Connected Media Selector for Image Thumbnails */}
          <MediaSelector 
            label="Visual Preview / Thumbnail Image" 
            value={formData.thumbnail}
            onChange={(url) => setFormData({ ...formData, thumbnail: url })}
            type="image"
            description="A cropped landscape preview block image for public presentation grids."
          />

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-bold tracking-wide rounded-xl transition-all"
            >
              Save Certificate Schema
            </button>
          </div>

        </form>
      </FormModal>
    </div>
  );
};

export default CertificationsCMS;