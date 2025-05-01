// src/pages/admin/Dashboard.jsx
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-[#4B3621]">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Link
          to="/admin/quotes"
          className="block bg-white border rounded-xl p-6 shadow hover:shadow-md hover:bg-gray-50 transition"
        >
          <h2 className="text-2xl font-semibold mb-2">📋 Manage Quotes</h2>
          <p>View, edit, mark paid, and delete customer quotes.</p>
        </Link>

        <Link
          to="/admin/pricing"
          className="block bg-white border rounded-xl p-6 shadow hover:shadow-md hover:bg-gray-50 transition"
        >
          <h2 className="text-2xl font-semibold mb-2">💰 Edit Pricing Formulas</h2>
          <p>Update the cost formulas used in quote generation.</p>
        </Link>
      </div>
    </div>
  );
}
