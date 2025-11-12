// import React, { useState } from "react";
// import { Link, useLoaderData } from "react-router";

// const BillsPage = () => {
//   const initialBills = useLoaderData();
//   console.log(initialBills);
//   const [bills, setBills] = useState(initialBills);

//   const handlePayBill = (e) => {
//     e.preventDefault();
//     const title = e.target.title.value;
//     const amount = e.target.amount.value;

//     const newPayment = { title, amount };

//     fetch("http://localhost:3000/bills", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(newPayment),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("after post data: ", data);
//         if (data.insertedId) {
//           newPayment._id = data.insertedId;
//           const newPayments = [...bills, newPayment];
//           setBills(newPayments);
//           console.log("payment cleared!");
//           e.target.reset();
//         }
//       });
//   };

//   const handleDelete = (id) => {
//     console.log("Delete", id);
//     fetch(`http://localhost:3000/bills/${id}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("after delete data is... ", data);
//         if (data.deletedCount) {
//           console.log("Deleted successfully");
//           const remaining = bills.filter((bill) => bill._id !== id);
//           setBills(remaining);
//         }
//       });
//   };

//   return (
//     <div>
//       <h2>Pay Bill</h2>
//       <form onSubmit={handlePayBill} className="mb-10">
//         <input type="text" name="title" />
//         <br />
//         <input type="number" name="amount" />
//         <br />
//         <button type="submit" className="p-4 bg-black">
//           Submit
//         </button>
//       </form>

//       <h2>Bills Showcase</h2>
//       <ul>
//         {bills.map((bill) => (
//           <li key={bill._id}>
//             {bill.title} - ${bill.amount}{" "}
//             <Link to={`/bills/${bill._id}`}>Details</Link>
//             <Link to={`/update/${bill._id}`}>Update</Link>
//             <button
//               onClick={() => handleDelete(bill._id)}
//               className="p-4 bg-black m-3"
//             >
//               X
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BillsPage;
import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import PayBillForm from "../components/PayBillForm";
import BillsList from "../components/BillsList";
import BillFilterBar from "../components/BillFilterBar";
import DownloadReportButton from "../components/DownloadReportButton";

const BillsPage = () => {
  const initialBills = useLoaderData();
  const [bills, setBills] = useState(initialBills);
  const [categories, setCategories] = useState([]);

  // Fetch categories for the filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Add new bill
  const handleAddBill = (newBill) => {
    setBills((prev) => [...prev, newBill]);
  };

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
      const url = category
        ? `http://localhost:3000/bills?category=${category}`
        : `http://localhost:3000/bills`;
      const res = await fetch(url);
      const data = await res.json();
      setBills(data);
    } catch (err) {
      console.error("Failed to filter bills:", err);
    }
  };

  return (
    <div>
      <PayBillForm onAddBill={handleAddBill} categories={categories} />
      <BillFilterBar categories={categories} onFilter={handleFilter} />
      <BillsList bills={bills} onDelete={handleDelete} />
      <div className="mt-6">
        <DownloadReportButton bills={bills}></DownloadReportButton>
      </div>
    </div>
  );
};

export default BillsPage;
