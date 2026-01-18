import React, { useEffect, useState } from "react";
import { useLoaderData, Link, useNavigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const BillDetailsPage = () => {
  const bill = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeImage, setActiveImage] = useState(bill.images && bill.images.length > 0 ? bill.images[0] : bill.image);
  const [relatedBills, setRelatedBills] = useState([]);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "UtilityHub - Bill Details";

    if (bill.images && bill.images.length > 0) {
      setActiveImage(bill.images[0]);
    } else {
      setActiveImage(bill.image);
    }

    const fetchRelated = async () => {
      try {
        const res = await fetch(`https://assignment-10-utility-bill-manager.vercel.app/bills?category=${bill.category}`);
        const data = await res.json();
        const filtered = data.filter(b => b._id !== bill._id).slice(0, 3);
        setRelatedBills(filtered);
      } catch (error) {
        console.error(error);
      }
    }

    if (bill.category) {
      fetchRelated();
    }

    return () => {
      document.title = originalTitle;
    };
  }, [bill]);

  const billDate = new Date(bill.date);
  const today = new Date();
  const isCurrentMonth =
    billDate.getMonth() === today.getMonth() &&
    billDate.getFullYear() === today.getFullYear();

  const handlePayBill = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "You need to be logged in to pay bills.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: location.pathname });
        }
      });
      return;
    }

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
        `https://assignment-10-utility-bill-manager.vercel.app/my-bills`,
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content px-4">
        <h2 className="text-2xl font-bold mb-4">Bill not found</h2>
        <Link to="/bills" className="btn btn-primary">
          Back to Bills
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="rounded-xl overflow-hidden h-96 border border-base-300 shadow-sm mb-4">
              <img
                src={activeImage}
                alt={bill.title}
                className="w-full h-full object-cover"
              />
            </div>
            {bill.images && bill.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto">
                {bill.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${activeImage === img ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <span className="badge badge-primary">{bill.category}</span>
              <h1 className="text-4xl font-bold mt-2 text-base-content">{bill.title}</h1>
              <p className="text-3xl font-bold text-primary mt-4">৳{bill.amount}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="table border border-base-300 bg-base-100 rounded-lg">
                <tbody>
                  <tr>
                    <th className="bg-base-200 w-1/3">Bill ID</th>
                    <td>{bill._id}</td>
                  </tr>
                  <tr>
                    <th className="bg-base-200">Location</th>
                    <td>{bill.location || "N/A"}</td>
                  </tr>
                  <tr>
                    <th className="bg-base-200">Due Date</th>
                    <td>{new Date(bill.date).toLocaleDateString("en-GB")}</td>
                  </tr>
                  <tr>
                    <th className="bg-base-200">Status</th>
                    <td>
                      {isCurrentMonth ? (
                        <span className="text-success font-bold">Active</span>
                      ) : (
                        <span className="text-error font-bold">Expired</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              {isCurrentMonth ? (
                <button
                  onClick={() => {
                    if (user) {
                      document.getElementById("pay_modal").showModal()
                    } else {
                      Swal.fire({
                        title: "Please Login",
                        text: "You need to be logged in to pay bills.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Login",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          navigate("/login", { state: location.pathname });
                        }
                      });
                    }
                  }}
                  className="btn btn-primary btn-lg w-full text-white shadow-lg"
                >
                  {user ? "Pay Now" : "Login to Pay"}
                </button>
              ) : (
                <button disabled className="btn btn-disabled btn-lg w-full">
                  Pay Disabled (Wrong Month)
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 dark:bg-base-300 shadow-xl mb-8">
              <div className="card-body">
                <h2 className="card-title text-2xl border-b border-base-content/10 pb-4 mb-4">Overview</h2>
                <p className="text-base-content/80 leading-relaxed">
                  {bill.description || "No description provided for this bill."}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Related Bills</h3>
            <div className="flex flex-col gap-4">
              {relatedBills.length > 0 ? (
                relatedBills.map(related => (
                  <Link to={`/bills/${related._id}`} key={related._id} className="card card-side bg-base-100 dark:bg-base-300 shadow-sm hover:shadow-md transition-all border border-base-200">
                    <figure className="w-24">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover" />
                    </figure>
                    <div className="card-body p-4">
                      <h4 className="card-title text-sm">{related.title}</h4>
                      <p className="text-primary font-bold">৳{related.amount}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="opacity-60">No related bills found.</p>
              )}
            </div>
          </div>
        </div>

      </div>

      <dialog id="pay_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 dark:bg-base-300 text-base-content">
          <h3 className="font-bold text-lg mb-4">Confirm Payment</h3>

          <form onSubmit={handlePayBill} className="flex flex-col gap-3">

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Bill ID</span>
              </div>
              <input
                type="text"
                value={bill._id}
                readOnly
                className="input input-bordered w-full bg-base-200/60 cursor-not-allowed"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Amount</span>
              </div>
              <input
                type="text"
                value={`$${bill.amount}`}
                readOnly
                className="input input-bordered w-full bg-base-200/60 cursor-not-allowed text-primary font-bold"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">User Email</span>
              </div>
              <input
                type="text"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-base-200/60 cursor-not-allowed"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Username</span>
              </div>
              <input
                type="text"
                value={user?.displayName || "N/A"}
                readOnly
                className="input input-bordered w-full bg-base-200/60 cursor-not-allowed"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Payment Date</span>
              </div>
              <input
                type="text"
                value={new Date().toLocaleDateString("en-GB")}
                readOnly
                className="input input-bordered w-full bg-base-200/60 cursor-not-allowed"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Phone Number</span>
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Your phone number..."
                required
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Address</span>
              </div>
              <input
                type="text"
                name="address"
                placeholder="Your address..."
                required
                className="input input-bordered w-full"
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