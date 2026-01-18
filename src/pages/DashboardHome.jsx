import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Loading from "../components/Loading";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-bills/${user.email}`)
        .then(res => res.json())
        .then(data => {
            setBills(data);
            setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <Loading />;

  const totalPaid = bills.reduce((sum, item) => sum + item.amount, 0);
  const totalCount = bills.length;
  
  const chartData = bills.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.category);
    if (existing) {
        existing.amount += curr.amount;
    } else {
        acc.push({ name: curr.category, amount: curr.amount });
    }
    return acc;
  }, []);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

  const recentBills = [...bills].reverse().slice(0, 5);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 dark:bg-base-300 shadow rounded-xl border border-base-200 dark:border-base-content/10">
            <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="stat-title">Total Bills Paid</div>
            <div className="stat-value text-primary">{totalCount}</div>
            <div className="stat-desc">Lifetime history</div>
        </div>

        <div className="stat bg-base-100 dark:bg-base-300 shadow rounded-xl border border-base-200 dark:border-base-content/10">
            <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </div>
            <div className="stat-title">Total Spent</div>
            <div className="stat-value text-secondary">৳{totalPaid.toLocaleString()}</div>
            <div className="stat-desc">Bangladeshi Taka</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="card bg-base-100 dark:bg-base-300 shadow-xl p-6 border border-base-200 dark:border-base-content/10">
            <h3 className="text-xl font-bold mb-4">Spending by Category</h3>
            <div className="h-[300px] w-full">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" fill="#8884d8">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        No payment data to display yet.
                    </div>
                )}
            </div>
          </div>

          <div className="card bg-base-100 dark:bg-base-300 shadow-xl p-6 border border-base-200 dark:border-base-content/10">
            <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Bill Title</th>
                            <th className="text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentBills.length > 0 ? (
                            recentBills.map((bill) => (
                                <tr key={bill._id}>
                                    <td className="text-xs">{new Date(bill.date).toLocaleDateString()}</td>
                                    <td className="font-medium truncate max-w-[150px]">{bill.title}</td>
                                    <td className="text-right font-bold text-primary">৳{bill.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center text-sm opacity-50 py-4">No recent transactions</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
          </div>

      </div>
    </div>
  );
};

export default DashboardHome;