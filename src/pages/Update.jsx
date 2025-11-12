import React from "react";
import { useLoaderData } from "react-router";

const Update = () => {
  const initialBill = useLoaderData();
  console.log(initialBill);

  const handleUpdate = (e) => {
  e.preventDefault();
  console.log(e);
  const title = e.target.title.value;
  const amount = e.target.amount.value;
  const updatedFields = { title, amount };
console.log(e);
  fetch(`http://localhost:3000/update/${initialBill._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("after edit: ", data);
    });
};

  return (
    <div>
      <form onSubmit={handleUpdate} className="mb-10">
        <input type="text" name="title" defaultValue={initialBill.title} />
        <br />
        <input type="number" name="amount" defaultValue={initialBill.amount} />
        <br />
        <button type="submit" className="p-4 bg-black">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
