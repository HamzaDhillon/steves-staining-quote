



// Full updated Quote.jsx - with clear-on-submit & success message
import { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { supabase } from '../lib/supabase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  full_name: yup.string().matches(/^[A-Za-z\s'-]{2,}$/, 'Enter a valid name').required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().matches(/^\(\d{3}\) \d{3} \d{4}$/, 'Phone must be in (123) 456 7890 format').required('Phone is required'),
  address: yup.string().required('Address is required'),
  project_type: yup.string().required('Please select a project type'),
});

export default function Quote() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
  const [projectType, setProjectType] = useState('');
  const [deckData, setDeckData] = useState({ squareFootage: '', railingFeet: '', steps: '', deckAge: '', previousCoating: '' });
  const [fenceData, setFenceData] = useState({ linearFeet: '', height: '', doubleSided: false, fenceAge: '', fenceCoating: '' });
  const [services, setServices] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [pricing, setPricing] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    async function fetchPricing() {
      const { data, error } = await supabase.from('pricing_rules').select('*');
      if (!error) {
        const map = {};
        data.forEach((p) => { map[p.key] = p.value; });
        setPricing(map);
      }
    }
    fetchPricing();
  }, []);

  const uploadPhotos = async () => {
    const urls = [];
    for (const photo of photos) {
      const ext = photo.name.split('.').pop();
      const name = `${Date.now()}-${Math.random().toString().slice(2)}.${ext}`;
      const { error: err } = await supabase.storage.from('quote-photos').upload(name, photo, { upsert: false });
      if (!err) {
        const { data: urlData } = supabase.storage.from('quote-photos').getPublicUrl(name);
        urls.push(urlData.publicUrl);
      }
    }
    return urls;
  };

  const onSubmit = async (data) => {
    let deckStaining = 0, deckPrep = 0, fenceStaining = 0, fencePrep = 0, wash = 0;
    const sf = parseFloat(deckData.squareFootage) || 0;
    const rf = parseFloat(deckData.railingFeet) || 0;
    const st = parseFloat(deckData.steps) || 0;

    if (projectType === 'Deck' || projectType === 'Both') {
      deckStaining = sf * (pricing.deck_sqft || 0) + rf * (pricing.railing_ft || 0) + st * (pricing.step || 0);
      if (deckData.deckAge) deckPrep += sf * (pricing[`deck_age_${deckData.deckAge.replace(/\D/g, '_')}`] || 0);
      if (deckData.previousCoating) deckPrep += sf * (pricing[`previous_${deckData.previousCoating.toLowerCase()}`] || 0);
    }

    if (projectType === 'Fence' || projectType === 'Both') {
      const lf = parseFloat(fenceData.linearFeet) || 0;
      const h = parseFloat(fenceData.height) || 0;
      const area = lf * h;
      fenceStaining = area * (pricing.fence_sqft || 0) * (fenceData.doubleSided ? (pricing.fence_double || 2) : 1);
      if (fenceData.fenceAge) fencePrep += area * (pricing[`deck_age_${fenceData.fenceAge.replace(/\D/g, '_')}`] || 0);
      if (fenceData.fenceCoating) fencePrep += area * (pricing[`previous_${fenceData.fenceCoating.toLowerCase()}`] || 0);
    }

    services.forEach(s => {
      if (s === 'Basic Wash') wash += sf * (pricing.wash_basic || 0);
      if (s === 'Deep Wash') wash += sf * (pricing.wash_deep || 0);
      if (s === 'Stripping') wash += sf * (pricing.wash_stripping || 0);
    });

    const subtotal = deckStaining + deckPrep + fenceStaining + fencePrep + wash;
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    const photoUrls = await uploadPhotos();

    const doc = new jsPDF();
    doc.setFontSize(22).text('Instant Estimates', 105, 20, { align: 'center' });
    doc.save('Instant_Estimate.pdf');

    const { count } = await supabase.from('quotes').select('*', { count: 'exact', head: true });
    const estimate_number = String(count + 1).padStart(4, '0');

    await supabase.from('quotes').insert([{
      ...data,
      estimate_number,
      project_type: projectType,
      deck_data: deckData,
      fence_data: fenceData,
      services,
      photo_urls: photoUrls,
      deck_staining: deckStaining,
      deck_preparation: deckPrep,
      fence_staining: fenceStaining,
      fence_preparation: fencePrep,
      subtotal,
      tax,
      total,
      status: 'Pending'
    }]);

    reset();
    setProjectType('');
    setDeckData({ squareFootage: '', railingFeet: '', steps: '', deckAge: '', previousCoating: '' });
    setFenceData({ linearFeet: '', height: '', doubleSided: false, fenceAge: '', fenceCoating: '' });
    setServices([]);
    setPhotos([]);
    setSubmissionSuccess(true);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#4B3621]">Get Your Instant Estimate</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
        {/* Personal Info */}
        <div><input placeholder="Full Name" {...register('full_name')} className="w-full border p-3 rounded" />{errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}</div>
        <div><input type="email" placeholder="Email" {...register('email')} className="w-full border p-3 rounded" />{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}</div>
        <div><input type="tel" placeholder="Phone (514) 951 2681" maxLength={14} {...register('phone')} onChange={(e) => {
          const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
          e.target.value = cleaned.length > 6 ? `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6)}` : cleaned.length > 3 ? `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}` : cleaned.length > 0 ? `(${cleaned}` : '';
        }} className="w-full border p-3 rounded" />{errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}</div>
        <div><input placeholder="Address" {...register('address')} className="w-full border p-3 rounded" />{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}</div>

        {/* Project Type */}
        <div><select {...register('project_type')} value={projectType} onChange={e => setProjectType(e.target.value)} className="w-full border p-3 rounded">
          <option value="">Select Project Type</option>
          <option value="Deck">Deck</option>
          <option value="Fence">Fence</option>
          <option value="Both">Both</option>
        </select>{errors.project_type && <p className="text-red-500 text-sm">{errors.project_type.message}</p>}</div>

        {/* Deck Fields */}
        {(projectType === 'Deck' || projectType === 'Both') && (
          <div className="space-y-3">
            <input type="number" min="0" placeholder="Deck Square Footage" value={deckData.squareFootage} onKeyDown={e => e.key === '-' && e.preventDefault()} onChange={e => setDeckData({ ...deckData, squareFootage: e.target.value.replace(/-/g, '') })} className="w-full border p-3 rounded" />
            <input type="number" min="0" placeholder="Railing Length (ft)" value={deckData.railingFeet} onKeyDown={e => e.key === '-' && e.preventDefault()} onChange={e => setDeckData({ ...deckData, railingFeet: e.target.value.replace(/-/g, '') })} className="w-full border p-3 rounded" />
            <input type="number" min="0" placeholder="Number of Steps" value={deckData.steps} onKeyDown={e => e.key === '-' && e.preventDefault()} onChange={e => setDeckData({ ...deckData, steps: e.target.value.replace(/-/g, '') })} className="w-full border p-3 rounded" />
            <select value={deckData.deckAge} onChange={e => setDeckData({ ...deckData, deckAge: e.target.value })} className="w-full border p-3 rounded">
              <option value="">Select Deck Age</option>
              <option value="1-6 months">1–6 months</option>
              <option value="6-12 months">6–12 months</option>
              <option value="1-5 years">1–5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
            <select value={deckData.previousCoating} onChange={e => setDeckData({ ...deckData, previousCoating: e.target.value })} className="w-full border p-3 rounded">
              <option value="">Select Previous Coating</option>
              <option value="None">None</option>
              <option value="Paint">Paint</option>
              <option value="Stain">Stain</option>
            </select>
          </div>
        )}

        {/* Fence Fields */}
        {(projectType === 'Fence' || projectType === 'Both') && (
          <div className="space-y-3">
            <input type="number" min="0" placeholder="Linear Feet of Fence" value={fenceData.linearFeet} onKeyDown={e => e.key === '-' && e.preventDefault()} onChange={e => setFenceData({ ...fenceData, linearFeet: e.target.value.replace(/-/g, '') })} className="w-full border p-3 rounded" />
            <select
              value={fenceData.height}
              onChange={e => setFenceData({ ...fenceData, height: e.target.value })}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Fence Height (ft)</option>
              {[...Array(7)].map((_, i) => {
                const ft = i + 4;
                return <option key={ft} value={ft}>{ft} feet</option>;
              })}
            </select>

            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={fenceData.doubleSided} onChange={e => setFenceData({ ...fenceData, doubleSided: e.target.checked })} />
              <span>Double Sided?</span>
            </label>
            <select value={fenceData.fenceAge} onChange={e => setFenceData({ ...fenceData, fenceAge: e.target.value })} className="w-full border p-3 rounded">
              <option value="">Select Fence Age</option>
              <option value="1-6 months">1–6 months</option>
              <option value="6-12 months">6–12 months</option>
              <option value="1-5 years">1–5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
            <select value={fenceData.fenceCoating} onChange={e => setFenceData({ ...fenceData, fenceCoating: e.target.value })} className="w-full border p-3 rounded">
              <option value="">Select Previous Coating</option>
              <option value="None">None</option>
              <option value="Paint">Paint</option>
              <option value="Stain">Stain</option>
            </select>
          </div>
        )}

        {/* Additional Services */}
        <div className="space-y-2">
          <p className="font-semibold">Additional Services</p>
          {['Basic Wash', 'Deep Wash', 'Stripping'].map(service => (
            <label key={service} className="flex items-center space-x-2">
              <input type="checkbox" value={service} checked={services.includes(service)} onChange={e => {
                const { value, checked } = e.target;
                setServices(prev => checked ? [...prev, value] : prev.filter(s => s !== value));
              }} />
              <span>{service}</span>
            </label>
          ))}
        </div>

        {/* Photo Upload */}
        <div>
          <p className="font-semibold">Upload Photos (optional)</p>
          <input type="file" accept="image/*" multiple onChange={e => setPhotos(Array.from(e.target.files))} />
        </div>

        <button type="submit" className="w-full bg-[#4B3621] text-white p-3 rounded font-semibold">Get Estimate</button>
      </form>

      {submissionSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in-out">
          Estimate submitted successfully!
        </div>
      )}
    </div>
  );
}
