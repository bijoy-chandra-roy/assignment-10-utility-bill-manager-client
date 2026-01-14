import { useLoaderData, useSearchParams } from "react-router";
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
  const [searchParams] = useSearchParams();
  const [bills, setBills] = useState(initialBills);
  const [categories, setCategories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState(searchParams.get("category") || "");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${  "http://localhost:3000"}/categories`);
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

        const res = await fetch(`${  "http://localhost:3000"}/bills?${params.toString()}`);
        const data = await res.json();
        setBills(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBills();
  }, [searchQuery, categoryQuery]);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <BillSearch onSearch={setSearchQuery} />
        <BillFilterBar 
          categories={categories} 
          onFilter={setCategoryQuery} 
          initialCategory={categoryQuery}
        />
      </div>

      <BillsList bills={bills} />
    </div>
  );
};

export default BillsPage;