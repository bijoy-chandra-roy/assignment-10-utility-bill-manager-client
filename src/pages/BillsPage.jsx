import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import BillsList from "../components/BillsList";
import BillFilterBar from "../components/BillFilterBar";
import BillSearch from "../components/BillSearch";

const BillsPage = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "UtilityHub - Bills";

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const initialBills = useLoaderData();
  const [bills, setBills] = useState(initialBills);
  const [categories, setCategories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const params = new URLSearchParams();
        if (searchQuery) {
          params.append('search', searchQuery);
        }
        if (categoryQuery) {
          params.append('category', categoryQuery);
        }

        const res = await fetch(`http://localhost:3000/bills?${params.toString()}`);
        const data = await res.json();
        setBills(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBills();
  }, [searchQuery, categoryQuery]);

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

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <BillSearch onSearch={setSearchQuery} />
        <BillFilterBar categories={categories} onFilter={setCategoryQuery} />
      </div>

      <BillsList bills={bills} onDelete={handleDelete} />
    </div>
  );
};

export default BillsPage;