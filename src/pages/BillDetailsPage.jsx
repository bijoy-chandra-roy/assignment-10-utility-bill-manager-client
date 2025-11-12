import React from "react";
import { useLoaderData, Link } from "react-router";

const BillDetailsPage = () => {
  const bill = useLoaderData();

  if (!bill || !bill._id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Bill not found</h2>
        <Link
          to="/bills"
          className="px-6 py-3 bg-primary text-white rounded hover:bg-gray-800 transition"
        >
          Back to Bills
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Bill Details</h2>

      <div className="border rounded-lg p-6 shadow-md bg-black flex flex-col gap-4">
        <img
          src={bill.image || "https://via.placeholder.com/300"}
          alt={bill.title}
          className="w-full h-64 object-cover rounded"
        />

        <div>
          <p><strong>Title:</strong> {bill.title}</p>
          <p><strong>Amount:</strong> ${bill.amount}</p>
          <p><strong>Category:</strong> {bill.category}</p>
          <p><strong>Location:</strong> {bill.location || "N/A"}</p>
          <p><strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}</p>
          <p><strong>ID:</strong> {bill._id}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <Link
            to="/bills"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Back to Bills
          </Link>
          <Link
            to={`/update/${bill._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit Bill
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BillDetailsPage;
