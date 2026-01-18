import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import DashboardStats from "../components/DashboardStats";
import SpendingChart from "../components/SpendingChart";
import RecentTransactions from "../components/RecentTransactions";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://assignment-10-utility-bill-manager.vercel.app/my-bills/${user.email}`)
        .then(res => res.json())
        .then(data => {
            setBills(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
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

  const recentBills = [...bills].reverse().slice(0, 5);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-base-content">Dashboard Overview</h2>

      <DashboardStats totalCount={totalCount} totalPaid={totalPaid} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <SpendingChart data={chartData} />

          <RecentTransactions bills={recentBills} />
      </div>
    </div>
  );
};

export default DashboardHome;