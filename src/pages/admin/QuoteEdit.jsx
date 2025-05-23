// Enhanced QuoteEdit.jsx with full form and normalization
import { useEffect, useState, useMemo } from "react";
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
            : normalizedData.fence_data || {}

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
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        }
      };

      const pricing = pricingMap;
      let deckStaining = 0, deckPrep = 0;
      let fenceStaining = 0, fencePrep = 0;
      let subtotal = 0, tax = 0, total = 0;

      // Deck calc
      if (updated.deck_data) {
        const { squareFootage = 0, railingFeet = 0, steps = 0, deckAge, previousCoating } = updated.deck_data;

        const sf = parseFloat(squareFootage) || 0;
        const rail = parseFloat(railingFeet) || 0;
        const st = parseFloat(steps) || 0;

        deckStaining = sf * (pricing.deck_sqft || 0)
          + rail * (pricing.railing_ft || 0)
          + st * (pricing.step || 0);

        let coatKey = previousCoating?.trim().toLowerCase();
        if (coatKey === "painted") coatKey = "paint";
        if (coatKey === "stained") coatKey = "stain";
        const coatingKey = coatKey ? `previous_${coatKey}` : null;

        const ageKey = mapAgeToKey(deckAge, "deck_age");
        deckPrep = sf * ((pricing[ageKey] || 0) + (pricing[coatingKey] || 0));
      }

      // Fence calc
      if (updated.fence_data) {
        const { linearFeet = 0, height = 0, doubleSided, fenceAge, fenceCoating } = updated.fence_data;

        const lf = parseFloat(linearFeet) || 0;
        const h = parseFloat(height) || 0;
        const area = lf * h;

        let coatKey = fenceCoating?.trim().toLowerCase();
        if (coatKey === "painted") coatKey = "paint";
        if (coatKey === "stained") coatKey = "stain";
        const coatingKey = coatKey ? `fence_previous_${coatKey}` : null;

        const ageKey = mapAgeToKey(fenceAge, "fence_age");
        const multiplier = doubleSided ? pricing.fence_double || 2 : 1;

        fenceStaining = area * (pricing.fence_sqft || 0) * multiplier;
        fencePrep = area * ((pricing[ageKey] || 0) + (pricing[coatingKey] || 0));
      }

      subtotal = deckStaining + deckPrep + fenceStaining + fencePrep;
      tax = parseFloat((subtotal * 0.15).toFixed(2));
      total = parseFloat((subtotal + tax).toFixed(2));

      return {
        ...updated,
        subtotal,
        tax,
        total,
        deck_staining: deckStaining,
        deck_preparation: deckPrep,
        fence_staining: fenceStaining,
        fence_preparation: fencePrep,
      };
    });
  };


  const handleSubmit = async () => {
    // 🔒 Ensure deck_data and fence_data are objects
    const safeDeckData = typeof form.deck_data === "string"
      ? JSON.parse(form.deck_data)
      : form.deck_data;

    const safeFenceData = typeof form.fence_data === "string"
      ? JSON.parse(form.fence_data)
      : form.fence_data;

    const payload = {
      ...form,
      custom_description: form.custom_description || null,
      deck_data: safeDeckData || null,
      fence_data: safeFenceData || null,
      photo_urls: Array.isArray(form.photo_urls) ? form.photo_urls : [],
      services: Array.isArray(form.services) ? form.services : [],
    };

    const { error } = await supabase.from("quotes").update(payload).eq("id", id);

    if (error) {
      toast.error("Failed to update the estimate. Please try again.");
    } else {
      toast.success("Estimate updated successfully.");
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

            {/* Square Footage */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Square Footage</label>
              <input
                type="number"
                value={form.deck_data?.squareFootage || ""}
                onChange={(e) =>
                  handleNestedChange("deck_data", "squareFootage", e.target.value)
                }
                className="border p-2 rounded"
              />
            </div>

            {/* Railing Feet */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Railing Feet</label>
              <input
                type="number"
                value={form.deck_data?.railingFeet || ""}
                onChange={(e) =>
                  handleNestedChange("deck_data", "railingFeet", e.target.value)
                }
                className="border p-2 rounded"
              />
            </div>

            {/* Steps */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Steps</label>
              <input
                type="number"
                value={form.deck_data?.steps || ""}
                onChange={(e) =>
                  handleNestedChange("deck_data", "steps", e.target.value)
                }
                className="border p-2 rounded"
              />
            </div>

            {/* Deck Age */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Deck Age</label>
              <select
                value={form.deck_data?.deckAge || ""}
                onChange={(e) =>
                  handleNestedChange("deck_data", "deckAge", e.target.value)
                }
                className="border p-2 rounded"
              >
                <option value="">Select Deck Age</option>
                {ageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Previous Coating */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Previous Coating</label>
              <select
                value={form.deck_data?.previousCoating || ""}
                onChange={(e) =>
                  handleNestedChange("deck_data", "previousCoating", e.target.value)
                }
                className="border p-2 rounded"
              >
                <option value="">Select Coating</option>
                {coatingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </section>
      )}

      {/* Fence Details */}
      {(form.project_type === "Fence" || form.project_type === "Both") && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#4B3621] mb-2">Fence Details</h2>
          <div className="grid md:grid-cols-3 gap-4">

            {/* Linear Feet */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Linear Feet</label>
              <input
                type="number"
                value={form.fence_data?.linearFeet || ""}
                onChange={(e) =>
                  handleNestedChange("fence_data", "linearFeet", e.target.value)
                }
                className="border p-2 rounded"
              />
            </div>

            {/* Height */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Height</label>
              <input
                type="number"
                value={form.fence_data?.height || ""}
                onChange={(e) =>
                  handleNestedChange("fence_data", "height", e.target.value)
                }
                className="border p-2 rounded"
              />
            </div>

            {/* Double Sided */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Double Sided</label>
              <input
                type="checkbox"
                checked={form.fence_data?.doubleSided || false}
                onChange={(e) =>
                  handleNestedChange("fence_data", "doubleSided", e.target.checked)
                }
                className="h-5 w-5 mt-2"
              />
            </div>

            {/* Fence Age */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Fence Age</label>
              <select
                value={form.fence_data?.fenceAge || ""}
                onChange={(e) =>
                  handleNestedChange("fence_data", "fenceAge", e.target.value)
                }
                className="border p-2 rounded"
              >
                <option value="">Select Fence Age</option>
                {ageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Previous Coating */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Previous Coating</label>
              <select
                value={form.fence_data?.fenceCoating || ""}
                onChange={(e) =>
                  handleNestedChange("fence_data", "fenceCoating", e.target.value)
                }
                className="border p-2 rounded"
              >
                <option value="">Select Coating</option>
                {coatingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
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
