import { Link } from "react-router";

const BillsList = ({ bills, onDelete }) => {
  if (!bills.length) {
    return <p>No bills available.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Bills Showcase</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <li
            key={bill._id}
            className="border rounded-lg p-4 flex flex-col gap-3 hover:shadow-md transition"
          >
            <img
              src={bill.image || "https://via.placeholder.com/150"}
              alt={bill.title}
              className="w-full h-32 object-cover rounded"
            />
            <h4 className="text-lg font-medium">{bill.title}</h4>
            <p className="text-sm text-gray-600">Category: {bill.category}</p>
            <p className="text-sm text-gray-600">Location: {bill.location || "N/A"}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(bill.date).toLocaleDateString('en-GB')}
            </p>
            <p className="text-sm font-semibold">Amount: ${bill.amount}</p>

            <div className="mt-auto flex gap-2">
              <Link
                to={`/bills/${bill._id}`}
                className="px-3 py-2 border rounded text-sm text-center hover:bg-gray-100 transition"
              >
                Details
              </Link>
              <Link
                to={`/update/${bill._id}`}
                className="px-3 py-2 border rounded text-sm text-center hover:bg-gray-100 transition"
              >
                Update
              </Link>
              <button
                onClick={() => onDelete(bill._id)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillsList;
