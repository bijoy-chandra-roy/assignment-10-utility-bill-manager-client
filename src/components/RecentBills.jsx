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
    <section className="py-16 px-4 border-t border-base-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-base-300 pb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recent Bills</h2>
            <p className="text-base-content/70">Track your latest utility payments.</p>
          </div>
          <Link to="/bills" className="btn btn-outline mt-4 md:mt-0">View All Bills</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="card light:bg-base-100 dark:bg-gray-800 border border-base-300 hover:border-blue-600 hover:-translate-y-1 transition-all duration-300 group"
            >
              <figure className="px-4 pt-4 relative h-52">
                <img
                  src={bill.image || "https://via.placeholder.com/150"}
                  alt={bill.title}
                  className="rounded-xl w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6 badge badge-neutral font-medium shadow-sm">
                  {bill.category}
                </div>
              </figure>

              <div className="card-body p-6">
                <h4 className="card-title text-lg font-bold mb-1 truncate" title={bill.title}>
                  {bill.title}
                </h4>
                
                <div className="space-y-2 text-sm text-base-content/70 mb-4">
                  <div className="flex justify-between border-b border-base-200 pb-1">
                    <span>Location</span>
                    <span className="font-medium text-base-content">{bill.location || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-base-200 pb-1">
                    <span>Date</span>
                    <span className="font-medium text-base-content">{new Date(bill.date).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-xs font-bold opacity-50 uppercase">Amount</p>
                    <p className="text-2xl font-bold text-blue-600">৳{bill.amount}</p>
                  </div>
                  <Link
                    to={`/bills/${bill._id}`}
                    className="btn btn-sm btn-primary bg-blue-600"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBills;