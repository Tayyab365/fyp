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
    try {
      const res = await API.post("/auth/verify-email", { email, code });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Enter the 6-digit code sent to <b>{email}</b>
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
