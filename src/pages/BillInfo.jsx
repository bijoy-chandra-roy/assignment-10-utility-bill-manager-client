import React from "react";
import { useLoaderData, Link } from "react-router";

const BillInfo = () => {
  const bill = useLoaderData();

  if (!bill || !bill._id) {
    return <h2>Bill not found</h2>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Bill Details</h2>
      <div className="border p-4 rounded-md shadow-sm bg-black-50">
        <p><strong>ID:</strong> {bill._id}</p>
        <p><strong>Title:</strong> {bill.title}</p>
        <p><strong>Amount:</strong> ${bill.amount}</p>
      </div>

      <Link to="/bills" className="inline-block mt-6 text-blue-600 underline">
        Back to Bills
      </Link>
    </div>
  );
};

export default BillInfo;
