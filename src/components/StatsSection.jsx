import React from "react";
import { FaUsers, FaMoneyBillWave, FaHandshake } from "react-icons/fa";

const StatsSection = () => {
  return (
    <section className="py-12 bg-primary text-primary-content shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-around gap-8 text-center">
          
          <div className="flex flex-col items-center">
            <FaUsers className="text-5xl mb-2 opacity-90" />
            <h3 className="text-5xl font-extrabold">15k+</h3>
            <p className="text-sm font-medium uppercase tracking-wide opacity-80">Active Users</p>
          </div>

          <div className="flex flex-col items-center">
            <FaMoneyBillWave className="text-5xl mb-2 opacity-90" />
            <h3 className="text-5xl font-extrabold">৳50M+</h3>
            <p className="text-sm font-medium uppercase tracking-wide opacity-80">Processed</p>
          </div>

          <div className="flex flex-col items-center">
            <FaHandshake className="text-5xl mb-2 opacity-90" />
            <h3 className="text-5xl font-extrabold">20+</h3>
            <p className="text-sm font-medium uppercase tracking-wide opacity-80">Utility Partners</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;