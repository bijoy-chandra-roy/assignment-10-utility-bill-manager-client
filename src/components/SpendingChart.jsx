import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-100 border border-base-content/10 p-3 rounded-lg shadow-xl">
        <p className="font-bold text-base-content">{label}</p>
        <p className="text-primary">
          Amount: <span className="font-mono font-bold">৳{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const SpendingChart = ({ data }) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

  return (
    <div className="card bg-base-100 dark:bg-base-300 shadow-xl p-6 border border-base-200 dark:border-base-content/10 h-full">
      <h3 className="text-xl font-bold mb-4">Spending by Category</h3>
      <div className="h-[300px] w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="amount" fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50">
            No payment data to display yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingChart;