import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";

const Update = () => {
  const initialBill = useLoaderData();
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialBill.title || "");
  const [amount, setAmount] = useState(initialBill.amount || "");
  const [category, setCategory] = useState(initialBill.category || "");
  const [categories, setCategories] = useState([]);

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category) return;

    const updatedFields = {
      title,
      amount: parseFloat(amount),
      category,
    };

    try {
      const res = await fetch(`http://localhost:3000/bills/${initialBill._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      const data = await res.json();

      if (data.modifiedCount || data.updated) {
        navigate("/bills"); // Redirect to Bills page after update
      } else {
        console.error("Update failed", data);
      }
    } catch (err) {
      console.error("Error updating bill:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Update Bill</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bill Title"
          className="p-3 border rounded"
          required
        />
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="p-3 border rounded"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="p-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
        >
          Update Bill
        </button>
      </form>
    </div>
  );
};

export default Update;
