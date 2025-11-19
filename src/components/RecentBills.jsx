import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const RecentBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/bills?limit=6`)
      .then((res) => res.json())
      .then((data) => setBills(data));
  }, []);

  return (
    <section className="py-16 px-4 bg-base-200 border-t border-base-300">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-base-content/10 pb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-base-content">Recent Bills</h2>
            <p className="text-base-content/70">Track your latest utility payments.</p>
          </div>
          <Link 
            to="/bills" 
            className="btn btn-primary text-white mt-4 md:mt-0 hover:scale-105 transition-transform"
          >
            View All Bills
          </Link>
        </div>

        {/* Grid Section - Exact style from BillsList */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="card bg-base-100 dark:bg-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-2 border border-base-200 dark:border-base-content/10 hover:border-primary transition-all duration-300 cursor-pointer"
            >
              <figure>
                <img
                  src={bill.image || "https://via.placeholder.com/150"}
                  alt={bill.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-base-content">
                  {bill.title}
                  <div className="badge badge-neutral">{bill.category}</div>
                </h2>

                <div className="text-sm text-base-content/70 space-y-1 my-2">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium text-base-content">{bill.location || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium text-base-content">
                      {new Date(bill.date).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>

                <div className="card-actions justify-between items-center mt-2">
                  <div className="text-2xl font-bold text-primary">
                    ৳{bill.amount}
                  </div>
                  <Link
                    to={`/bills/${bill._id}`}
                    className="btn btn-primary text-white btn-sm hover:scale-105"
                  >
                    See Details
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