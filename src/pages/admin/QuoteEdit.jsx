// src/pages/admin/QuoteEdit.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function QuoteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      const { data, error } = await supabase.from("quotes").select("*").eq("id", id).single();
      if (error) console.error("Fetch error:", error);
      else setForm(data);
      setLoading(false);
    }
    fetchQuote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNestedChange = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const { error } = await supabase.from("quotes").update(form).eq("id", id);
    if (error) alert("Update failed");
    else navigate("/admin/quotes");
  };

  if (loading || !form) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-10 pt-24 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-[#4B3621]">Edit Estimate #{form.estimate_number}</h1>

      <h2 className="text-xl font-semibold mb-2 text-[#4B3621]">Customer Information</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <input name="full_name" value={form.full_name} disabled className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed" />
        <input name="email" value={form.email} disabled className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed" />
        <input name="phone" value={form.phone} disabled className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed" />
        <input name="address" value={form.address} disabled className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed" />
      </div>

      <h2 className="text-xl font-semibold mb-2 text-[#4B3621]">Estimate Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <input name="project_type" value={form.project_type} onChange={handleChange} placeholder="Project Type" className="border p-2 rounded w-full" />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
        <input name="subtotal" type="number" value={form.subtotal} onChange={handleChange} placeholder="Subtotal" className="border p-2 rounded w-full" />
        <input name="tax" type="number" value={form.tax} onChange={handleChange} placeholder="Tax" className="border p-2 rounded w-full" />
        <input name="total" type="number" value={form.total} onChange={handleChange} placeholder="Total" className="border p-2 rounded w-full" />
      </div>

      {(form.project_type === "Deck" || form.project_type === "Both") && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#4B3621]">Deck Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Deck Square Footage</label>
              <input type="number" value={form.deck_data?.squareFootage || ''} onChange={(e) => handleNestedChange('deck_data', 'squareFootage', e.target.value)} placeholder="Square Footage" className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="text-sm font-medium">Railing Feet</label>
              <input type="number" value={form.deck_data?.railingFeet || ''} onChange={(e) => handleNestedChange('deck_data', 'railingFeet', e.target.value)} placeholder="Railing Feet" className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="text-sm font-medium">Steps</label>
              <input type="number" value={form.deck_data?.steps || ''} onChange={(e) => handleNestedChange('deck_data', 'steps', e.target.value)} placeholder="Steps" className="border p-2 rounded w-full" />
            </div>
          </div>
        </div>
      )}

      {(form.project_type === "Fence" || form.project_type === "Both") && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#4B3621]">Fence Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Fence Linear Feet</label>
              <input type="number" value={form.fence_data?.linearFeet || ''} onChange={(e) => handleNestedChange('fence_data', 'linearFeet', e.target.value)} placeholder="Linear Feet" className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="text-sm font-medium">Fence Height</label>
              <input type="number" value={form.fence_data?.height || ''} onChange={(e) => handleNestedChange('fence_data', 'height', e.target.value)} placeholder="Height" className="border p-2 rounded w-full" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Double Sided</label>
              <input type="checkbox" checked={form.fence_data?.doubleSided || false} onChange={(e) => handleNestedChange('fence_data', 'doubleSided', e.target.checked)} />
            </div>
          </div>
        </div>
      )}

      {form.photo_urls?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#4B3621]">Uploaded Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {form.photo_urls.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                <img
                  src={url}
                  alt=""
                  className="rounded-lg shadow border hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="text-right">
        <button onClick={handleSubmit} className="px-6 py-3 bg-[#4B3621] text-white rounded-md hover:bg-[#3a2b1a]">Save Changes</button>
      </div>
    </div>
  );
}
