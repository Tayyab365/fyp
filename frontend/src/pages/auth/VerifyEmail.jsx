import React, { useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!code.trim()) return toast.error("Please enter the verification code");
    try {
      const res = await API.post("/auth/verify-email", { email, code });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-5">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-sm sm:text-base text-center mb-4">
          Enter the 6-digit code sent to <b>{email}</b>
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
