import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { cartContext } from "../Context/CartContext";
import Rating from "../components/common/Rating";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading } = useProduct(id);
  const { dispatch } = useContext(cartContext);

  const [quantity, setQuantity] = useState(1);
  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const submitReview = async () => {
    if (!user) {
      toast.error("Please login to write a review");
      return;
    }

    if (!ratingValue || !review) return toast.error("Please fill all fields");

    setSubmitting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${product._id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: ratingValue,
            comment: review,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Review added!");
        window.location.reload();
      } else toast.error(data.message);
    } catch (err) {
      toast.error("Error adding review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <p className="text-gray-600 dark:text-text-secondary text-center mt-24">
        Loading...
      </p>
    );
  if (!product)
    return (
      <p className="text-center text-lg mt-20 font-medium text-gray-800 dark:text-text-primary">
        Product not found
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto mt-20 px-2 sm:px-4 lg:px-8">
      {/* Product Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-[var(--bg-section-dark)] dark:to-[var(--bg-section-light)] rounded-2xl shadow-lg dark:shadow-black/40 p-6 sm:p-10 grid md:grid-cols-2 gap-10 items-center overflow-hidden border border-gray-100 dark:border-[var(--border-color)]">
        {/* Soft background blur accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 dark:bg-[var(--bg-elevated)] blur-3xl opacity-20 rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 dark:bg-[var(--bg-elevated)] blur-3xl opacity-20 rounded-full -z-10"></div>

        {/* Product Image */}
        <div className="flex justify-center items-center">
          <div className="relative bg-white dark:bg-[var(--bg-card)] rounded-xl shadow-md dark:shadow-black/40 p-5 border border-gray-200 dark:border-[var(--border-color)]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[360px] object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-[var(--text-primary)] tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>

          <p className="text-[var(--accent-blue)] text-2xl font-bold mt-2">
            ${product.price}
          </p>

          <p className="text-gray-600 dark:text-[var(--text-secondary)] leading-relaxed text-[15px] sm:text-base max-w-lg">
            {product.description ||
              "No description available for this product."}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-3">
            <span className="font-medium text-gray-700 dark:text-[var(--text-primary)]">
              Quantity:
            </span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border border-gray-300 dark:border-[var(--border-color)] bg-white dark:bg-[var(--bg-card)] text-gray-800 dark:text-[var(--text-primary)] rounded-md text-center py-1.5 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] transition-all font-medium"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              onClick={addToCart}
              className="bg-[var(--accent-blue)] hover:bg-[var(--accent-hover)] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      {user ? (
        <div className="bg-white dark:bg-[var(--bg-card)] rounded-lg shadow-md dark:shadow-black/40 mt-8 p-4 sm:p-6 border border-gray-100 dark:border-[var(--border-color)]">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-[var(--text-primary)]">
            Write a Review
          </h2>

          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRatingValue(star)}
                className={`text-2xl ${
                  star <= ratingValue
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-[var(--text-muted)]"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full border border-gray-300 dark:border-[var(--border-color)] rounded-md p-3 h-28 text-sm bg-white dark:bg-[var(--bg-card)] text-gray-700 dark:text-[var(--text-secondary)] focus:ring-1 focus:ring-[var(--accent-blue)] mb-4 resize-none"
          />

          <button
            onClick={submitReview}
            disabled={submitting}
            className="bg-[var(--accent-blue)] hover:bg-[var(--accent-hover)] text-white px-5 py-2 rounded-md font-medium"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-[var(--bg-card)] rounded-lg shadow-md dark:shadow-black/40 mt-8 p-4 sm:p-6 border border-gray-100 dark:border-[var(--border-color)] text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-[var(--text-primary)] mb-2">
            Want to write a review?
          </h2>
          <p className="text-gray-600 dark:text-[var(--text-secondary)] mb-3">
            Please{" "}
            <span className="text-[var(--accent-blue)] font-medium">login</span>{" "}
            to share your experience.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-[var(--accent-blue)] hover:bg-[var(--accent-hover)] text-white px-5 py-2 rounded-md font-medium"
          >
            Login
          </button>
        </div>
      )}

      {/* Customer Reviews */}
      <div className="bg-white dark:bg-[var(--bg-card)] rounded-lg shadow-md dark:shadow-black/40 mt-8 p-4 sm:p-6 border border-gray-100 dark:border-[var(--border-color)]">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-[var(--text-primary)]">
          Customer Reviews
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.reviews.map((r, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 dark:border-[var(--border-color)] rounded-lg bg-gray-50 dark:bg-[var(--bg-section-dark)] hover:bg-gray-100 dark:hover:bg-[var(--bg-elevated)] transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 dark:text-[var(--text-primary)] text-sm">
                    {r.name}
                  </h3>
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(r.rating)].map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-[var(--text-secondary)] text-sm">
                  {r.comment}
                </p>
                <p className="text-gray-400 dark:text-[var(--text-muted)] text-xs mt-1">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-[var(--text-secondary)]">
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
