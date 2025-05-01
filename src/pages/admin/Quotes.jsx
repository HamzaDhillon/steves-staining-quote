import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import QuoteModal from '../../components/QuoteModal';

export default function Quotes() {
    const [quotes, setQuotes] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [quoteToEdit, setQuoteToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });

        if (error) console.error(error);
        else setQuotes(data);
    };

    const deleteQuote = async (id) => {
        await supabase.from('quotes').delete().eq('id', id);
        fetchQuotes(); // Refresh after delete
    };

    const markAsPaid = async (id) => {
        await supabase.from('quotes').update({ status: 'Paid' }).eq('id', id);
        fetchQuotes();
    };

    const handleAdd = async (data) => {
        await supabase.from('quotes').insert([{ ...data, status: 'Pending' }]);
        setShowAddForm(false);
        fetchQuotes();
    };

    const handleEdit = async (data) => {
        await supabase.from('quotes').update({ ...data }).eq('id', quoteToEdit.id);
        setQuoteToEdit(null);
        setIsEditing(false);
        fetchQuotes();
    };


    return (


        <div className="container mx-auto p-8">

            {/* Add Modal */}
            <QuoteModal
                isOpen={showAddForm}
                onClose={() => setShowAddForm(false)}
                onSubmit={handleAdd}
            />

            {/* Edit Modal */}
            <QuoteModal
                isOpen={!!quoteToEdit}
                onClose={() => setQuoteToEdit(null)}
                onSubmit={handleEdit}
                initialData={quoteToEdit}
                isEditing
            />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">All Quotes</h1>
                <button onClick={() => setShowAddForm(true)} className="bg-[#4B3621] text-white px-4 py-2 rounded">
                    + Add New Quote
                </button>
            </div>

            <table className="w-full text-left border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map((quote) => (
                        <tr key={quote.id} className="border-t">
                            <td className="p-4">{new Date(quote.created_at).toLocaleDateString()}</td>
                            <td className="p-4">{quote.full_name}</td>
                            <td className="p-4">{quote.email}</td>
                            <td className="p-4">${quote.total.toFixed(2)}</td>
                            <td className="p-4">{quote.status}</td>

                            <td className="p-4 flex gap-2 flex-wrap">
                                <button onClick={() => markAsPaid(quote.id)} className="bg-green-600 text-white px-3 py-1 rounded">Mark Paid</button>
                                <button onClick={() => handleEdit(quote)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                                {/* <button onClick={() => handleResend(quote)} className="bg-yellow-500 text-white px-3 py-1 rounded">Resend</button> */}
                                <button onClick={() => deleteQuote(quote.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
