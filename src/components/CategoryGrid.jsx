import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-base-300 pb-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Pay Your Utilities</h2>
            <p className="text-base-content/70 text-lg">Select a service category to view or pay your pending bills instantly.</p>
          </div>
          <Link to="/bills" className="btn btn-outline mt-4 md:mt-0">View All Services</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={`/bills?category=${category.title}`}
              key={category._id}
              className="card bg-base-300 dark:bg-gray-800 hover:border-primary hover:-translate-y-1 transition-all duration-300 group h-full"
            >
              <div className="card-body items-center text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-base-200/50 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                  <img 
                      src={category.icon} 
                      alt={category.title} 
                      // Removed brightness/invert filters. Added scale transform.
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <h3 className="card-title text-xl font-bold mb-2 group-hover:text-primary transition-colors">{category.title}</h3>
                <p className="text-sm text-base-content/70 leading-relaxed">{category.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;