import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const RecentBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/bills?limit=6")
      .then(res => res.json())
      .then(data => setBills(data));
  }, []);

  return (
    <section className="py-8">
      <h3 className="text-2xl font-semibold mb-6">Recent Bills</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bills.map(bill => (
          <div key={bill._id} className="border rounded-lg p-4 flex flex-col gap-3 hover:shadow-md transition">
            <img
              src={bill.image || "https://via.placeholder.com/150"}
              alt={bill.title}
              className="w-full h-32 object-cover rounded"
            />
            <h4 className="text-lg font-medium">{bill.title}</h4>
            <p className="text-sm text-gray-600">Category: {bill.category}</p>
            <p className="text-sm text-gray-600">Location: {bill.location || "N/A"}</p>
            <p className="text-sm text-gray-600">Date: {new Date(bill.date).toLocaleDateString()}</p>
            <p className="text-sm font-semibold">Amount: ${bill.amount}</p>
            <Link
              to={`/bills/${bill._id}`}
              className="inline-block mt-auto px-4 py-2 border rounded text-sm text-center"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentBills;
