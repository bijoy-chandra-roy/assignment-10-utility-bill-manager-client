import React from 'react';
import { FaSearchDollar, FaShieldAlt, FaHistory } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-base-200 text-base-content">
      <div className="container mx-auto">
        <div className="flex flex-col text-center w-full mb-12 border-b border-base-content/10 pb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg opacity-70 lg:w-2/3 mx-auto">
            Pay your bills in just 3 simple and secure steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div className="card bg-base-100 dark:bg-base-300 shadow-lg border border-base-200 dark:border-base-content/10 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <span className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-inner">
                <FaSearchDollar className="w-10 h-10 text-primary" />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">1. Find Your Bill</h3>
            <p className="text-base-content/70 leading-relaxed">
              Browse all available bills or use the search and filter to find
              a specific bill you need to pay.
            </p>
          </div>

          <div className="card bg-base-100 dark:bg-base-300 shadow-lg border border-base-200 dark:border-base-content/10 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <span className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-inner">
                <FaShieldAlt className="w-10 h-10 text-primary" />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">2. Pay Securely</h3>
            <p className="text-base-content/70 leading-relaxed">
              Pay for your current month's bill using our secure payment
              modal. We protect your data.
            </p>
          </div>

          <div className="card bg-base-100 dark:bg-base-300 shadow-lg border border-base-200 dark:border-base-content/10 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <span className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-inner">
                <FaHistory className="w-10 h-10 text-primary" />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">3. Track History</h3>
            <p className="text-base-content/70 leading-relaxed">
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