import React from "react";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="bg-blue-600 text-white py-12 px-4 text-center mt-12">
      <h3 className="text-3xl font-bold mb-4">
        Simplify Your Utility Payments Today
      </h3>
      <p className="mb-6 text-lg">
        Manage all your electricity, gas, water, and internet bills in one place.
      </p>
      <Link
        to="/bills"
        className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition transition-transform transform hover:scale-105"
      >
        Pay Your Bills Now
      </Link>
    </section>
  );
};

export default CallToAction;
