import { Link } from "react-router";
import BillSkeleton from "./BillSkeleton";

const BillsList = ({ bills, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <BillSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!bills || !bills.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-base-content/50">
        <p className="text-xl font-medium">No bills found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {bills.map((bill) => (
        <div
          key={bill._id}
          className="card bg-base-100 dark:bg-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-2 border border-base-200 dark:border-base-content/10 hover:border-primary transition-all duration-300 cursor-pointer h-full flex flex-col"
        >
          <figure className="h-48 overflow-hidden">
            <img
              src={bill.image}
              alt={bill.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </figure>
          <div className="card-body p-6 flex flex-col flex-grow">
            <h2 className="card-title text-base-content text-lg">
              {bill.title}
              <div className="badge badge-neutral text-xs">{bill.category}</div>
            </h2>

            {/* Added Short Description */}
            <p className="text-xs text-base-content/70 line-clamp-2 my-3">
              {bill.description || "No detailed description available for this bill."}
            </p>

            <div className="text-sm text-base-content/70 space-y-1 mb-4 mt-auto">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-medium text-base-content">{bill.location || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium text-base-content">{new Date(bill.date).toLocaleDateString('en-GB')}</span>
              </div>
            </div>

            <div className="card-actions justify-between items-center mt-2 pt-4 border-t border-base-200 dark:border-base-content/10">
              <div className="text-xl font-bold text-primary">
                ৳{bill.amount}
              </div>
              <Link
                to={`/bills/${bill._id}`}
                className="btn btn-primary text-white btn-sm hover:scale-105"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillsList;