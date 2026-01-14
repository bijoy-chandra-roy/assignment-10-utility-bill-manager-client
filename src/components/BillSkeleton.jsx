import React from "react";

const BillSkeleton = () => {
  return (
    <div className="card bg-base-100 dark:bg-base-300 shadow-sm border border-base-200 dark:border-base-content/10 h-full">
      {/* Image Placeholder */}
      <div className="skeleton w-full h-48 rounded-b-none"></div>

      <div className="card-body">
        {/* Title & Badge */}
        <h2 className="card-title">
          <div className="skeleton h-6 w-32"></div>
          <div className="skeleton h-5 w-16 rounded-full"></div>
        </h2>

        {/* Meta Info (Location & Date) */}
        <div className="space-y-2 my-2">
          <div className="flex justify-between">
            <div className="skeleton h-4 w-16"></div>
            <div className="skeleton h-4 w-24"></div>
          </div>
          <div className="flex justify-between">
            <div className="skeleton h-4 w-12"></div>
            <div className="skeleton h-4 w-24"></div>
          </div>
        </div>

        {/* Price & Button */}
        <div className="card-actions justify-between items-center mt-2">
          <div className="skeleton h-8 w-20"></div>
          <div className="skeleton h-8 w-24 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default BillSkeleton;