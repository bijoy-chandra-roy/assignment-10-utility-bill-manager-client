import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import DownloadReportButton from '../components/DownloadReportButton';

const MyPayBills = () => {
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
            confirmButtonColor: '#3085d6',
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
        <div className="container mx-auto p-4 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">My Payment History</h2>

            <div className="stats shadow mb-6">
                <div className="stat">
                    <div className="stat-title">Total Bills Paid</div>
                    <div className="stat-value">{paidBills.length}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Amount Paid</div>
                    <div className="stat-value">৳{totalAmount.toLocaleString()}</div>
                </div>
            </div>

            <div className="mb-4">
                <DownloadReportButton bills={paidBills} />
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full border-2">
                    <thead className="bg-blue-500 border-1">
                        <tr className='text-white'>
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
                    <tbody>
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
                                <td colSpan="9" className="text-center">You have no paid bills.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <dialog id="update_modal" className="modal">
                <div className="modal-box bg-gray-600">
                    <h3 className="font-bold text-lg text-white">Update Bill Info</h3>
                    <form onSubmit={handleUpdateBill} className="py-4 flex flex-col gap-3">
                        <label className="label">
                            <span className="label-text text-gray-200">Address</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            defaultValue={selectedBill?.address}
                            className="input input-bordered w-full bg-gray-900 text-white"
                        />

                        <label className="label">
                            <span className="label-text text-gray-200">Phone</span>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            defaultValue={selectedBill?.phone}
                            className="input input-bordered w-full bg-gray-900 text-white"
                        />

                        <div className="flex gap-2">
                            <div className="w-1/2">
                                <label className="label">
                                    <span className="label-text text-gray-200">Amount</span>
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    defaultValue={selectedBill?.amount}
                                    className="input input-bordered w-full bg-gray-900 text-white"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="label">
                                    <span className="label-text text-gray-200">Date</span>
                                </label>
                                <input
                                    type="text"
                                    name="date"
                                    defaultValue={selectedBill?.date}
                                    className="input input-bordered w-full bg-gray-900 text-white"
                                />
                            </div>
                        </div>

                        <button className="btn btn-warning mt-4 text-white">Update Now</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyPayBills;