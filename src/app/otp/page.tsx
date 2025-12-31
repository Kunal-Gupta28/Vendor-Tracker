"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { startEvent } from "@/store/eventSlice";

export default function OTPPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    if (!otp) return;

    setLoading(true);

    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      dispatch(startEvent());
      router.push("/setup");
    } catch (error) {
      console.error("OTP verification failed:", error);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && otp) {
      verifyOtp();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6 pt-24">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-md">
          <span className="text-4xl">🔐</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Verify OTP</h1>

        {/* Subheading */}
        <p className="text-gray-600 text-center mb-8">
          Enter the OTP sent to the customer to verify and proceed with setup
        </p>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">One-Time Password</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            onKeyPress={handleKeyPress}
            maxLength={6}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-2xl font-bold text-center tracking-widest bg-gray-50"
          />
          <p className="text-xs text-gray-500 mt-2">Enter the 6-digit code</p>
        </div>

        {/* Demo Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-xs text-blue-900">
          <p className="font-semibold mb-1">Demo Mode:</p>
          <p>Use OTP: <span className="font-mono font-bold">123456</span></p>
        </div>

        {/* Verify Button */}
        <button
          onClick={verifyOtp}
          disabled={!otp || otp.length !== 6 || loading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl disabled:opacity-50 transition shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              Verifying...
            </>
          ) : (
            <>
              <span>✓</span>
              Verify & Continue
            </>
          )}
        </button>

        {/* Info */}
        <p className="text-center text-gray-600 text-xs mt-6">
          🔒 Your OTP is secure and will be verified instantly
        </p>
      </div>
    </main>
  );
}
