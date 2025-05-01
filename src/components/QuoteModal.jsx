// QuoteModal.jsx
import { useState, useEffect } from 'react';
export default function QuoteModal({ isOpen, onClose, onSubmit, initialData = {}, isEditing = false }) {
    const data = initialData || {};
    const [form, setForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        project_type: '',
        subtotal: 0,
        tax: 0,
        total: 0,
      });
    
      useEffect(() => {
        if (initialData) {
          setForm({
            full_name: initialData.full_name || '',
            email: initialData.email || '',
            phone: initialData.phone || '',
            address: initialData.address || '',
            project_type: initialData.project_type || '',
            subtotal: initialData.subtotal || 0,
            tax: initialData.tax || 0,
            total: initialData.total || 0,
          });
        }
      }, [initialData]);
    
    if (!isOpen) return null;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleSubmit = () => {
      onSubmit(form);
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold">{isEditing ? 'Edit Quote' : 'Add New Quote'}</h2>
  
          <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded" />
          <input name="project_type" value={form.project_type} onChange={handleChange} placeholder="Project Type" className="w-full border p-2 rounded" />
          <input name="subtotal" value={form.subtotal} onChange={handleChange} type="number" placeholder="Subtotal" className="w-full border p-2 rounded" />
          <input name="tax" value={form.tax} onChange={handleChange} type="number" placeholder="Tax" className="w-full border p-2 rounded" />
          <input name="total" value={form.total} onChange={handleChange} type="number" placeholder="Total" className="w-full border p-2 rounded" />
  
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 rounded bg-[#4B3621] text-white">{isEditing ? 'Save' : 'Add'}</button>
          </div>
        </div>
      </div>
    );
  }
  