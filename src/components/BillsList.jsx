import { Link } from "react-router";

const BillsList = ({ bills }) => {
  if (!bills || !bills.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-base-content/50">
        <p className="text-xl font-medium">No bills found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bills.map((bill) => (
        <div
          key={bill._id}
          className="card bg-base-100 dark:bg-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-2 border border-base-200 dark:border-base-content/10 hover:border-primary transition-all duration-300 cursor-pointer"
        >
          <figure>
            <img
              src={bill.image || "https://via.placeholder.com/150"}
              alt={bill.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-base-content">
              {bill.title}
              <div className="badge badge-neutral">{bill.category}</div>
            </h2>

            <div className="text-sm text-base-content/70 space-y-1 my-2">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-medium text-base-content">{bill.location || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium text-base-content">{new Date(bill.date).toLocaleDateString('en-GB')}</span>
              </div>
            </div>

            <div className="card-actions justify-between items-center mt-2">
              <div className="text-2xl font-bold text-primary">
                ৳{bill.amount}
              </div>
              <Link
                to={`/bills/${bill._id}`}
                className="btn btn-primary text-white btn-sm hover:scale-105"
              >
                See Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillsList;