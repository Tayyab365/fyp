import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
