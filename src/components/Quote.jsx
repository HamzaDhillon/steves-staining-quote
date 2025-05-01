// src/pages/Quote.jsx
import { useState } from 'react';
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
  const [deckData, setDeckData] = useState({ squareFootage: '', railingFeet: '', steps: '' });
  const [fenceData, setFenceData] = useState({ linearFeet: '', height: '', doubleSided: false });
  const [services, setServices] = useState([]);
  const [photos, setPhotos] = useState([]);

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
    if (projectType === 'Deck' || projectType === 'Both') {
      deckPrice = (parseFloat(deckData.squareFootage || 0) * 3) +
                  (parseFloat(deckData.railingFeet || 0) * 6) +
                  (parseFloat(deckData.steps || 0) * 8);
    }
    if (projectType === 'Fence' || projectType === 'Both') {
      let pricePerFoot = parseFloat(fenceData.height || 0);
      fencePrice = parseFloat(fenceData.linearFeet || 0) * pricePerFoot;
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

    await supabase.from('quotes').insert([{ ...data, project_type: projectType, deck_data: deckData, fence_data: fenceData, services, photo_urls: uploadedUrls, subtotal, tax, total, status: 'Pending' }]);
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
}
