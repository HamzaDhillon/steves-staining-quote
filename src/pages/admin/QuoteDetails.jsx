// src/pages/admin/QuoteDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function QuoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      const { data, error } = await supabase.from("quotes").select("*").eq("id", id).single();
      if (error) console.error("Error fetching quote:", error.message);
      else setQuote(data);
      setLoading(false);
    }
    fetchQuote();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!quote) return <div className="p-8 text-red-500">Quote not found.</div>;

  const {
    full_name,
    email,
    phone,
    address,
    project_type,
    estimate_number,
    subtotal,
    tax,
    total,
    deck_data = {},
    fence_data = {},
    services = [],
    photo_urls = [],
    deck_staining,
    deck_preparation,
    fence_staining,
    fence_preparation,
    status,
    created_at,
  } = quote;

  return (
    <div className="container mx-auto px-6 pt-24 py-10 max-w-5xl">
      <button onClick={() => navigate(-1)} className="mb-6 text-[#4B3621] underline">
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2 text-[#4B3621]">Estimate #{estimate_number}</h1>
      <p className="text-sm text-gray-500 mb-6">Created on {new Date(created_at).toLocaleString()}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#4B3621]">Customer Information</h2>
          <p><strong>Name:</strong> {full_name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Project Type:</strong> {project_type}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#4B3621]">Estimate Summary</h2>
          <p><strong>Subtotal:</strong> ${subtotal?.toFixed(2)}</p>
          <p><strong>Tax:</strong> ${tax?.toFixed(2)}</p>
          <p><strong>Total:</strong> ${total?.toFixed(2)}</p>
        </div>
      </div>

      {(project_type === "Deck" || project_type === "Both") && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#4B3621]">Deck Details</h2>
          <p><strong>Square Footage:</strong> {deck_data.squareFootage}</p>
          <p><strong>Railing (ft):</strong> {deck_data.railingFeet}</p>
          <p><strong>Steps:</strong> {deck_data.steps}</p>
          <p><strong>Deck Age:</strong> {deck_data.deckAge}</p>
          <p><strong>Previous Coating:</strong> {deck_data.previousCoating}</p>
          <p><strong>Deck Staining:</strong> ${deck_staining?.toFixed(2)}</p>
          <p><strong>Deck Preparation:</strong> ${deck_preparation?.toFixed(2)}</p>
        </div>
      )}

      {(project_type === "Fence" || project_type === "Both") && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#4B3621]">Fence Details</h2>
          <p><strong>Linear Feet:</strong> {fence_data.linearFeet}</p>
          <p><strong>Height:</strong> {fence_data.height}</p>
          <p><strong>Double Sided:</strong> {fence_data.doubleSided ? "Yes" : "No"}</p>
          <p><strong>Fence Age:</strong> {fence_data.fenceAge}</p>
          <p><strong>Previous Coating:</strong> {fence_data.fenceCoating}</p>
          <p><strong>Fence Staining:</strong> ${fence_staining?.toFixed(2)}</p>
          <p><strong>Fence Preparation:</strong> ${fence_preparation?.toFixed(2)}</p>
        </div>
      )}

      {services.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#4B3621]">Extra Services</h2>
          <ul className="list-disc list-inside">
            {services.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {photo_urls.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#4B3621]">Uploaded Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photo_urls.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                <img src={url} alt={`Quote ${i + 1}`} className="rounded-lg shadow border hover:scale-105 transition-transform duration-300 cursor-zoom-in" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
