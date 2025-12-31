"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { startEvent } from "@/store/eventSlice";

export default function OTP() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    if (!otp) return;

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
        return;
      }

      dispatch(startEvent());
      router.push("/setup");
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
        <p className="text-gray-600 mb-6">
          Enter customer OTP to start the event
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-lg px-4 py-2  focus:ring-2 focus:ring-indigo-500"
        />
        <p className="text-gray-400 text-xs mb-4">otp is : 123456</p>

        <button
          onClick={verifyOtp}
          disabled={!otp}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          Verify & Start Event
        </button>
      </div>
    </main>
  );
}
