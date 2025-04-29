// src/components/EstimateForm.jsx
export default function EstimateForm() {
    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Deck Estimate</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Square Foot (350)" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Railing Length Feet (24)" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Steps (4)" className="w-full border p-2 rounded" />
          <div className="mt-4">
            <label className="block font-medium mb-1">Deck Age</label>
            <div className="flex flex-col">
              <label><input type="checkbox" /> New</label>
              <label><input type="checkbox" /> 6-12 Months</label>
              <label><input type="checkbox" /> 12-36 Months</label>
            </div>
          </div>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded mt-4">Submit</button>
        </form>
      </div>
    );
  }