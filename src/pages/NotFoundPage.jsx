import React, { useEffect } from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "UtilityHub - Page Not Found";

    return () => {
      document.title = originalTitle;
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Page Not Found</h2>
      <p className="mb-6">The page you are looking for does not exist or has been moved.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
