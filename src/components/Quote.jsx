// src/pages/Quote.jsx
import { useState } from 'react';
import { jsPDF } from "jspdf";
import { supabase } from '../lib/supabase';

export default function Quote() {
  const [projectType, setProjectType] = useState('');
  const [deckData, setDeckData] = useState({ squareFootage: '', railingFeet: '', steps: '' });
  const [fenceData, setFenceData] = useState({ linearFeet: '', height: '', doubleSided: false });
  const [services, setServices] = useState([]);
  const [photos, setPhotos] = useState([]);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const handleServiceChange = (service) => {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setPhotos(files);
  };

  const uploadPhotos = async () => {
    const uploadedUrls = [];
  
    for (const photo of photos) {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString().slice(2)}.${fileExt}`;
      const filePath = `${fileName}`;
  
      const { error: uploadError } = await supabase.storage
        .from('quote-photos')
        .upload(filePath, photo, {
          contentType: photo.type,
          upsert: false, // prevent accidental overwrite
        });
  
      if (uploadError) {
        console.error("Photo upload failed:", uploadError.message);
        continue;
      }
  
      const { data: publicUrlData } = supabase
        .storage
        .from('quote-photos')
        .getPublicUrl(filePath);
  
      uploadedUrls.push(publicUrlData.publicUrl);
    }
  
    return uploadedUrls;
  };

  const saveQuote = async (subtotal, tax, total, photoUrls) => {
    const { data, error } = await supabase.from('quotes').insert([
      {
        full_name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
        project_type: projectType,
        deck_data: deckData,         // jsonb
        fence_data: fenceData,       // jsonb
        services: services,          // jsonb
        photo_urls: photoUrls,       // jsonb
        subtotal,
        tax,
        total,
        status: "Pending",
      }
    ]);

    if (error) {
      console.error("❌ Supabase error:", error.message);
    } else {
      console.log("✅ Quote saved successfully:", data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    let deckPrice = 0, fencePrice = 0, washPrice = 0;

    if (projectType === 'Deck' || projectType === 'Both') {
      deckPrice =
        (parseFloat(deckData.squareFootage || 0) * 3) +
        (parseFloat(deckData.railingFeet || 0) * 6) +
        (parseFloat(deckData.steps || 0) * 8);
    }

    if (projectType === 'Fence' || projectType === 'Both') {
      let pricePerFoot = parseFloat(fenceData.height || 0);
      fencePrice = (parseFloat(fenceData.linearFeet || 0) * pricePerFoot);
      if (fenceData.doubleSided) fencePrice *= 2;
    }

    services.forEach(service => {
      const sqft = parseFloat(deckData.squareFootage || 0);
      if (service === "Basic Wash") washPrice += sqft * 3;
      if (service === "Deep Wash") washPrice += sqft * 5;
      if (service === "Stripping") washPrice += sqft * 10;
    });

    const subtotal = deckPrice + fencePrice + washPrice;
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    const uploadedUrls = await uploadPhotos();

    const doc = new jsPDF();
    doc.setFontSize(20).setTextColor("#4B3621");
    doc.text("Quote Summary", 20, 20);
    doc.setFontSize(12).setTextColor("#000000");

    let y = 40;
    doc.text(`Deck Staining: $${deckPrice.toFixed(2)}`, 20, y); y += 10;
    doc.text(`Fence Staining: $${fencePrice.toFixed(2)}`, 20, y); y += 10;
    doc.text(`Washing Services: $${washPrice.toFixed(2)}`, 20, y); y += 10;
    doc.line(20, y, 190, y); y += 10;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, y); y += 10;
    doc.text(`Tax (15%): $${tax.toFixed(2)}`, 20, y); y += 10;
    doc.setFontSize(14).setTextColor("#4B3621");
    doc.text(`Total: $${total.toFixed(2)}`, 20, y); y += 20;
    doc.setFontSize(10).setTextColor("#666666");
    doc.text("Thank you for choosing Steve’s Staining Services!", 20, y);
    doc.save("Quote.pdf");

    console.log("Saving quote with:", {
      subtotal,
      tax,
      total,
      customerName,
      customerEmail,
      projectType,
      photoUrls: uploadedUrls
    });
    console.log("Form submitted.");
    console.log("Photos to upload:", photos);
    await saveQuote(subtotal, tax, total, uploadedUrls);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#4B3621]">Get Your Instant Quote</h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Customer Info */}
        <input type="text" placeholder="Full Name" required className="w-full border p-3 rounded" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <input type="email" placeholder="Email" required className="w-full border p-3 rounded" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
        <input type="text" placeholder="Phone" required className="w-full border p-3 rounded" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
        <input type="text" placeholder="Address" required className="w-full border p-3 rounded" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />

        {/* Project Type */}
        <select value={projectType} onChange={(e) => setProjectType(e.target.value)} required className="w-full border p-3 rounded">
          <option value="">Select Project Type</option>
          <option value="Deck">Deck</option>
          <option value="Fence">Fence</option>
          <option value="Both">Both</option>
        </select>

        {/* Deck Info */}
        {(projectType === 'Deck' || projectType === 'Both') && (
          <>
            <input type="number" placeholder="Deck Square Footage" value={deckData.squareFootage} onChange={(e) => setDeckData({ ...deckData, squareFootage: e.target.value })} className="w-full border p-3 rounded" />
            <input type="number" placeholder="Railing Length (ft)" value={deckData.railingFeet} onChange={(e) => setDeckData({ ...deckData, railingFeet: e.target.value })} className="w-full border p-3 rounded" />
            <input type="number" placeholder="Number of Steps" value={deckData.steps} onChange={(e) => setDeckData({ ...deckData, steps: e.target.value })} className="w-full border p-3 rounded" />
          </>
        )}

        {/* Fence Info */}
        {(projectType === 'Fence' || projectType === 'Both') && (
          <>
            <input type="number" placeholder="Fence Linear Feet" value={fenceData.linearFeet} onChange={(e) => setFenceData({ ...fenceData, linearFeet: e.target.value })} className="w-full border p-3 rounded" />
            <select value={fenceData.height} onChange={(e) => setFenceData({ ...fenceData, height: e.target.value })} className="w-full border p-3 rounded">
              <option value="">Select Fence Height</option>
              {[4, 5, 6, 7, 8].map(h => <option key={h} value={h}>{h} ft</option>)}
            </select>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={fenceData.doubleSided} onChange={(e) => setFenceData({ ...fenceData, doubleSided: e.target.checked })} />
              <label>Double Sided?</label>
            </div>
          </>
        )}

        {/* Services */}
        <div className="space-y-2">
          <label>Services:</label>
          {["Basic Wash", "Deep Wash", "Stripping"].map(service => (
            <label key={service} className="block">
              <input type="checkbox" onChange={() => handleServiceChange(service)} checked={services.includes(service)} />
              <span className="ml-2">{service}</span>
            </label>
          ))}
        </div>

        {/* Photos */}
        <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="w-full border p-3 rounded" />

        <button type="submit" className="w-full bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-4 px-6 rounded-full text-lg">
          Get My Instant Quote
        </button>
      </form>
    </div>
  );
}
