import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";

const Bills = () => {
  const initialBills = useLoaderData();
  console.log(initialBills);
  const [bills, setBills] = useState(initialBills);

  const handlePayBill = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const amount = e.target.amount.value;

    const newPayment = { title, amount };

    fetch("http://localhost:3000/bills", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPayment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after post data: ", data);
        if (data.insertedId) {
          newPayment._id = data.insertedId;
          const newPayments = [...bills, newPayment];
          setBills(newPayments);
          console.log("payment cleared!");
          e.target.reset();
        }
      });
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
    fetch(`http://localhost:3000/bills/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after delete data is... ", data);
        if (data.deletedCount) {
          console.log("Deleted successfully");
          const remaining = bills.filter((bill) => bill._id !== id);
          setBills(remaining);
        }
      });
  };

  return (
    <div>
      <h2>Pay Bill</h2>
      <form onSubmit={handlePayBill} className="mb-10">
        <input type="text" name="title" />
        <br />
        <input type="number" name="amount" />
        <br />
        <button type="submit" className="p-4 bg-black">
          Submit
        </button>
      </form>

      <h2>Bills Showcase</h2>
      <ul>
        {bills.map((bill) => (
          <li key={bill._id}>
            {bill.title} - ${bill.amount}{" "}
            <Link to={`/bills/${bill._id}`}>Details</Link>
            <Link to={`/update/${bill._id}`}>Update</Link>
            <button
              onClick={() => handleDelete(bill._id)}
              className="p-4 bg-black m-3"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bills;
