import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import useAdminAuth from "../../hooks/useAdminAuth";

export default function PricingEditor() {
  const [pricingList, setPricingList] = useState([]);
  const [pricingMap, setPricingMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Deck");

  useAdminAuth();

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    const { data, error } = await supabase.from("pricing_rules").select("*");
    if (error) console.error("Error fetching pricing:", error);
    else {
      setPricingList(data);
      const map = {};
      data.forEach((item) => {
        map[item.key] = item.value;
      });
      setPricingMap(map);
    }
    setLoading(false);
  };

  const handleChange = (id, value) => {
    setPricingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, value: parseFloat(value) } : item
      )
    );
  };

  const saveChanges = async () => {
    const updates = pricingList.map(({ id, value }) =>
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
      deck_age_1_6: "Deck Age New (less than 1 month)",
      deck_age_6_12: "Deck Age 1–12 months",
      deck_age_1_5: "Deck Age 1–5 years",
      deck_age_5_plus: "Deck Age 5+ years",
      previous_none: "No Coating ($/sq.ft)",
      previous_paint: "Painted ($/sq.ft)",
      previous_stain: "Stained ($/sq.ft)",
      fence_sqft: "Fence Sq. Ft. ($/sq.ft)",
      fence_double: "Double-Sided Multiplier (x)",
      fence_age_1_6: "Fence Age New (less than 1 month)",
      fence_age_6_12: "Fence Age 1–12 months",
      fence_age_1_5: "Fence Age 1–5 years",
      fence_age_5_plus: "Fence Age 5+ years",
      fence_previous_none: "Fence No Coating ($/sq.ft)",
      fence_previous_paint: "Fence Painted ($/sq.ft)",
      fence_previous_stain: "Fence Stained ($/sq.ft)",
      deck_wash: "Deck Wash ($/sq.ft)",
      fence_wash: "Fence Wash ($/sq.ft)",
    };
    return labels[key] || key.replace(/_/g, " ");
  };

  const renderSection = (title, keys, bg = "bg-[#f9fafb]") => (
    <div className={`rounded-xl shadow p-6 mb-8 ${bg}`}>
      <h2 className="text-xl font-semibold text-[#4B3621] mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {keys.map((key) => {
          const item = pricingList.find((p) => p.key === key);
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
        {["Deck", "Fence"].map((tab) => (
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

      {/* Content */}
      {activeTab === "Deck" && (
        <>
          {renderSection("Deck Base Costs", ["deck_sqft", "railing_ft", "step"], "bg-[#f3f4f6]")}
          {renderSection("Deck Age Adjustments", ["deck_age_1_6", "deck_age_6_12", "deck_age_1_5", "deck_age_5_plus"])}
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

      {/* Live Calculator */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-[#4B3621] mb-4">Live Estimate Preview</h2>
        {activeTab === "Deck" && <DeckEstimator pricing={pricingMap} />}
        {activeTab === "Fence" && <FenceEstimator pricing={pricingMap} />}
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

function DeckEstimator({ pricing }) {
  const [sf, setSf] = useState('');
  const [rail, setRail] = useState('');
  const [steps, setSteps] = useState('');
  const [age, setAge] = useState('');
  const [coating, setCoating] = useState('');

  const [base, setBase] = useState(0);
  const [prep, setPrep] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sqft = parseFloat(sf) || 0;
    const railing = parseFloat(rail) || 0;
    const stepCount = parseFloat(steps) || 0;

    const ageKeyMap = {
      'New (less than 1 month)': 'deck_age_1_6',
      '1-12 months': 'deck_age_6_12',
      '1-5 years': 'deck_age_1_5',
      '5+ years': 'deck_age_5_plus'
    };

    const ageKey = ageKeyMap[age];
    const coatKey = coating ? `previous_${coating.toLowerCase()}` : null;

    const baseCost =
      sqft * (pricing.deck_sqft || 0) +
      railing * (pricing.railing_ft || 0) +
      stepCount * (pricing.step || 0);

    const prepCost =
      sqft * ((pricing[ageKey] || 0) + (pricing[coatKey] || 0));

    const subtotal = baseCost + prepCost;
    const taxAmount = subtotal * 0.15;

    setBase(baseCost);
    setPrep(prepCost);
    setTax(taxAmount);
    setTotal(subtotal + taxAmount);
  }, [sf, rail, steps, age, coating, pricing]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 max-w-lg">
        <input className="border p-2" type="number" min="0" placeholder="Square Footage" value={sf} onChange={e => setSf(e.target.value)} />
        <input className="border p-2" type="number" min="0" placeholder="Railing Feet" value={rail} onChange={e => setRail(e.target.value)} />
        <input className="border p-2" type="number" min="0" placeholder="Number of Steps" value={steps} onChange={e => setSteps(e.target.value)} />

        <select className="border p-2" value={age} onChange={e => setAge(e.target.value)}>
          <option value="">Deck Age</option>
          <option>New (less than 1 month)</option>
          <option>1-12 months</option>
          <option>1-5 years</option>
          <option>5+ years</option>
        </select>

        <select className="border p-2" value={coating} onChange={e => setCoating(e.target.value)}>
          <option value="">Previous Coating</option>
          <option>None</option>
          <option>Paint</option>
          <option>Stain</option>
        </select>
      </div>

      <div className="space-y-2 text-gray-800">
        <p>Staining: <span className="font-medium">${base.toFixed(2)}</span></p>
        <p>Preparation: <span className="font-medium">${prep.toFixed(2)}</span></p>
        <p>Tax (15%): <span className="font-medium">${tax.toFixed(2)}</span></p>
        <p className="text-lg font-semibold">Total: <span className="text-[#4B3621]">${total.toFixed(2)}</span></p>
      </div>
    </div>
  );
}


function FenceEstimator({ pricing }) {
  const [lf, setLf] = useState('');
  const [h, setH] = useState('');
  const [doubleSided, setDoubleSided] = useState(false);
  const [age, setAge] = useState('');
  const [coating, setCoating] = useState('');

  const [base, setBase] = useState(0);
  const [prep, setPrep] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const lengthNum = parseFloat(lf) || 0;
    const heightNum = parseFloat(h) || 0;
    const area = lengthNum * heightNum;

    const ageKeyMap = {
      'New (less than 1 month)': 'fence_age_1_6',
      '1-12 months': 'fence_age_6_12',
      '1-5 years': 'fence_age_1_5',
      '5+ years': 'fence_age_5_plus'
    };

    const ageKey = ageKeyMap[age];
    const coatKey = coating ? `previous_${coating.toLowerCase()}` : null;
    const multiplier = doubleSided ? (pricing.fence_double || 2) : 1;

    const baseCost = area * (pricing.fence_sqft || 0) * multiplier;
    const prepCost = area * ((pricing[ageKey] || 0) + (pricing[coatKey] || 0));
    const subtotal = baseCost + prepCost;
    const taxAmount = subtotal * 0.15;

    setBase(baseCost);
    setPrep(prepCost);
    setTax(taxAmount);
    setTotal(subtotal + taxAmount);
  }, [lf, h, doubleSided, age, coating, pricing]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 max-w-lg">
        <input
          type="number"
          min="0"
          inputMode="numeric"
          pattern="\d*"
          className="border p-2"
          placeholder="Linear Feet"
          value={lf}
          onChange={e => setLf(e.target.value)}
        />

        <select
          className="border p-2"
          value={h}
          onChange={e => setH(Number(e.target.value))}
        >
          <option value="">Select Height (ft)</option>
          {[4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>{num} ft</option>
          ))}
        </select>

        <select className="border p-2" value={age} onChange={e => setAge(e.target.value)}>
          <option value="">Fence Age</option>
          <option>New (less than 1 month)</option>
          <option>1-12 months</option>
          <option>1-5 years</option>
          <option>5+ years</option>
        </select>

        <select className="border p-2" value={coating} onChange={e => setCoating(e.target.value)}>
          <option value="">Previous Coating</option>
          <option>None</option>
          <option>Paint</option>
          <option>Stain</option>
        </select>

        <label className="col-span-2 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={doubleSided} onChange={e => setDoubleSided(e.target.checked)} />
          Double Sided
        </label>
      </div>

      <div className="space-y-2 text-gray-800">
        <p>Staining: <span className="font-medium">${base.toFixed(2)}</span></p>
        <p>Preparation: <span className="font-medium">${prep.toFixed(2)}</span></p>
        <p>Tax (15%): <span className="font-medium">${tax.toFixed(2)}</span></p>
        <p className="text-lg font-semibold">Total: <span className="text-[#4B3621]">${total.toFixed(2)}</span></p>
      </div>
    </div>
  );
}
