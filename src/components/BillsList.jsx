import { Link } from "react-router";

const BillsList = ({ bills, onDelete }) => {
  if (!bills || !bills.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-base-content/50">
        <p className="text-xl font-medium">No bills found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bills.map((bill) => (
        <div
          key={bill._id}
          className="card border-2 hover:border-blue-600 hover:-translate-y-1 transition-all duration-300 group"
        >
          <figure className="px-4 pt-4 relative h-52">
            <img
              src={bill.image || "https://via.placeholder.com/150"}
              alt={bill.title}
              className="rounded-xl w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 badge badge-neutral font-medium shadow-sm">
              {bill.category}
            </div>
          </figure>

          <div className="card-body p-6">
            <h4 className="card-title text-lg font-bold mb-1 truncate" title={bill.title}>
              {bill.title}
            </h4>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between border-b-2 pb-1">
                <span>Location</span>
                <span className="font-medium">{bill.location || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b-2 pb-1">
                <span>Date</span>
                <span className="font-medium">{new Date(bill.date).toLocaleDateString('en-GB')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-xs font-bold opacity-50 uppercase">Amount</p>
                <p className="text-2xl font-bold text-blue-600">৳{bill.amount}</p>
              </div>
              <Link
                to={`/bills/${bill._id}`}
                className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none"
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