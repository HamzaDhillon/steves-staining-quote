// src/pages/Quote.jsx
import { useState } from 'react';
import { jsPDF } from "jspdf";

export default function Quote() {
  const [projectType, setProjectType] = useState('');
  const [deckData, setDeckData] = useState({ squareFootage: '', railingFeet: '', steps: '' });
  const [fenceData, setFenceData] = useState({ linearFeet: '', height: '', doubleSided: false });
  const [services, setServices] = useState([]);
  const [photos, setPhotos] = useState([]);

  const handleServiceChange = (service) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 photos
    setPhotos(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pricing Variables
    let total = 0;
    let deckPrice = 0;
    let fencePrice = 0;
    let washPrice = 0;

    // Deck Calculation
    if (projectType === 'Deck' || projectType === 'Both') {
      deckPrice =
        (parseFloat(deckData.squareFootage || 0) * 3) +
        (parseFloat(deckData.railingFeet || 0) * 6) +
        (parseFloat(deckData.steps || 0) * 8);
    }

    // Fence Calculation
    if (projectType === 'Fence' || projectType === 'Both') {
      let pricePerFoot = 0;
      switch (fenceData.height) {
        case "4": pricePerFoot = 4; break;
        case "5": pricePerFoot = 5; break;
        case "6": pricePerFoot = 6; break;
        case "7": pricePerFoot = 7; break;
        case "8": pricePerFoot = 8; break;
        case "9": pricePerFoot = 9; break;
        case "10": pricePerFoot = 10; break;
        default: pricePerFoot = 0;
      }
      fencePrice = (parseFloat(fenceData.linearFeet || 0) * pricePerFoot);
      if (fenceData.doubleSided) {
        fencePrice *= 2;
      }
    }

    // Wash Services
    services.forEach(service => {
      if (service === "Basic Wash") {
        washPrice += parseFloat(deckData.squareFootage || 0) * 3;
      }
      if (service === "Deep Wash") {
        washPrice += parseFloat(deckData.squareFootage || 0) * 5;
      }
      if (service === "Stripping") {
        washPrice += parseFloat(deckData.squareFootage || 0) * 10;
      }
    });

    const subtotal = deckPrice + fencePrice + washPrice;
    const tax = subtotal * 0.15;
    total = subtotal + tax;

    // Console Log (optional)
    console.log("Deck: $" + deckPrice.toFixed(2));
    console.log("Fence: $" + fencePrice.toFixed(2));
    console.log("Wash: $" + washPrice.toFixed(2));
    console.log("Subtotal: $" + subtotal.toFixed(2));
    console.log("Tax (15%): $" + tax.toFixed(2));
    console.log("Total: $" + total.toFixed(2));

    // ✨ PDF Generation
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor("#4B3621");
    doc.text("Quote Summary", 20, 20);

    doc.setFontSize(12);
    doc.setTextColor("#000000");

    let y = 40;

    doc.text(`Deck Staining: $${deckPrice.toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Fence Staining: $${fencePrice.toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Washing Services: $${washPrice.toFixed(2)}`, 20, y);
    y += 10;
    doc.line(20, y, 190, y); // horizontal line
    y += 10;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Tax (15%): $${tax.toFixed(2)}`, 20, y);
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor("#4B3621");
    doc.text(`Total: $${total.toFixed(2)}`, 20, y);

    // Footer
    y += 20;
    doc.setFontSize(10);
    doc.setTextColor("#666666");
    doc.text("Thank you for choosing Steve’s Staining Services!", 20, y);

    // Save PDF
    doc.save("Quote.pdf");
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#4B3621]">Get Your Instant Quote</h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-lg">

        {/* Customer Info */}
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full border p-3 rounded" required />
          <input type="email" placeholder="Email Address" className="w-full border p-3 rounded" required />
          <input type="text" placeholder="Phone Number" className="w-full border p-3 rounded" required />
          <input type="text" placeholder="Address" className="w-full border p-3 rounded" required />
        </div>

        {/* Project Type */}
        <div className="space-y-2">
          <label className="block font-semibold">Project Type:</label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">Select...</option>
            <option value="Deck">Deck</option>
            <option value="Fence">Fence</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Deck Details */}
        {(projectType === 'Deck' || projectType === 'Both') && (
          <div className="space-y-2">
            <label className="block font-semibold">Deck Details:</label>
            <input
              type="number"
              placeholder="Total Square Footage"
              value={deckData.squareFootage}
              onChange={(e) => setDeckData({ ...deckData, squareFootage: e.target.value })}
              className="w-full border p-3 rounded"
            />
            <input
              type="number"
              placeholder="Total Railing Length (ft)"
              value={deckData.railingFeet}
              onChange={(e) => setDeckData({ ...deckData, railingFeet: e.target.value })}
              className="w-full border p-3 rounded"
            />
            <input
              type="number"
              placeholder="Total Number of Steps"
              value={deckData.steps}
              onChange={(e) => setDeckData({ ...deckData, steps: e.target.value })}
              className="w-full border p-3 rounded"
            />
          </div>
        )}

        {/* Fence Details */}
        {(projectType === 'Fence' || projectType === 'Both') && (
          <div className="space-y-2">
            <label className="block font-semibold">Fence Details:</label>
            <input
              type="number"
              placeholder="Total Linear Feet"
              value={fenceData.linearFeet}
              onChange={(e) => setFenceData({ ...fenceData, linearFeet: e.target.value })}
              className="w-full border p-3 rounded"
            />
            <select
              value={fenceData.height}
              onChange={(e) => setFenceData({ ...fenceData, height: e.target.value })}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Fence Height</option>
              <option value="4">4 Feet</option>
              <option value="5">5 Feet</option>
              <option value="6">6 Feet</option>
              <option value="7">7 Feet</option>
              <option value="8">8 Feet</option>
              <option value="9">9 Feet</option>
              <option value="10">10 Feet</option>
            </select>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={fenceData.doubleSided}
                onChange={(e) => setFenceData({ ...fenceData, doubleSided: e.target.checked })}
              />
              <label>Double Sided Staining?</label>
            </div>
          </div>
        )}

        {/* Services */}
        <div className="space-y-2">
          <label className="block font-semibold">Additional Services:</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={() => handleServiceChange('Basic Wash')} />
              Basic Wash
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={() => handleServiceChange('Deep Wash')} />
              Deep Wash
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={() => handleServiceChange('Stripping')} />
              Stripping
            </label>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="block font-semibold">Upload Photos (max 5):</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-4 px-6 rounded-full text-lg"
        >
          Get My Instant Quote
        </button>

      </form>
    </div>
  );
}
