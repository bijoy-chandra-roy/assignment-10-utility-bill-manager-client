import { useState, useEffect } from "react";

const BillFilterBar = ({ categories, onFilter, initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter(value);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
      <label className="font-semibold text-base-content">Filter by Category:</label>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="select select-bordered select-primary w-full md:w-auto bg-base-100 text-base-content"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category.title}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BillFilterBar;