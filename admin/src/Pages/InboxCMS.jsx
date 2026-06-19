import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Inbox, CheckSquare, Archive, Reply, Trash2, Loader2 } from 'lucide-react';
import { fetchContacts, updateContactStatus, deleteContact } from '../Store/cmsStore';
import DataTable from '../Components/Shared/DataTable';
import FormModal from '../Components/Shared/FormModal';

const InboxCMS = () => {
  const dispatch = useDispatch();
  const { items: messages, loading: isLoading } = useSelector((state) => state.cms.contacts);

  const [activeTab, setActiveTab] = useState('unread');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch contacts on mount
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Filter messages based on status matching the selected operational tab
  const filteredMessages = messages.filter(msg => msg.status === activeTab);

  const columns = [
    { 
      header: 'Date Received', 
      accessor: 'createdAt',
      render: (row) => (
        <span className="font-mono text-xs text-slate-400">
          {row.createdAt ? new Date(row.createdAt).toISOString().split('T')[0] : 'N/A'}
        </span>
      )
    },
    { header: 'Sender Name', accessor: 'name' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'Subject Line', accessor: 'subject' },
  ];

  const handleViewMessage = (msg) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);
    
    // Auto-update message status from 'unread' to 'read' upon explicit viewing selection
    if (msg.status === 'unread') {
      dispatch(updateContactStatus({ id: msg._id, status: 'read' }));
    }
  };

  // Keep selected message in sync if it gets updated
  const activeSelectedMessage = selectedMessage 
    ? messages.find(m => m._id === selectedMessage._id) || selectedMessage 
    : null;

  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateContactStatus({ id, status: newStatus }));
    setIsModalOpen(false);
  };

  const handleDeletePermanently = (id) => {
    if (window.confirm('Permanently purge message record from cluster database?')) {
      dispatch(deleteContact(id));
      setIsModalOpen(false);
    }
  };

  // Tabs layout navigation definitions
  const tabs = [
    { id: 'unread', name: 'Unread Box', icon: Inbox },
    { id: 'read', name: 'Reviewed', icon: CheckSquare },
    { id: 'replied', name: 'Replied', icon: Reply },
    { id: 'archived', name: 'Archived', icon: Archive }
  ];

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* View Module Header */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2 text-slate-400">
          <Mail className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-100">Inbound Form Messages</h2>
      </div>

      {/* Segmented Filter Control Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-px">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const count = messages.filter(m => m.status === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-semibold tracking-wide transition-all duration-150 ${
                activeTab === tab.id
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-500/[0.02]'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              {tab.name}
              <span className={`ml-1 px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full ${
                activeTab === tab.id ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid Display Interface */}
      <DataTable 
        columns={columns} 
        data={filteredMessages} 
        onView={handleViewMessage}
        isLoading={isLoading}
        emptyMessage={`No messages logged under ${activeTab} category.`}
      />

      {/* Granular Detail Review Overlay */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={activeSelectedMessage ? `Review Transmission: ${activeSelectedMessage.subject}` : ''}
      >
        {activeSelectedMessage && (
          <div className="space-y-6 pb-2 text-sm text-slate-300">
            {/* Metadata Header Block */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>Received: {activeSelectedMessage.createdAt ? new Date(activeSelectedMessage.createdAt).toISOString().split('T')[0] : 'N/A'}</span>
                <span className="uppercase text-emerald-400 font-bold tracking-wider">● Current Status: {activeSelectedMessage.status}</span>
              </div>
              <h4 className="font-bold text-slate-200 text-base">{activeSelectedMessage.name}</h4>
              <p className="text-xs text-slate-400 font-mono">Routing Address: <span className="text-slate-300 select-all">{activeSelectedMessage.email}</span></p>
            </div>

            {/* Content Body Block */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 tracking-wide uppercase">Transmission Message Payload</label>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-sans text-slate-300 leading-relaxed whitespace-pre-wrap select-text selection:bg-emerald-500/20">
                {activeSelectedMessage.message}
              </div>
            </div>

            {/* Workflow Pipeline Action Routing Trigger Controls */}
            <div className="pt-4 border-t border-slate-800/60 flex flex-wrap gap-2.5 items-center justify-between">
              <div className="flex gap-2">
                {activeSelectedMessage.status !== 'replied' && (
                  <button
                    onClick={() => handleUpdateStatus(activeSelectedMessage._id, 'replied')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Reply className="w-3.5 h-3.5" /> Mark Replied
                  </button>
                )}
                {activeSelectedMessage.status !== 'archived' && (
                  <button
                    onClick={() => handleUpdateStatus(activeSelectedMessage._id, 'archived')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Archive className="w-3.5 h-3.5" /> Archive File
                  </button>
                )}
              </div>

              <button
                onClick={() => handleDeletePermanently(activeSelectedMessage._id)}
                className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-xs font-semibold text-rose-400 flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" /> Purge Entry
              </button>
            </div>
          </div>
        )}
      </FormModal>
    </div>
  );
};

export default InboxCMS;