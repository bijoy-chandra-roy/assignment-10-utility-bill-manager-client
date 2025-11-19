import React from "react";
import { useLoaderData, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const BillDetailsPage = () => {
  const bill = useLoaderData();
  const { user } = useContext(AuthContext);

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
      category: bill.category,
      amount: bill.amount,
      username: user?.displayName,
      email: user?.email,
      address: form.address.value,
      phone: form.phone.value,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/my-bills`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );
      const data = await res.json();
      if (data.insertedId) {
        Swal.fire("Success", "Bill Paid Successfully!", "success");
        document.getElementById("pay_modal").close();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!bill || !bill._id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Bill not found</h2>
        <Link to="/bills" className="btn btn-primary">
          Back to Bills
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Bill Details</h2>

      <div className="border rounded-lg p-6 shadow-lg flex flex-col gap-6">
        <img
          src={bill.image || "https://via.placeholder.com/300"}
          alt={bill.title}
          className="w-full h-64 md:h-80 object-cover rounded-lg"
        />

        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{bill.title}</h3>
          <p className="text-lg">
            <strong>Amount:</strong>{" "}
            <span className="text-blue-600 font-semibold">${bill.amount}</span>
          </p>
          <p>
            <strong>Category:</strong>{" "}
            <span className="badge badge-outline">{bill.category}</span>
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {bill.description || "No description provided."}
          </p>
          <p>
            <strong>Location:</strong> {bill.location || "N/A"}
          </p>
          <p>
            <strong>Bill Date:</strong>{" "}
            {new Date(bill.date).toLocaleDateString("en-GB")}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-base-300">
          {isCurrentMonth ? (
            <button
              onClick={() => document.getElementById("pay_modal").showModal()}
              className="btn btn-success text-white"
            >
              Pay Bill
            </button>
          ) : (
            <button disabled className="btn btn-disabled bg-gray-600 text-white">
              Pay Disabled (Wrong Month)
            </button>
          )}
          <Link to="/bills" className="btn btn-ghost">
            Back to Bills
          </Link>
        </div>
      </div>

      <dialog id="pay_modal" className="modal">
        <div className="modal-box bg-gray-600">
          <h3 className="font-bold text-lg text-white mb-4">Confirm Payment</h3>

          <form onSubmit={handlePayBill} className="flex flex-col gap-3">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-200">Bill ID</span>
              </div>
              <input
                type="text"
                value={bill._id}
                readOnly
                className="input input-bordered w-full bg-gray-700 text-gray-300"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-200">Amount</span>
              </div>
              <input
                type="text"
                value={`$${bill.amount}`}
                readOnly
                className="input input-bordered w-full bg-gray-700 text-gray-300"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-200">User Email</span>
              </div>
              <input
                type="text"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-700 text-gray-300"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-200">Username</span>
              </div>
              <input
                type="text"
                value={user?.displayName || "N/A"}
                readOnly
                className="input input-bordered w-full bg-gray-700 text-gray-300"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-200">Payment Date</span>
              </div>
              <input
                type="text"
                value={new Date().toLocaleDateString("en-GB")}
                readOnly
                className="input input-bordered w-full bg-gray-700 text-gray-300"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-200">Phone Number</span>
              </div>
              <input
                type="text"
                name="phone"
                placeholder="Your phone number..."
                required
                className="input input-bordered w-full bg-gray-900 text-white"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-200">Address</span>
              </div>
              <input
                type="text"
                name="address"
                placeholder="Your address..."
                required
                className="input input-bordered w-full bg-gray-900 text-white"
              />
            </label>

            <button
              type="submit"
              className="btn btn-success w-full mt-4 text-white"
            >
              Confirm Payment
            </button>
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