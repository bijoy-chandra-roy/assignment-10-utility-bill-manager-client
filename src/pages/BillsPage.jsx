import { useLoaderData, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaSortAmountDown, FaDollarSign, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BillsList from "../components/BillsList";

const BillsPage = () => {
    useEffect(() => {
        document.title = "UtilityHub - Bills";
    }, []);

    const loaderData = useLoaderData();
    const initialBills = loaderData.bills || (Array.isArray(loaderData) ? loaderData : []);
    const initialTotalPages = loaderData.totalPages || 1;

    const [searchParams, setSearchParams] = useSearchParams();
    const [bills, setBills] = useState(initialBills);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [categoryQuery, setCategoryQuery] = useState(searchParams.get("category") || "");
    const [sortOrder, setSortOrder] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages);

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
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchQuery) params.append('search', searchQuery);
                if (categoryQuery) params.append('category', categoryQuery);
                if (sortOrder) params.append('sort', sortOrder);
                if (minPrice) params.append('minPrice', minPrice);
                if (maxPrice) params.append('maxPrice', maxPrice);

                params.append('page', page);
                params.append('limit', 8);

                if (categoryQuery) setSearchParams({ category: categoryQuery });

                const res = await fetch(`http://localhost:3000/bills?${params.toString()}`);
                const data = await res.json();

                if (data.bills) {
                    setBills(data.bills);
                    setTotalPages(data.totalPages);
                } else {
                    setBills(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(() => {
            fetchBills();
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchQuery, categoryQuery, sortOrder, minPrice, maxPrice, page]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, categoryQuery, sortOrder, minPrice, maxPrice]);

    return (
        <div className="container mx-auto p-4 min-h-screen">

            <div className="bg-base-100 dark:bg-base-300 p-4 rounded-xl shadow-sm border border-base-200 dark:border-base-content/10 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none z-10" />
                        <input
                            type="text"
                            placeholder="Search bills..."
                            className="input input-bordered input-primary w-full pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">

                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className={`btn btn-circle btn-ghost border border-base-200 dark:border-base-content/10 ${categoryQuery ? 'text-primary bg-primary/10 border-primary' : ''}`}
                                title="Filter Category"
                            >
                                <FaFilter />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-200 max-h-60 overflow-y-auto">
                                <li className="menu-title px-4 py-2 opacity-50">Category</li>
                                <li><a onClick={() => setCategoryQuery('')} className={!categoryQuery ? 'active font-bold' : ''}>All Categories</a></li>
                                {categories.map((cat) => (
                                    <li key={cat._id}>
                                        <a onClick={() => setCategoryQuery(cat.title)} className={categoryQuery === cat.title ? 'active font-bold' : ''}>
                                            {cat.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className={`btn btn-circle btn-ghost border border-base-200 dark:border-base-content/10 ${minPrice || maxPrice ? 'text-primary bg-primary/10 border-primary' : ''}`}
                                title="Price Range"
                            >
                                <FaDollarSign />
                            </div>
                            <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow-lg bg-base-100 border border-base-200">
                                <div className="card-body">
                                    <h3 className="card-title text-sm opacity-70">Price Range</h3>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="input input-bordered input-sm w-full"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                        />
                                        <span className="font-bold">-</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="input input-bordered input-sm w-full"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                        />
                                    </div>
                                    {(minPrice || maxPrice) && (
                                        <button
                                            onClick={() => { setMinPrice(''); setMaxPrice('') }}
                                            className="btn btn-xs btn-ghost text-error mt-2 w-full"
                                        >
                                            Clear Filter
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className={`btn btn-circle btn-ghost border border-base-200 dark:border-base-content/10 ${sortOrder ? 'text-primary bg-primary/10 border-primary' : ''}`}
                                title="Sort Order"
                            >
                                <FaSortAmountDown className={sortOrder ? 'text-primary' : ''} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200">
                                <li className="menu-title px-4 py-2 opacity-50">Sort By</li>
                                <li><a onClick={() => setSortOrder('date_desc')} className={sortOrder === 'date_desc' ? 'active' : ''}>Newest First</a></li>
                                <li><a onClick={() => setSortOrder('date_asc')} className={sortOrder === 'date_asc' ? 'active' : ''}>Oldest First</a></li>
                                <li><a onClick={() => setSortOrder('price_asc')} className={sortOrder === 'price_asc' ? 'active' : ''}>Price: Low to High</a></li>
                                <li><a onClick={() => setSortOrder('price_desc')} className={sortOrder === 'price_desc' ? 'active' : ''}>Price: High to Low</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <BillsList bills={bills} loading={loading} />

            {!loading && totalPages > 1 && (
                <div className="flex justify-center mt-10 mb-6">
                    <div className="join border border-base-300 bg-base-100 shadow-sm">
                        <button
                            className="join-item btn btn-md bg-base-100 border-none hover:bg-base-200"
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                        >
                            <FaChevronLeft />
                        </button>

                        {[...Array(totalPages).keys()].map((num) => {
                            const pageNum = num + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    className={`join-item btn btn-md border-none hover:bg-base-200 ${page === pageNum ? 'btn-active btn-primary text-white' : 'bg-base-100'}`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            className="join-item btn btn-md bg-base-100 border-none hover:bg-base-200"
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillsPage;