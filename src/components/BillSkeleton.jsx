import React from "react";

const BillSkeleton = () => {
  return (
    <div className="card bg-base-100 dark:bg-base-300 shadow-sm border border-base-200 dark:border-base-content/10 h-full flex flex-col">
      {/* Image Placeholder */}
      <div className="skeleton w-full h-48"></div>

      <div className="card-body p-6 flex flex-col flex-grow">
        {/* Title & Badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="skeleton h-6 w-3/4"></div>
          <div className="skeleton h-5 w-16 rounded-full"></div>
        </div>

        {/* Description Lines */}
        <div className="space-y-2 mb-4">
          <div className="skeleton h-3 w-full"></div>
          <div className="skeleton h-3 w-5/6"></div>
        </div>

        {/* Meta Info (Location & Date) */}
        <div className="space-y-2 mb-4 mt-auto">
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
        <div className="card-actions justify-between items-center mt-2 pt-4 border-t border-base-200 dark:border-base-content/10">
          <div className="skeleton h-8 w-20"></div>
          <div className="skeleton h-8 w-28 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default BillSkeleton;