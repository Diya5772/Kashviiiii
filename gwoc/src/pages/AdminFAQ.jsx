import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/faq/all");
      setFaqs(res.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
    setLoading(false);
  };

  const handleAddFAQ = async () => {
    if (!newFAQ.question || !newFAQ.answer) return;
    await axios.post("http://localhost:5000/api/faq/add", newFAQ);
    setNewFAQ({ question: "", answer: "" });
    fetchFAQs();
  };

  const handleDeleteFAQ = async (id) => {
    await axios.delete(`http://localhost:5000/api/faq/delete/${id}`);
    fetchFAQs();
  };

  const handleEditFAQ = async () => {
    if (editingFAQ) {
      await axios.put(`http://localhost:5000/api/faq/edit/${editingFAQ._id}`, editingFAQ);
      setEditingFAQ(null);
      fetchFAQs();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin FAQ Panel</h1>
      <div className="mt-4">
        <input type="text" placeholder="Question" value={newFAQ.question} onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })} className="border p-2 w-full mb-2" />
        <textarea placeholder="Answer" value={newFAQ.answer} onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })} className="border p-2 w-full mb-2" />
        <button onClick={handleAddFAQ} className="bg-blue-500 text-white px-6 py-2 rounded">Add FAQ</button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Existing FAQs</h2>
        {loading ? (
          <p>Loading FAQs...</p>
        ) : faqs.length === 0 ? (
          <p>No FAQs available.</p>
        ) : (
          faqs.map((faq) => (
            <div key={faq._id} className="border p-4 mt-2 rounded-lg shadow">
              {editingFAQ && editingFAQ._id === faq._id ? (
                <>
                  <input type="text" value={editingFAQ.question} onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })} className="border p-2 w-full mb-2" />
                  <textarea value={editingFAQ.answer} onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })} className="border p-2 w-full mb-2" />
                  <button onClick={handleEditFAQ} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                  <button onClick={() => setEditingFAQ(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{faq.question}</h3>
                  <p>{faq.answer}</p>
                  <div className="mt-2">
                    <button onClick={() => setEditingFAQ(faq)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                    <button onClick={() => handleDeleteFAQ(faq._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFAQ;
