import React from 'react';

const RecentTransactions = ({ bills }) => {
  return (
    <div className="card bg-base-100 dark:bg-base-300 shadow-xl p-6 border border-base-200 dark:border-base-content/10 h-full">
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
            {bills.length > 0 ? (
              bills.map((bill) => (
                <tr key={bill._id}>
                  <td className="text-xs">{new Date(bill.date).toLocaleDateString()}</td>
                  <td className="font-medium truncate max-w-[120px]">{bill.title}</td>
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
  );
};

export default RecentTransactions;