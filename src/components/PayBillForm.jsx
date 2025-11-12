import React, { useState } from "react";

const PayBillForm = ({ onAddBill, categories }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    const newPayment = { title, amount: parseFloat(amount), category };

    try {
      const res = await fetch("http://localhost:3000/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayment),
      });

      const data = await res.json();

      if (data.insertedId) {
        newPayment._id = data.insertedId;
        onAddBill(newPayment);
        setTitle("");
        setAmount("");
        setCategory("");
      }
    } catch (err) {
      console.error("Failed to add bill:", err);
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Pay a Bill</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <input
          type="text"
          name="title"
          placeholder="Bill Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
          {categories.map((category) => (
            <option key={category._id} value={category.title}>{category.title}</option>
          ))}
        </select>
        <button
          type="submit"
          className="p-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PayBillForm;
