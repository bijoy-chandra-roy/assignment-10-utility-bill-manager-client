import React from "react";
import { useLoaderData, Link } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const BillDetailsPage = () => {
  const bill = useLoaderData();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const billDate = new Date(bill.date);
  const today = new Date();
  const isCurrentMonth =
    billDate.getMonth() === today.getMonth() &&
    billDate.getFullYear() === today.getFullYear();

  const handlePayBill = async (e) => {
    e.preventDefault();
    const form = e.target;

    const paymentData = {
      billId: bill._id,
      title: bill.title,
      amount: bill.amount,
      category: bill.category,
      username: user?.displayName,
      email: user?.email,
      address: form.address.value,
      phone: form.phone.value,
      date: new Date().toISOString()
    };

    try {
      const res = await fetch('http://localhost:3000/my-bills', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
      const data = await res.json();
      if (data.insertedId) {
        Swal.fire('Success', 'Bill Paid Successfully!', 'success');
        document.getElementById('pay_modal').close();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  if (!bill || !bill._id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Bill not found</h2>
        <Link
          to="/bills"
          className="px-6 py-3 bg-primary text-white rounded hover:bg-gray-800 transition"
        >
          Back to Bills
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Bill Details</h2>

      <div className="border rounded-lg p-6 shadow-md bg-black flex flex-col gap-4">
        <img
          src={bill.image || "https://via.placeholder.com/300"}
          alt={bill.title}
          className="w-full h-64 object-cover rounded"
        />

        <div>
          <p><strong>Title:</strong> {bill.title}</p>
          <p><strong>Amount:</strong> ${bill.amount}</p>
          <p><strong>Category:</strong> {bill.category}</p>
          <p><strong>Location:</strong> {bill.location || "N/A"}</p>
          <p><strong>Date:</strong> {new Date(bill.date).toLocaleDateString('en-GB')}</p>
          <p><strong>ID:</strong> {bill._id}</p>
        </div>

        <div className="flex gap-4 mt-4">
          {isCurrentMonth ? (
            <button
              onClick={() => document.getElementById('pay_modal').showModal()}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Pay Bill
            </button>
          ) : (
            <button disabled className="px-6 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
              Pay Disabled (Wrong Month)
            </button>
          )}
          <Link
            to="/bills"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Back to Bills
          </Link>
          <Link
            to={`/update/${bill._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit Bill
          </Link>
        </div>
      </div>

      <dialog id="pay_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirm Payment</h3>

          <form onSubmit={handlePayBill} className="flex flex-col gap-3">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Bill ID</span></div>
              <input type="text" value={bill._id} readOnly className="input input-bordered w-full bg-gray-100" />
            </label>

            <label className="form-control w-full">
              <div className="label"><span className="label-text">Amount</span></div>
              <input type="text" value={bill.amount} readOnly className="input input-bordered w-full bg-gray-100" />
            </label>

            <label className="form-control w-full">
              <div className="label"><span className="label-text">User Email</span></div>
              <input type="text" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />
            </label>

            <label className="form-control w-full">
              <div className="label"><span className="label-text">Phone Number</span></div>
              <input type="text" name="phone" placeholder="017..." required className="input input-bordered w-full" />
            </label>

            <label className="form-control w-full">
              <div className="label"><span className="label-text">Address</span></div>
              <input type="text" name="address" placeholder="Your address..." required className="input input-bordered w-full" />
            </label>

            <button type="submit" className="btn btn-success w-full mt-4 text-white">Confirm Payment</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BillDetailsPage;
