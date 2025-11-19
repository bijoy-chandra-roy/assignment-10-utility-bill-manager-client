import React from 'react';
import { FaSearchDollar, FaShieldAlt, FaHistory } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col text-center w-full mb-10 border-b border-base-300 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            How It Works
          </h2>
          <p className="text-lg lg:w-2/3 mx-auto">
            Pay your bills in just 3 simple and secure steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="card border-2 p-8">
            <div className="flex justify-center mb-4">
              <span className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <FaSearchDollar className="w-10 h-10 text-blue-600" />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">1. Find Your Bill</h3>
            <p>
              Browse all available bills or use the search and filter to find
              a specific bill you need to pay.
            </p>
          </div>

          <div className="card border-2 p-8">
            <div className="flex justify-center mb-4">
              <span className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <FaShieldAlt className="w-10 h-10 text-blue-600" />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">2. Pay Securely</h3>
            <p>
              Pay for your current month's bill using our secure payment
              modal. We protect your data.
            </p>
          </div>

          <div className="card border-2 p-8">
            <div className="flex justify-center mb-4">
              <span className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <FaHistory className="w-10 h-10 text-blue-600" />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">3. Track History</h3>
            <p>
              All your paid bills are saved in your 'My Pay Bills' dashboard
              where you can download a PDF report.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;