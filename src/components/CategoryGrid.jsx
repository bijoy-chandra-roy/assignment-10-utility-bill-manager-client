import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${  "https://assignment-10-utility-bill-manager.vercel.app"}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <section className="py-16 px-4 bg-base-200 text-base-content border-b border-base-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-base-content/10 pb-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Pay Your Utilities</h2>
            <p className="text-lg opacity-70">Select a service category to view or pay your pending bills instantly.</p>
          </div>
          <Link 
            to="/bills" 
            className="btn btn-primary text-white mt-4 md:mt-0 hover:scale-105 transition-transform"
          >
            View All Services
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={`/bills?category=${category.title}`}
              key={category._id}
              className="card bg-base-100 dark:bg-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 border-2 border-base-200 dark:border-base-content/10 hover:border-primary transition-all duration-300 group h-full"
            >
              <div className="card-body items-center text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary shadow-inner">
                  <img 
                      src={category.icon} 
                      alt={category.title} 
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 group-hover:text-white" // Added group-hover:text-white
                  />
                </div>
                <h3 className="card-title text-xl font-bold mb-2 group-hover:text-primary transition-colors">{category.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed group-hover:text-base-content/90">{category.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;