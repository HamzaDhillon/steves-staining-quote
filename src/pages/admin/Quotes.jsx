// src/pages/admin/Quotes.jsx
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import QuoteModal from "../../components/QuoteModal";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Quotes() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) navigate("/admin/login");
  }, [navigate]);

  const [quotes, setQuotes] = useState([]);
  const [quoteToEdit, setQuoteToEdit] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchQuotes = useCallback(async () => {
    let query = supabase.from("quotes").select("*");
    if (statusFilter) query = query.eq("status", statusFilter);
    const { data, error } = await query.order(sortField, {
      ascending: sortOrder === "asc",
    });
    if (error) console.error("Fetch error:", error.message);
    else setQuotes(data);
  }, [sortField, sortOrder, statusFilter]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleAdd = async (data) => {
    await supabase.from("quotes").insert([{ ...data, status: "Pending" }]);
    setShowAddForm(false);
    fetchQuotes();
    toast.success("Estimate added successfully.");
  };

  const handleEdit = async (data) => {
    await supabase.from("quotes").update({ ...data }).eq("id", quoteToEdit.id);
    setQuoteToEdit(null);
    fetchQuotes();
    toast.success("Estimate updated successfully.");
  };

  const deleteQuote = async (id, fullName, estimateNumber) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the estimate #${estimateNumber} for ${fullName}?`);
    if (!confirmDelete) return;

    const { error } = await supabase.from("quotes").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete the estimate.");
      return;
    }

    const { data } = await supabase.from("quotes").select("*").order(sortField, { ascending: sortOrder === "asc" });
    setQuotes(data);

    toast.success(`Estimate #${estimateNumber} for ${fullName} was deleted.`);
  };

  const togglePaidStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Paid" ? "Pending" : "Paid";
    await supabase.from("quotes").update({ status: newStatus }).eq("id", id);
    const { data, error } = await supabase.from("quotes").select("*").order(sortField, { ascending: sortOrder === "asc" });
    if (!error) setQuotes(data);
  };

  const filteredQuotes = quotes.filter((q) =>
    q.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.estimate_number?.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-6 py-10 pt-24 max-w-screen-xl">
      <QuoteModal isOpen={showAddForm} onClose={() => setShowAddForm(false)} onSubmit={handleAdd} />
      <QuoteModal
        isOpen={!!quoteToEdit}
        onClose={() => setQuoteToEdit(null)}
        onSubmit={handleEdit}
        initialData={quoteToEdit}
        isEditing
      />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-[#4B3621]">All Estimates</h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-[#4B3621] text-white px-4 py-2 rounded-full hover:bg-[#3a2b1a] transition"
          >
            + New Estimate
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by name or estimate #..."
          className="border border-gray-300 p-3 rounded-md w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-[#f4f4f4] text-left text-sm font-semibold text-gray-600">
            <tr>
              <th className="p-4">Estimate #</th>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Email</th>
              <th className="p-4">Total</th>
              <th className="p-4">
                <div className="flex flex-col">
                  <span>Status</span>
                  <select
                    className="mt-1 text-sm border-gray-300 rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </th>
              <th className="p-4 text-right">
                <div className="flex flex-col items-end">
                  <span>Sort</span>
                  <select
                    className="mt-1 text-sm border-gray-300 rounded-md"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                  >
                    <option value="created_at">Date</option>
                    <option value="estimate_number">Estimate #</option>
                    <option value="total">Total</option>
                    <option value="status">Status</option>
                  </select>
                  <select
                    className="mt-1 text-sm border-gray-300 rounded-md"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {filteredQuotes.map((quote) => (
              <tr key={quote.id}>
                <td className="p-4 font-mono">{quote.estimate_number}</td>
                <td className="p-4">{new Date(quote.created_at).toLocaleDateString()}</td>
                <td className="p-4">{quote.full_name}</td>
                <td className="p-4">{quote.email}</td>
                <td className="p-4">${quote.total?.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${quote.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {quote.status}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2 flex-wrap">
                  <button
                    onClick={() => togglePaidStatus(quote.id, quote.status)}
                    className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  >
                    {quote.status === "Paid" ? "Mark Unpaid" : "Mark Paid"}
                  </button>
                  <Link
                    to={`/admin/quotes/${quote.id}`}
                    className="text-xs bg-[#4B3621] text-white hover:bg-[#3a2b1a] px-3 py-1 rounded"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/quotes/edit/${quote.id}`}
                    className="text-xs bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteQuote(quote.id, quote.full_name, quote.estimate_number)}
                    className="text-xs bg-red-600 text-white hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
