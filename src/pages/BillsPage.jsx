import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import BillsList from "../components/BillsList";
import BillFilterBar from "../components/BillFilterBar";
import DownloadReportButton from "../components/DownloadReportButton";

const BillsPage = () => {
  const initialBills = useLoaderData();
  const [bills, setBills] = useState(initialBills);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch categories for the filter dropdown
  useEffect(() => {
    const fetchBills = async () => {
      try {
        let url = `http://localhost:3000/bills?`;
        if (search) url += `search=${search}&`;

        const res = await fetch(url);
        const data = await res.json();
        setBills(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBills();
  }, [search]);

  // Delete a bill
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/bills/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount) {
        setBills((prev) => prev.filter((bill) => bill._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete bill:", err);
    }
  };

  // Filter bills by category
  const handleFilter = async (category) => {
    try {
      let url = `http://localhost:3000/bills?`;
      if (category) url += `category=${category}`;

      const res = await fetch(url);
      const data = await res.json();
      setBills(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search bills by title..."
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <BillFilterBar categories={categories} onFilter={handleFilter} />
      <BillsList bills={bills} onDelete={handleDelete} />
      <div className="mt-6">
        <DownloadReportButton bills={bills}></DownloadReportButton>
      </div>
    </div>
  );
};

export default BillsPage;
