import React from 'react';

const DashboardStats = ({ totalCount, totalPaid }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="stat bg-base-100 dark:bg-base-300 shadow-sm rounded-xl border border-base-200 dark:border-base-content/10">
        <div className="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div className="stat-title">Total Bills Paid</div>
        <div className="stat-value text-primary">{totalCount}</div>
        <div className="stat-desc">Lifetime history</div>
      </div>

      <div className="stat bg-base-100 dark:bg-base-300 shadow-sm rounded-xl border border-base-200 dark:border-base-content/10">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
        </div>
        <div className="stat-title">Total Spent</div>
        <div className="stat-value text-secondary">৳{totalPaid.toLocaleString()}</div>
        <div className="stat-desc">Bangladeshi Taka</div>
      </div>
    </div>
  );
};

export default DashboardStats;