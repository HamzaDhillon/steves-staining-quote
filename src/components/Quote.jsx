// src/pages/Quote.jsx
import { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { supabase } from '../lib/supabase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  full_name: yup.string().matches(/^[A-Za-z\s'-]{2,}$/, 'Enter a valid name').required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be in 123-456-7890 format').required('Phone is required'),
  address: yup.string().required('Address is required'),
  project_type: yup.string().required('Please select a project type'),
});

export default function Quote() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [projectType, setProjectType] = useState('');
  const [deckData, setDeckData] = useState({ squareFootage: '', railingFeet: '', steps: '', deckAge: '', previousCoating: '' });
  const [fenceData, setFenceData] = useState({ linearFeet: '', height: '', doubleSided: false });
  const [services, setServices] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [pricing, setPricing] = useState({});

  useEffect(() => {
    const fetchPricing = async () => {
      const { data, error } = await supabase.from("pricing_rules").select("*");
      if (error) console.error("Pricing fetch error:", error);
      else {
        const map = {};
        data.forEach(p => { map[p.key] = p.value; });
        setPricing(map);
      }
    };
    fetchPricing();
  }, []);

  const uploadPhotos = async () => {
    const uploadedUrls = [];
    for (const photo of photos) {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString().slice(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      const { error: uploadError } = await supabase.storage.from('quote-photos').upload(filePath, photo, {
        contentType: photo.type,
        upsert: false,
      });
      if (uploadError) continue;
      const { data: publicUrlData } = supabase.storage.from('quote-photos').getPublicUrl(filePath);
      uploadedUrls.push(publicUrlData.publicUrl);
    }
    return uploadedUrls;
  };

  const onSubmit = async (data) => {
    let deckPrice = 0, fencePrice = 0, washPrice = 0;
    const sqft = parseFloat(deckData.squareFootage || 0);
    const railing = parseFloat(deckData.railingFeet || 0);
    const steps = parseFloat(deckData.steps || 0);

    if (projectType === 'Deck' || projectType === 'Both') {
      // Deck Base Costs
      deckPrice = (sqft * (pricing.deck_sqft || 0)) +
        (railing * (pricing.railing_ft || 0)) +
        (steps * (pricing.step || 0));

      // Deck Age Adjustment
      if (deckData.deckAge === "1-6 months") deckPrice += sqft * (pricing.deck_age_1_6 || 0);
      else if (deckData.deckAge === "6-12 months") deckPrice += sqft * (pricing.deck_age_6_12 || 0);
      else if (deckData.deckAge === "1-5 years") deckPrice += sqft * (pricing.deck_age_1_5 || 0);
      else if (deckData.deckAge === "5+ years") deckPrice += sqft * (pricing.deck_age_5_plus || 0);

      // Previous Coating Adjustment
      if (deckData.previousCoating === "None") deckPrice += sqft * (pricing.previous_none || 0);
      else if (deckData.previousCoating === "Paint") deckPrice += sqft * (pricing.previous_paint || 0);
      else if (deckData.previousCoating === "Stain") deckPrice += sqft * (pricing.previous_stain || 0);
    }

    if (projectType === 'Fence' || projectType === 'Both') {
      const fenceFeet = parseFloat(fenceData.linearFeet || 0);
      const fenceHeight = parseFloat(fenceData.height || 0);
      const area = fenceFeet * fenceHeight;

      fencePrice = area * (pricing.fence_sqft || 0);
      if (fenceData.doubleSided) {
        fencePrice *= (pricing.fence_double || 2);
      }
    }

    // Optional Services
    services.forEach(service => {
      if (service === "Basic Wash") washPrice += sqft * 3;
      if (service === "Deep Wash") washPrice += sqft * 5;
      if (service === "Stripping") washPrice += sqft * 10;
    });

    const subtotal = deckPrice + fencePrice + washPrice;
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    const uploadedUrls = await uploadPhotos();
    //pdf generation
    const doc = new jsPDF();

    // Text Header (instead of logo image)
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Instant Estimates', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    let y = 30; // Move content below the header

    // Divider
    doc.setDrawColor(200);
    doc.line(20, y, 190, y);
    y += 10;

    // Client Info
    doc.setFontSize(12).setTextColor(0).setFont('helvetica', 'bold');
    doc.text("Customer Details", 20, y); y += 7;
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${data.full_name}`, 20, y); y += 6;
    doc.text(`Email: ${data.email}`, 20, y); y += 6;
    doc.text(`Phone: ${data.phone}`, 20, y); y += 6;
    doc.text(`Address: ${data.address}`, 20, y); y += 10;

    // Project Info
    doc.setFont('helvetica', 'bold').text("Project Details", 20, y); y += 7;
    doc.setFont('helvetica', 'normal');
    doc.text(`Type: ${projectType}`, 20, y); y += 6;
    if (projectType === 'Deck' || projectType === 'Both') {
      doc.text(`Deck Size: ${deckData.squareFootage} sq. ft`, 20, y); y += 6;
      doc.text(`Railing: ${deckData.railingFeet} ft`, 20, y); y += 6;
      doc.text(`Steps: ${deckData.steps}`, 20, y); y += 6;
      doc.text(`Deck Age: ${deckData.deckAge}`, 20, y); y += 6;
      doc.text(`Previous Coating: ${deckData.previousCoating}`, 20, y); y += 6;
    }
    if (projectType === 'Fence' || projectType === 'Both') {
      doc.text(`Fence: ${fenceData.linearFeet} ft x ${fenceData.height} ft`, 20, y); y += 6;
      doc.text(`Double Sided: ${fenceData.doubleSided ? 'Yes' : 'No'}`, 20, y); y += 6;
    }
    if (services.length > 0) {
      doc.text(`Extra Services: ${services.join(', ')}`, 20, y); y += 6;
    }

    y += 10;
    doc.line(20, y, 190, y);
    y += 10;

    // Estimate Breakdown
    doc.setFont('helvetica', 'bold').text("Estimate Summary", 20, y); y += 8;
    const breakdown = [
      { label: "Deck Staining", value: deckPrice },
      { label: "Fence Staining", value: fencePrice },
      { label: "Washing Services", value: washPrice },
      { label: "Subtotal", value: subtotal },
      { label: "Tax (15%)", value: tax },
      { label: "Total", value: total, bold: true }
    ];

    breakdown.forEach(item => {
      doc.setFont('helvetica', item.bold ? 'bold' : 'normal');
      doc.text(item.label, 20, y);
      doc.text(`$${item.value.toFixed(2)}`, 180, y, { align: 'right' });
      y += 8;
    });

    y += 12;
    doc.setFontSize(10).setTextColor(100);
    doc.text("Thank you for choosing Instant Estimates.", 20, y); y += 5;
    doc.text("For support, contact info@instantestimates.com", 20, y);
    doc.save("Instant_Estimate.pdf");

    // Save quote to Supabase
    await supabase.from('quotes').insert([{
      ...data,
      project_type: projectType,
      deck_data: deckData,
      fence_data: fenceData,
      services,
      photo_urls: uploadedUrls,
      subtotal,
      tax,
      total,
      status: 'Pending',
      deck_age: deckData.deckAge,
      previous_coating: deckData.previousCoating
    }]);
  };


  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#4B3621]">Get Your Instant Quote</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <input placeholder="Full Name" {...register('full_name')} className="w-full border p-3 rounded" />
          {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
        </div>
        <div>
          <input type="email" placeholder="Email" {...register('email')} className="w-full border p-3 rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <input type="tel" placeholder="Phone (123-456-7890)" {...register('phone')} className="w-full border p-3 rounded" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div>
          <input placeholder="Address" {...register('address')} className="w-full border p-3 rounded" />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>
        <div>
          <select {...register('project_type')} value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full border p-3 rounded">
            <option value="">Select Project Type</option>
            <option value="Deck">Deck</option>
            <option value="Fence">Fence</option>
            <option value="Both">Both</option>
          </select>
          {errors.project_type && <p className="text-red-500 text-sm">{errors.project_type.message}</p>}
        </div>
        {(projectType === 'Deck' || projectType === 'Both') && (
          <>
            <input type="number" placeholder="Deck Square Footage" className="w-full border p-3 rounded" value={deckData.squareFootage} onChange={(e) => setDeckData({ ...deckData, squareFootage: e.target.value })} />
            <input type="number" placeholder="Railing Length (ft)" className="w-full border p-3 rounded" value={deckData.railingFeet} onChange={(e) => setDeckData({ ...deckData, railingFeet: e.target.value })} />
            <input type="number" placeholder="Number of Steps" className="w-full border p-3 rounded" value={deckData.steps} onChange={(e) => setDeckData({ ...deckData, steps: e.target.value })} />
            <select
              className="w-full border p-3 rounded"
              value={deckData.deckAge}
              onChange={(e) => setDeckData({ ...deckData, deckAge: e.target.value })}
            >
              <option value="">Select Deck Age</option>
              <option value="1-6 months">1–6 months</option>
              <option value="6-12 months">6–12 months</option>
              <option value="1-5 years">1–5 years</option>
              <option value="5+ years">5+ years</option>
            </select>

            <select
              className="w-full border p-3 rounded"
              value={deckData.previousCoating}
              onChange={(e) => setDeckData({ ...deckData, previousCoating: e.target.value })}
            >
              <option value="">Select Previous Coating</option>
              <option value="None">None</option>
              <option value="Paint">Paint</option>
              <option value="Stain">Stain</option>
            </select>

          </>
        )}
        {(projectType === 'Fence' || projectType === 'Both') && (
          <>
            <input type="number" placeholder="Fence Linear Feet" className="w-full border p-3 rounded" value={fenceData.linearFeet} onChange={(e) => setFenceData({ ...fenceData, linearFeet: e.target.value })} />
            <select className="w-full border p-3 rounded" value={fenceData.height} onChange={(e) => setFenceData({ ...fenceData, height: e.target.value })}>
              <option value="">Select Fence Height</option>
              {[4, 5, 6, 7, 8].map(h => <option key={h} value={h}>{h} ft</option>)}
            </select>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={fenceData.doubleSided} onChange={(e) => setFenceData({ ...fenceData, doubleSided: e.target.checked })} />
              <label>Double Sided?</label>
            </div>
          </>
        )}
        <div className="space-y-2">
          <label>Services:</label>
          {["Basic Wash", "Deep Wash", "Stripping"].map(service => (
            <label key={service} className="block">
              <input type="checkbox" onChange={() => setServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service])} checked={services.includes(service)} />
              <span className="ml-2">{service}</span>
            </label>
          ))}
        </div>
        <input type="file" multiple accept="image/*" onChange={(e) => setPhotos(Array.from(e.target.files).slice(0, 5))} className="w-full border p-3 rounded" />
        <button type="submit" className="w-full bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-4 px-6 rounded-full text-lg">
          Get My Instant Quote
        </button>
      </form>
    </div>
  );
};

