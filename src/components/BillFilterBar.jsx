import { useState } from "react";

const BillFilterBar = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter(value);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
      <label className="font-semibold">Filter by Category:</label>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="select select-bordered bg-blue-600 text-white w-full md:w-auto"
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