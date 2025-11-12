import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        console.log(data);
      });
  }, []);

  return (
    <section className="py-8">
      <h3 className="text-2xl font-semibold mb-6">Pay Your Utilities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex flex-col items-start gap-4 p-5 border rounded-lg hover:shadow-md transition"
          >
            <img src={category.icon} alt={category.title} className="w-8 h-8" />
            <h4 className="text-lg font-medium">{category.title}</h4>
            <p className="text-sm text-gray-600">{category.desc}</p>
            <div className="mt-auto">
              <Link
                to={`/bills?category=${category.slug}`}
                className="inline-block px-4 py-2 border rounded text-sm"
              >
                View Bills
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
