import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import DownloadReportButton from '../components/DownloadReportButton';

const MyPayBills = () => {

    useEffect(() => {
        const originalTitle = document.title;
        document.title = "UtilityHub - My Pay Bills";

        return () => {
            document.title = originalTitle;
        };
    }, []);

    const { user } = useContext(AuthContext);
    const [paidBills, setPaidBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedBill, setSelectedBill] = useState(null);

    const fetchPaidBills = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/my-bills/${user.email}`);
            const data = await res.json();
            setPaidBills(data);
            const total = data.reduce((sum, bill) => sum + bill.amount, 0);
            setTotalAmount(total);
        } catch (error) {
            console.error("Failed to fetch paid bills:", error);
            Swal.fire('Error', 'Could not fetch your bills.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaidBills();
    }, [user]);

    const handleUpdateBill = async (e) => {
        e.preventDefault();
        const form = e.target;
        const address = form.address.value;
        const phone = form.phone.value;
        const amount = form.amount.value;
        const date = form.date.value;

        const updatedInfo = { address, phone, amount: parseFloat(amount), date };

        try {
            const res = await fetch(`http://localhost:3000/my-bills/${selectedBill._id}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(updatedInfo)
            });
            const data = await res.json();
            if (data.modifiedCount > 0) {
                fetchPaidBills();
                document.getElementById('update_modal').close();
                Swal.fire({
                    icon: "success",
                    title: "Bill updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:3000/my-bills/${id}`, {
                        method: 'DELETE'
                    });
                    const data = await res.json();
                    if (data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Your bill history has been deleted.', 'success');
                        fetchPaidBills();
                    }
                } catch (error) {
                    Swal.fire('Error', 'Could not delete the bill.', 'error');
                }
            }
        });
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-base-content">My Payment History</h2>

                {/* Added dark:bg-base-300 and text-base-content */}
                <div className="stats shadow w-full bg-base-100 dark:bg-base-300 text-base-content mb-8">
                    <div className="stat place-items-center">
                        <div className="stat-title text-base-content/70">Total Bills Paid</div>
                        <div className="stat-value text-primary">{paidBills.length}</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title text-base-content/70">Total Amount Paid</div>
                        <div className="stat-value text-base-content">৳{totalAmount.toLocaleString()}</div>
                    </div>
                </div>

                {/* Added dark:bg-base-300 */}
                <div className="card bg-base-100 dark:bg-base-300 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead className="bg-primary text-primary-content">
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Bill Title</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-base-content">
                                {paidBills.length > 0 ? (
                                    paidBills.map((bill) => (
                                        <tr key={bill._id}>
                                            <td>{bill.username}</td>
                                            <td>{bill.email}</td>
                                            <td>{bill.title}</td>
                                            <td>{bill.category}</td>
                                            <td>৳{bill.amount}</td>
                                            <td>{bill.address}</td>
                                            <td>{bill.phone}</td>
                                            <td>{new Date(bill.date).toLocaleDateString('en-GB')}</td>
                                            <td className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedBill(bill);
                                                        document.getElementById('update_modal').showModal();
                                                    }}
                                                    className="btn btn-sm btn-outline btn-warning"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(bill._id)}
                                                    className="btn btn-sm btn-outline btn-error"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center py-8 text-base-content/60">You have no paid bills.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-10 flex justify-center">
                    <DownloadReportButton bills={paidBills} />
                </div>

                <dialog id="update_modal" className="modal">
                    {/* Added dark:bg-base-300 */}
                    <div className="modal-box bg-base-100 dark:bg-base-300 text-base-content">
                        <h3 className="font-bold text-lg">Update Bill Info</h3>
                        <form onSubmit={handleUpdateBill} className="py-4 flex flex-col gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Address</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={selectedBill?.address}
                                    className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Phone</span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    defaultValue={selectedBill?.phone}
                                    className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text text-base-content">Amount</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        defaultValue={selectedBill?.amount}
                                        className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content"
                                    />
                                </div>
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text text-base-content">Date</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="date"
                                        defaultValue={selectedBill?.date}
                                        className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content"
                                    />
                                </div>
                            </div>

                            <button className="btn btn-primary mt-6 w-full">Update Now</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default MyPayBills;