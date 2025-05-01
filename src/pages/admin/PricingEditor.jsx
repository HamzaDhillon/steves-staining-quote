// src/pages/PricingEditor.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PricingEditor() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  // Only fetch pricing — no auth check here
  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    const { data, error } = await supabase.from("pricing_rules").select("*");
    if (error) {
      console.error("Error fetching pricing:", error);
    } else {
      setPricing(data);
    }
    setLoading(false);
  };

  const handleChange = (id, value) => {
    setPricing((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, value: parseFloat(value) } : item
      )
    );
  };

  const saveChanges = async () => {
    const updates = pricing.map(({ id, value }) =>
      supabase.from("pricing_rules").update({ value }).eq("id", id)
    );
    await Promise.all(updates);
    alert("Pricing updated!");
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Pricing Rules</h1>

      <div className="space-y-4">
        {pricing.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <label className="w-40 font-medium capitalize">
              {item.key.replace(/_/g, " ")}
            </label>
            <input
              type="number"
              className="border p-2 rounded w-32"
              value={item.value}
              onChange={(e) => handleChange(item.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={saveChanges}
        className="mt-6 bg-[#4B3621] hover:bg-[#3a2b1a] text-white px-6 py-3 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
