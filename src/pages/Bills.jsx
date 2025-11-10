import React, { useState } from "react";
import { useLoaderData } from "react-router";

const Bills = () => {
  const initialBills = useLoaderData();
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
        setBills([...bills, data]);
      });
  };

  return (
    <div>
      <h2>Pay Bill</h2>
      <form onSubmit={handlePayBill}>
        <input type="text" name="title" />
        <br />
        <input type="number" name="amount" />
        <br />
        <button type="submit">Submit</button>
      </form>

      <h2>Bills Showcase</h2>
      <ul>
        {bills.map((bill) => (
          <li key={bill._id}>
            {bill.title} - ${bill.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bills;
