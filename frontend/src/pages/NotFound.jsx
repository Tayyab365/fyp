import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[var(--bg-page)] text-[var(--text-primary)] text-center px-4 transition-colors duration-300">
      <h1 className="text-7xl font-bold text-[var(--text-primary)] mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-[var(--text-secondary)] mb-2">
        Page Not Found
      </h2>
      <p className="text-[var(--text-muted)] mb-6 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="bg-[var(--accent-blue)] text-white px-6 py-3 rounded-xl hover:bg-[var(--accent-hover)] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
