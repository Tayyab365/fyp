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
        `http://localhost:5000/api/products/${product._id}/reviews`,
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
    return <p className="text-gray-600 text-center mt-24">Loading...</p>;
  if (!product)
    return (
      <p className="text-center text-lg mt-20 font-medium">Product not found</p>
    );

  return (
    <div className="max-w-7xl mx-auto mt-20 px-2 sm:px-4 lg:px-8">
      {/* Product Section */}
      {/* Product Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 sm:p-10 grid md:grid-cols-2 gap-10 items-center overflow-hidden border border-gray-100">
        {/* Soft background blur accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 blur-3xl opacity-30 rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 blur-3xl opacity-30 rounded-full -z-10"></div>

        {/* Product Image */}
        <div className="flex justify-center items-center">
          <div className="relative bg-white rounded-xl shadow-md p-5 border border-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[360px] object-contain rounded-lg mix-blend-multiply"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>

          <p className="text-blue-600 text-2xl font-bold mt-2">
            ${product.price}
          </p>

          <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base max-w-lg">
            {product.description ||
              "No description available for this product."}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-3">
            <span className="font-medium text-gray-700">Quantity:</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border rounded-md text-center py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              onClick={addToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-lg shadow-md mt-8 p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Write a Review
        </h2>

        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRatingValue(star)}
              className={`text-2xl ${
                star <= ratingValue ? "text-yellow-400" : "text-gray-300"
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
          className="w-full border rounded-md p-3 h-28 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 mb-4 resize-none"
        />

        <button
          onClick={submitReview}
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md mt-8 p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Customer Reviews
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.reviews.map((r, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {r.name}
                  </h3>
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(r.rating)].map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{r.comment}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
