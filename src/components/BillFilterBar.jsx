import { useState} from "react";

const BillFilterBar = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter(value); // Notify parent of filter change
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <label className="font-semibold">Filter by Category:</label>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="p-2 border rounded"
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
