// Enhanced QuoteEdit.jsx with full form and normalization
import { useEffect, useState,useMemo } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAdminAuth from "../../hooks/useAdminAuth";

export default function QuoteEdit() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pricingMap, setPricingMap] = useState({});
  const ageOptions = useMemo(() => [
    { value: "1-6 months", label: "New (less than 1 month)" },
    { value: "6-12 months", label: "1–12 months" },
    { value: "1-5 years", label: "1–5 years" },
    { value: "5+ years", label: "5+ years" }
  ], []);
  const coatingOptions = ["None", "Painted", "Stained"];
  useAdminAuth();

  function normalizeCoating(value) {
    const val = value?.trim().toLowerCase();
    if (!val) return "None";

    if (val.includes("paint")) return "Painted";
    if (val.includes("stain")) return "Stained";

    return "None";
  }

  useEffect(() => {
    async function fetchQuote() {
      const { data, error } = await supabase.from("quotes").select("*").eq("id", id).single();
      if (error) {
        console.error("Fetch error:", error);
      } else {
        const normalizedData = { ...data };
        normalizedData.deck_data =
          typeof normalizedData.deck_data === "string"
            ? JSON.parse(normalizedData.deck_data || "{}")
            : normalizedData.deck_data || {};

        normalizedData.fence_data =
          typeof normalizedData.fence_data === "string"
            ? JSON.parse(normalizedData.fence_data || "{}")
            : normalizedData.fence_data || {};

        const rawDeckAge = normalizedData.deck_data.deckAge?.trim().toLowerCase();
        const matchedDeckAge = ageOptions.find(opt => opt.value.toLowerCase() === rawDeckAge)?.value || "";
        normalizedData.deck_data.deckAge = matchedDeckAge;

        normalizedData.deck_data.previousCoating = normalizeCoating(normalizedData.deck_data.previousCoating);
        normalizedData.fence_data.fenceCoating = normalizeCoating(normalizedData.fence_data.fenceCoating);


        const rawFenceAge = normalizedData.fence_data.fenceAge?.trim().toLowerCase();
        const matchedFenceAge = ageOptions.find(opt => opt.value.toLowerCase() === rawFenceAge)?.value || "";
        normalizedData.fence_data.fenceAge = matchedFenceAge;

        setForm(normalizedData);
        async function fetchPricing() {
          const { data, error } = await supabase.from("pricing_rules").select("*");
          if (error) console.error("Error fetching pricing rules:", error);
          else {
            const map = {};
            data.forEach((item) => {
              map[item.key] = item.value;
            });
            setPricingMap(map);
          }
        }
        fetchPricing();
      }
      setLoading(false);
    }

    fetchQuote();
  }, [id, ageOptions]);


  useEffect(() => {
    if (form) {
      const subtotal = parseFloat(form.subtotal || 0);
      const tax = parseFloat(form.tax || 0);
      setForm((prev) => ({ ...prev, total: subtotal + tax }));
    }
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  function mapAgeToKey(ageLabel, prefix = "fence_age") {
    if (!ageLabel) return null;
    const map = {
      "1-6 months": `${prefix}_1_6`,
      "6-12 months": `${prefix}_6_12`,
      "1-5 years": `${prefix}_1_5`,
      "5+ years": `${prefix}_5_plus`,
    };
    return map[ageLabel] || null;
  }
  const handleNestedChange = (section, key, value) => {
    setForm((prev) => {
      const updatedSection = {
        ...prev[section],
        [key]: value,
      };

      let newSubtotal = prev.subtotal;
      let tax = prev.tax;
      let total = prev.total;

      if (section === "fence_data") {
        const { linearFeet = 0, height = 0, doubleSided, fenceAge, fenceCoating } = {
          ...updatedSection,
          [key]: value,
        };

        const lf = parseFloat(linearFeet) || 0;
        const h = parseFloat(height) || 0;
        const area = lf * h;

        const ageKey = mapAgeToKey(fenceAge);
        const coatKey = fenceCoating ? `fence_previous_${fenceCoating.toLowerCase()}` : null;
        const multiplier = doubleSided ? pricingMap.fence_double || 2 : 1;

        const baseCost = area * (pricingMap.fence_sqft || 0) * multiplier;
        const prepCost = area * ((pricingMap[ageKey] || 0) + (pricingMap[coatKey] || 0));

        newSubtotal = parseFloat((baseCost + prepCost).toFixed(2));
      }

      if (section === "deck_data") {
        const { squareFootage = 0, railingFeet = 0, steps = 0, deckAge, previousCoating } = {
          ...updatedSection,
          [key]: value,
        };

        const sf = parseFloat(squareFootage) || 0;
        const rail = parseFloat(railingFeet) || 0;
        const st = parseFloat(steps) || 0;

        const baseCost =
          sf * (pricingMap.deck_sqft || 0) +
          rail * (pricingMap.railing_ft || 0) +
          st * (pricingMap.step || 0);

        const ageKey = mapAgeToKey(deckAge, "deck_age");
        const coatKey = previousCoating ? `previous_${previousCoating.toLowerCase()}` : null;

        const prepCost = sf * ((pricingMap[ageKey] || 0) + (pricingMap[coatKey] || 0));

        newSubtotal = parseFloat((baseCost + prepCost).toFixed(2));
      }

      tax = parseFloat((newSubtotal * 0.15).toFixed(2));
      total = parseFloat((newSubtotal + tax).toFixed(2));

      return {
        ...prev,
        [section]: updatedSection,
        subtotal: newSubtotal,
        tax,
        total,
      };
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      custom_description: form.custom_description || null,
      deck_data: form.deck_data ? JSON.stringify(form.deck_data) : null,
      fence_data: form.fence_data ? JSON.stringify(form.fence_data) : null,
      photo_urls: Array.isArray(form.photo_urls) ? form.photo_urls : [],

    };

    const { error } = await supabase.from("quotes").update(payload).eq("id", id);

    if (error) {
      toast.error("Failed to update the estimate. Please try again.");
    } else {
      toast.success("Estimate updated successfully.");
      // setTimeout(() => {
      //   navigate("/admin/quotes");
      // }, 2000); // 2 seconds delay
    }
  };

  if (loading || !form) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-10 pt-24 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-[#4B3621]">Edit Estimate #{form.estimate_number}</h1>

      {/* Customer Info */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#4B3621] mb-2">Customer Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {["full_name", "email", "phone", "address"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 font-semibold capitalize">{field.replace("_", " ")}</label>
              <input
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Deck Details */}
      {(form.project_type === "Deck" || form.project_type === "Both") && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#4B3621] mb-2">Deck Details</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {["squareFootage", "railingFeet", "steps", "deckAge", "previousCoating"].map((key) => (
              <div key={key} className="flex flex-col">
                <label className="mb-1 font-semibold">
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, c => c.toUpperCase())}
                </label>

                {["deckAge", "previousCoating"].includes(key) ? (
                  <select
                    value={form.deck_data?.[key] || ""}
                    onChange={(e) => handleNestedChange("deck_data", key, e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select</option>
                    {(key === "deckAge" ? ageOptions : coatingOptions).map((opt) => (
                      typeof opt === "object"
                        ? <option key={opt.value} value={opt.value}>{opt.label}</option>
                        : <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    value={form.deck_data?.[key] || ""}
                    onChange={(e) => handleNestedChange("deck_data", key, e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fence Details */}
      {(form.project_type === "Fence" || form.project_type === "Both") && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#4B3621] mb-2">Fence Details</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {["linearFeet", "height", "fenceAge", "fenceCoating"].map((key) => (
              <div key={key} className="flex flex-col">
                <label className="mb-1 font-semibold">
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, c => c.toUpperCase())}
                </label>
                {["fenceAge", "fenceCoating"].includes(key) ? (
                  <select
                    value={form.fence_data?.[key] || ""}
                    onChange={(e) => handleNestedChange("fence_data", key, e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select</option>
                    {(key === "fenceAge" ? ageOptions : coatingOptions).map((opt) =>
                      typeof opt === "object" ? (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ) : (
                        <option key={opt} value={opt}>{opt}</option>
                      )
                    )}

                  </select>
                ) : (
                  <input
                    type="number"
                    value={form.fence_data?.[key] || ""}
                    onChange={(e) => handleNestedChange("fence_data", key, e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                )}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={form.fence_data?.doubleSided || false}
                onChange={(e) => handleNestedChange("fence_data", "doubleSided", e.target.checked)}
              />
              <label>Double Sided</label>
            </div>
          </div>
        </section>
      )}

      {/* Custom Project Description */}
      {form.project_type === "Other" && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#4B3621] mb-2">Custom Project Description</h2>
          <textarea
            value={form.custom_description || ""}
            onChange={(e) => setForm((prev) => ({ ...prev, custom_description: e.target.value }))}
            className="border p-2 rounded w-full"
            rows={4}
          />
        </section>
      )}

      {/* Estimate Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#4B3621] mb-2">Estimate Summary</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {["project_type", "subtotal", "tax", "total"].map((key) => (
            <div key={key} className="flex flex-col">
              <label className="mb-1 font-semibold capitalize">{key.replace("_", " ")}</label>
              <input
                name={key}
                type={key === "subtotal" || key === "tax" || key === "total" ? "number" : "text"}
                value={form[key] || ""}
                onChange={handleChange}
                readOnly={key === "total" || key === "project_type"} // lock project_type
                className="border p-2 rounded w-full bg-gray-100" // subtle styling
              />
            </div>
          ))}

        </div>
      </section>

      {/* Uploaded Photos Preview */}
      {form.photo_urls?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#4B3621] mb-2">Uploaded Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {form.photo_urls.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                <img
                  src={url}
                  alt={`Estimate upload ${i + 1}`}
                  className="rounded-lg shadow border hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                />
              </a>
            ))}
          </div>
        </section>
      )}


      <div className="text-right">
        <button onClick={handleSubmit} className="px-6 py-3 bg-[#4B3621] text-white rounded-full hover:bg-[#3a2b1a]">
          Save Changes
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
