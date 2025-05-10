

// src/pages/PricingEditor.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PricingEditor() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Deck");

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
      fence_double: "Double-Sided Multiplier (x)",
      fence_age_1_6: "Fence Age 1–6 months",
      fence_age_6_12: "Fence Age 6–12 months",
      fence_age_1_5: "Fence Age 1–5 years",
      fence_age_5_plus: "Fence Age 5+ years",
      fence_previous_none: "Fence No Coating ($/sq.ft)",
      fence_previous_paint: "Fence Painted ($/sq.ft)",
      fence_previous_stain: "Fence Stained ($/sq.ft)",
      deck_wash: "Deck Wash ($/sq.ft)",
      fence_wash: "Fence Wash ($/sq.ft)"
    };
    return labels[key] || key.replace(/_/g, " ");
  };

  const renderSection = (title, keys, bg = "bg-[#f9fafb]") => (
    <div className={`rounded-xl shadow p-6 mb-8 ${bg}`}>
      <h2 className="text-xl font-semibold text-[#4B3621] mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {keys.map((key) => {
          const item = pricing.find((p) => p.key === key);
          if (!item) return null;
          return (
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
          );
        })}
      </div>
    </div>
  );

  if (loading) return <div className="p-8">Loading...</div>;


  return (
    <div className="container mx-auto px-6 py-10 pt-24 max-w-screen-xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold text-[#4B3621]">Edit Pricing Rules</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        {["Deck", "Fence" /*, "Wash"*/].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-4 ${activeTab === tab
                ? "border-[#4B3621] text-[#4B3621]"
                : "border-transparent text-gray-500 hover:text-[#4B3621]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content per tab */}
      {activeTab === "Deck" && (
        <>
          {renderSection("Deck Base Costs", ["deck_sqft", "railing_ft", "step"], "bg-[#f3f4f6]")}
          {renderSection("Deck Age Adjustments", ["deck_age_1_6", "deck_age_6_12", "deck_age_1_5", "deck_age_5_plus"], "bg-[#f9fafb]")}
          {renderSection("Previous Coating Adjustments", ["previous_none", "previous_paint", "previous_stain"], "bg-[#f3f4f6]")}
        </>
      )}

      {activeTab === "Fence" && (
        <>
          {renderSection("Fence Costs", ["fence_sqft", "fence_double"], "bg-[#f9fafb]")}
          {renderSection("Fence Age Adjustments", ["fence_age_1_6", "fence_age_6_12", "fence_age_1_5", "fence_age_5_plus"], "bg-[#f3f4f6]")}
          {renderSection("Fence Coating Adjustments", ["fence_previous_none", "fence_previous_paint", "fence_previous_stain"], "bg-[#f9fafb]")}
        </>
      )}

      {activeTab === "Wash" && (
        <>
          {renderSection("Maintenance Washing", ["deck_wash", "fence_wash"], "bg-[#f3f4f6]")
          }
        </>
      )}

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
