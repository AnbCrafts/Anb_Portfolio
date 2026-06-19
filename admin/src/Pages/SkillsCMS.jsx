import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Cpu } from 'lucide-react';
import { skillThunks } from '../Store/cmsStore';
import DataTable from '../Components/Shared/DataTable';
import FormModal from '../Components/Shared/FormModal';

const SkillsCMS = () => {
  const dispatch = useDispatch();
  const { items: skills, loading: isLoading } = useSelector((state) => state.cms.skills);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  // Baseline state structure mirroring your MongoDB Schema
  const initialFormState = {
    name: '',
    category: 'Frontend',
    proficiency: 80,
    icon: '',
    displayOrder: 1
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch all skills on mount
  useEffect(() => {
    dispatch(skillThunks.fetchAll());
  }, [dispatch]);

  const columns = [
    { header: 'Order', accessor: 'displayOrder' },
    { header: 'Skill Name', accessor: 'name' },
    { 
      header: 'Category Group', 
      accessor: 'category',
      render: (row) => (
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80">
          {row.category}
        </span>
      )
    },
    { 
      header: 'Proficiency Gauge', 
      accessor: 'proficiency',
      render: (row) => (
        <div className="flex items-center gap-3 w-40">
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" 
              style={{ width: `${row.proficiency}%` }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-slate-400 shrink-0">{row.proficiency}%</span>
        </div>
      )
    }
  ];

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'Frontend',
      proficiency: skill.proficiency || 80,
      icon: skill.icon || '',
      displayOrder: skill.displayOrder || 1
    });
    setIsModalOpen(true);
  };

  const handleDelete = (skill) => {
    if (window.confirm(`Delete skill node: ${skill.name}?`)) {
      dispatch(skillThunks.remove(skill._id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingSkill) {
      dispatch(skillThunks.update({ id: editingSkill._id, payload: formData }));
    } else {
      dispatch(skillThunks.create(formData));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-slate-400">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">CMS Core</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Skills & Architecture</h2>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wide rounded-xl shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 active:scale-95 transition-all duration-150"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Add Skill
        </button>
      </div>

      {/* Grid Display */}
      <DataTable 
        columns={columns} 
        data={skills} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Entry Modal Overlay */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? `Modify Core Stack Element: ${editingSkill.name}` : 'Register Skill Schema Node'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-5 pb-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Skill Identifier Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. TypeScript"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Lucide Icon String ID</label>
              <input 
                type="text" 
                placeholder="e.g. Code, Database, Cpu"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Core Architecture Domain</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-400 focus:outline-none focus:border-emerald-500/50 transition-all"
              >
                <option value="Frontend">Frontend Frameworks</option>
                <option value="Backend">Backend Runtime Engineering</option>
                <option value="Database">Database Management</option>
                <option value="DevOps & Tools">Infrastructure / DevOps</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Sorting Display Order</label>
              <input 
                type="number" 
                required
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 tracking-wide uppercase">
              <span>Proficiency Weight Gauge</span>
              <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {formData.proficiency}%
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100"
              step="5"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) || 0 })}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-slate-800"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-bold tracking-wide rounded-xl transition-all"
            >
              Save Stack Node
            </button>
          </div>

        </form>
      </FormModal>
    </div>
  );
};

export default SkillsCMS;