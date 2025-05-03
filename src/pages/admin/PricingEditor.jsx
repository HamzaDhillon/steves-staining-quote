// src/pages/PricingEditor.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PricingEditor() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sampleInputs, setSampleInputs] = useState({
    sqft: 500,
    railing_ft: 10,
    steps: 1,
    age: "6-12 months",
    coating: "Paint"
  });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    const { data, error } = await supabase.from("pricing_rules").select("*");
    if (error) console.error("Error fetching pricing:", error);
    else setPricing(data);
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

  const getLabel = (key) => {
    const labels = {
      deck_sqft: "Deck Sq. Ft. ($/sq.ft)",
      railing_ft: "Railing ($/ft)",
      step: "Step ($ each)",
      deck_age_1_6: "Deck Age 1–6 months",
      deck_age_6_12: "Deck Age 6–12 months",
      deck_age_1_5: "Deck Age 1–5 years",
      deck_age_5_plus: "Deck Age 5+ years",
      previous_none: "No Coating ($/sq.ft)",
      previous_paint: "Painted ($/sq.ft)",
      previous_stain: "Stained ($/sq.ft)",
      fence_sqft: "Fence Sq. Ft. ($/sq.ft)",
      fence_double: "Double-Sided Multiplier (x)"
    };
    return labels[key] || key.replace(/_/g, " ");
  };

  const get = (key) => {
    const item = pricing.find((p) => p.key === key);
    return item ? parseFloat(item.value || 0) : 0;
  };

  const calculateEstimate = () => {
    const sqft = parseFloat(sampleInputs.sqft || 0);
    const railing_ft = parseFloat(sampleInputs.railing_ft || 0);
    const steps = parseFloat(sampleInputs.steps || 0);

    const base = sqft * get("deck_sqft") +
                 railing_ft * get("railing_ft") +
                 steps * get("step");

    let ageAdj = 0;
    if (sampleInputs.age === "1-6 months") ageAdj = sqft * get("deck_age_1_6");
    else if (sampleInputs.age === "6-12 months") ageAdj = sqft * get("deck_age_6_12");
    else if (sampleInputs.age === "1-5 years") ageAdj = sqft * get("deck_age_1_5");
    else if (sampleInputs.age === "5+ years") ageAdj = sqft * get("deck_age_5_plus");

    let coatingAdj = 0;
    if (sampleInputs.coating === "None") coatingAdj = sqft * get("previous_none");
    else if (sampleInputs.coating === "Paint") coatingAdj = sqft * get("previous_paint");
    else if (sampleInputs.coating === "Stain") coatingAdj = sqft * get("previous_stain");

    const subtotal = base + ageAdj + coatingAdj;
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    return { base, ageAdj, coatingAdj, subtotal, tax, total };
  };

  const renderSection = (title, keys, bg = "bg-[#f9fafb]") => (
    <div className={`rounded-xl shadow p-6 mb-8 ${bg}`}>
      <h2 className="text-xl font-semibold text-[#4B3621] mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricing
          .filter((item) => keys.includes(item.key))
          .map((item) => (
            <div key={item.id} className="flex flex-col">
              <label className="font-medium mb-1">{getLabel(item.key)}</label>
              <input
                type="number"
                step="0.01"
                className="border border-gray-300 p-2 rounded"
                value={item.value}
                onChange={(e) => handleChange(item.id, e.target.value)}
              />
            </div>
          ))}
      </div>
    </div>
  );

  if (loading) return <div className="p-8">Loading...</div>;

  const estimate = calculateEstimate();

  return (
    <div className="container mx-auto px-6 py-10 max-w-screen-xl">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-[#4B3621] tracking-wide uppercase">
        Edit Pricing Rules
      </h1>

      {renderSection("Deck Base Costs", ["deck_sqft", "railing_ft", "step"], "bg-[#f3f4f6]")}
      {renderSection("Deck Age Adjustments", ["deck_age_1_6", "deck_age_6_12", "deck_age_1_5", "deck_age_5_plus"], "bg-[#f9fafb]")}
      {renderSection("Previous Coating Adjustments", ["previous_none", "previous_paint", "previous_stain"], "bg-[#f3f4f6]")}
      {renderSection("Fence Costs", ["fence_sqft", "fence_double"], "bg-[#f9fafb]")}

      {/* Interactive Live Estimate */}
      <div className="bg-white rounded-xl shadow p-6 mb-10 max-w-screen-md mx-auto border border-gray-200">
        <h2 className="text-2xl font-semibold text-[#4B3621] mb-4">📊 Live Deck Estimate Preview</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            placeholder="Square Footage"
            className="border p-2 rounded w-full"
            value={sampleInputs.sqft}
            onChange={(e) => setSampleInputs({ ...sampleInputs, sqft: e.target.value })}
          />
          <input
            type="number"
            placeholder="Railing Feet"
            className="border p-2 rounded w-full"
            value={sampleInputs.railing_ft}
            onChange={(e) => setSampleInputs({ ...sampleInputs, railing_ft: e.target.value })}
          />
          <input
            type="number"
            placeholder="Steps"
            className="border p-2 rounded w-full"
            value={sampleInputs.steps}
            onChange={(e) => setSampleInputs({ ...sampleInputs, steps: e.target.value })}
          />
          <select
            className="border p-2 rounded w-full"
            value={sampleInputs.age}
            onChange={(e) => setSampleInputs({ ...sampleInputs, age: e.target.value })}
          >
            <option value="1-6 months">Deck Age: 1–6 months</option>
            <option value="6-12 months">Deck Age: 6–12 months</option>
            <option value="1-5 years">Deck Age: 1–5 years</option>
            <option value="5+ years">Deck Age: 5+ years</option>
          </select>
          <select
            className="border p-2 rounded w-full"
            value={sampleInputs.coating}
            onChange={(e) => setSampleInputs({ ...sampleInputs, coating: e.target.value })}
          >
            <option value="None">No Coating</option>
            <option value="Paint">Painted</option>
            <option value="Stain">Stained</option>
          </select>
        </div>

        <div className="space-y-1 text-base text-gray-800">
          <p><strong>Base:</strong> ${estimate.base.toFixed(2)}</p>
          <p><strong>Age Adjustment:</strong> +${estimate.ageAdj.toFixed(2)}</p>
          <p><strong>Coating Adjustment:</strong> +${estimate.coatingAdj.toFixed(2)}</p>
          <hr className="my-2" />
          <p><strong>Subtotal:</strong> ${estimate.subtotal.toFixed(2)}</p>
          <p><strong>Tax (15%):</strong> ${estimate.tax.toFixed(2)}</p>
          <p className="text-lg font-bold text-[#4B3621]">Total: ${estimate.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={saveChanges}
          className="mt-6 bg-[#4B3621] hover:bg-[#3a2b1a] text-white px-8 py-4 rounded-full text-lg transition"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}
